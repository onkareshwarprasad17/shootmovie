import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../components/context/context";
import Home from "../components/Home";
import store from "../components/redux/store";

function renderLoginCommponent(user, login, logout) {
  return (
    <MemoryRouter>
      <Provider store={store}>
        <AuthContext.Provider value={{ user, login, logout }}>
          <Home />
        </AuthContext.Provider>
      </Provider>
    </MemoryRouter>
  );
}

describe("<Home />", () => {
  beforeEach(() => {
    cy.viewport(1280, 720);
  });
  it("renders and loads the movie cards", () => {
    let login = cy.spy();
    let logout = cy.spy();
    let user = "eyJhbGciOiJIUzI1NiIsIn";
    cy.mount(renderLoginCommponent(user, login, logout));
    cy.get(".movieCard-container").should("have.length", 20);
  });
});
