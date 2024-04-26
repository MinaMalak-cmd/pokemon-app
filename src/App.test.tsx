import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store/store";

// jest.mock('react-redux', () => ({
//   // useSelector: jest.fn(),
//   ...jest.requireActual('react-redux'), // Preserve other functionalities
//   useDispatch: jest.fn(),
//   useSelector: jest.fn(),
//   useStore: jest.fn(),
// }));

describe("PokemonApp", () => {
  test("renders App component header successfully", () => {
    render(<Provider store={store}><App /></Provider>);
    const linkElement = screen.getByText(/Pokemon App/i);
    expect(linkElement).toBeInTheDocument();
  });
});
