import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { AuthContext, AuthProvider } from "../components/context/context";
import Header from "../components/Header";
import store from "../components/redux/store";

// Mocking useNavigate Hook
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

describe("Header component renders", () => {
  test("logout button should render when user is logged in", async () => {
    let login = jest.fn();
    let logout = jest.fn();
    let user = "eyJhbGciOiJIUzI1NiIsIn";
    const { getAllByText } = render(
      <Provider store={store}>
        <AuthContext.Provider value={{ user, login, logout }}>
          <Header />
        </AuthContext.Provider>
      </Provider>
    );
    login();
    expect(getAllByText("Logout")[0]).toBeInTheDocument();
  });

  test("logout button should not render when user is logged out", async () => {
    // By default, user is logged out at the start
    render(
      <Provider store={store}>
        <AuthProvider>
          <Header />
        </AuthProvider>
      </Provider>
    );

    let element = await screen.queryByText("Logout");
    expect(element).toBeNull();
  });
});
