import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { AppContext } from "../components/context/context";
import Home from "../components/Home";
import store from "../components/redux/store";

function renderLoginCommponent() {
  return (
    <MemoryRouter>
      <Provider store={store}>
        <AppContext.Provider value={store.getState().user.isLoggedIn}>
          <Home />
        </AppContext.Provider>
      </Provider>
    </MemoryRouter>
  );
}

describe("<Home />", () => {
  beforeEach(() => {
    cy.viewport(1280, 720);
  });
  it("renders and loads the movie cards", () => {
    cy.mount(renderLoginCommponent());
    cy.contains("a").should("have.attr", "href", "/movie/505642");
  });
});
