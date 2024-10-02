import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "../Components/SearchBar/SearchBar";

describe("SearchBar", () => {
  test("renders search bar input", () => {
    render(<SearchBar />);
    const inputElement = screen.getByPlaceholderText(/Search.../i);
    expect(inputElement).toBeInTheDocument();
  });
  test("calls search on submit", () => {
    const mockSearch = jest.fn();
    render(<SearchBar onSearch={mockSearch} />);
    const button = screen.getByText(/Search/i);
    fireEvent.click(button);
    expect(mockSearch).toHaveBeenCalled();
  });
});
