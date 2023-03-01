import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../components/context/context";
import Login from "../components/Login";
import store from "../components/redux/store";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

let appStore;

function renderLoginComponent() {
  let login = jest.fn();
  let logout = jest.fn();
  let user = "eyJhbGciOiJIUzI1NiIsIn";
  return (
    <MemoryRouter>
      <Provider store={appStore}>
        <AuthContext.Provider value={{ user, login, logout }}>
          <Login />
        </AuthContext.Provider>
      </Provider>
    </MemoryRouter>
  );
}

describe("Login Component renders", () => {
  beforeEach(() => {
    appStore = store;
  });

  test("Main Heading renders", () => {
    render(renderLoginComponent());
    let h3element = screen.getByRole("heading", { level: 3 });

    // checking if the element is present
    expect(h3element).toBeInTheDocument();
  });

  test("Username and password should be empty at render", async () => {
    const { getByPlaceholderText } = render(renderLoginComponent());

    await waitFor(() => {
      expect(getByPlaceholderText("Username")).toBeInTheDocument();
      expect(getByPlaceholderText("Password")).toBeInTheDocument();
      // checking input fields for empty string at component render
      expect(getByPlaceholderText("Username").value).toMatch("");
      expect(getByPlaceholderText("Password").value).toMatch("");
    });

    // mocking to change the input-fields
    fireEvent.change(getByPlaceholderText("Username"), {
      target: { value: "abc" },
    });
    fireEvent.change(getByPlaceholderText("Password"), {
      target: { value: "Abcd@123" },
    });

    await waitFor(() => {
      // Checking the values of input-fields
      expect(getByPlaceholderText("Username").value).not.toBeFalsy();
      expect(getByPlaceholderText("Username").value).toMatch("abc");
      expect(getByPlaceholderText("Password").value).toMatch("Abcd@123");
    });
  });
});
