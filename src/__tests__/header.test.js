import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { AppContext } from "../components/context/context";
import Header from "../components/Header";
import configureStore from "redux-mock-store";

// Mocking useNavigate Hook
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

describe("Header component renders", () => {
  let initialLoggedInState = { isLoggedIn: true };
  const mockStore = configureStore();
  let store;

  test("logout button should render when user is logged in", async () => {
    store = mockStore(initialLoggedInState);
    const { getAllByText } = render(
      <Provider store={store}>
        <AppContext.Provider value={store.getState().isLoggedIn}>
          <Header />
        </AppContext.Provider>
      </Provider>
    );
    expect(getAllByText("Logout")[0]).toBeInTheDocument();
  });

  test("logout button should not render when user is logged out", async () => {
    initialLoggedInState = { isLoggedIn: false };
    store = mockStore(initialLoggedInState);
    render(
      <Provider store={store}>
        <AppContext.Provider value={store.getState().isLoggedIn}>
          <Header />
        </AppContext.Provider>
      </Provider>
    );

    let element = await screen.queryByText("Logout");
    expect(element).toBeNull();
  });
});
