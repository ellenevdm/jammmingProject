import { useState } from "react";



const Spotify = {

    GetToken() {
        const [accessToken, setAccessToken] = useState('');
        const [expiresIn, setExpiresIn] = useState(0)

        const initiateAuth = () => {
            let clientId = 'daf9dec000644bca9a07a7a7b3d937c9';
            const redirectUri = 'http://localhost:3001/';
            window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
        }

        const extractAccessToken = () => {
            const url = new URL(window.location.href.replace(/#/g, "?"));
            let urlAccessToken = new URLSearchParams(url.search).get('access_token')
            let urlExpiresIn = Number.parseInt(new URLSearchParams(url.search).get('expires_in'))

            if (urlAccessToken && urlExpiresIn) {
                setAccessToken(urlAccessToken)
                setExpiresIn(Number(urlExpiresIn))
                window.setTimeout(() => setAccessToken(''), expiresIn * 1000)
            }

            return urlAccessToken
        }

        if (accessToken === '') {
            let token = extractAccessToken();

            if (!token)
                initiateAuth();

            return { token }
        };
        return accessToken
    },

    async search(accessToken, term) {
        debugger;
        let response = await fetch(`https://api.spotify.com/v1/search?q=${term}&type=track`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        });
        let data = await response.json();
        if (!data.tracks) {
            return [];
        }
        return data.tracks.items.map((track => ({
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri
        })));

    },

    async savePlaylist(accessToken, name, trackUris) {

        let saved = false;

        if (!name || !trackUris) {
            return;
        }
        let userId;
        await fetch('https://api.spotify.com/v1/me', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
            .then((response) => response.json())
            .then(async (data) => {
                userId = data.id
                console.log('Got user ID')
                await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    },
                    // body: '{\n    "name": "New Playlist",\n    "public": true\n}',
                    body: JSON.stringify({ name: name })
                }).then(response =>
                    response.json()
                )
                    .then(async (data) => {
                        const playlistId = data.id
                        saved = true;
                        await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
                            method: 'POST',
                            headers: {
                                Authorization: `Bearer ${accessToken}`,
                                'Content-Type': 'application/json'
                            },
                            // body: '{\n    "uris": [\n        "string"\n    ],\n    "position": 0\n}',
                            body: JSON.stringify({ uris: trackUris })
                        }).then(response => {
                            return true;
                        }

                        );
                    });
            })

        return saved;
    }
}

export default Spotify