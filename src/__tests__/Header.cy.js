import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { userLoggedIn, userLoggedOut } from "../appSlice";
import { AppContext } from "../components/context/context";
import Header from "../components/Header";
import store from "../components/redux/store";

function renderLoginCommponent() {
  return (
    <MemoryRouter>
      <Provider store={store}>
        <AppContext.Provider value={store.getState().user.isLoggedIn}>
          <Header />
        </AppContext.Provider>
      </Provider>
    </MemoryRouter>
  );
}

describe("Header Component", () => {
  beforeEach(() => {
    cy.viewport(1280, 720);
  });
  it("renders", () => {
    cy.mount(renderLoginCommponent());
  });

  it("shows the logout button only when user is logged in", () => {
    const appStore = store;
    appStore.dispatch(userLoggedIn());
    cy.mount(renderLoginCommponent());
    cy.get(".logout-button").should("exist");
    cy.wait(5000);
  });

  it("hide the logout button only when user is logged out", () => {
    const appStore = store;
    appStore.dispatch(userLoggedOut());
    cy.mount(renderLoginCommponent());
    cy.get(".logout-button").should("not.exist");
  });
});
