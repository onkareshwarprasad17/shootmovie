import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { AppContext } from "../components/context/context";
import store from "../components/redux/store";
import Login from "../components/Login";

function renderLoginCommponent() {
  return (
    <MemoryRouter>
      <Provider store={store}>
        <AppContext.Provider value={store.getState().user.isLoggedIn}>
          <Login />
        </AppContext.Provider>
      </Provider>
    </MemoryRouter>
  );
}
describe("Login Component", () => {
  beforeEach(() => {
    cy.viewport(1280, 720);
  });
  it("renders correctly", () => {
    cy.mount(renderLoginCommponent());

    cy.contains("Login");
  });

  it("error message alert should be shown if user credentials are wrong", () => {
    cy.mount(renderLoginCommponent());

    cy.get(".userInput").type("abc");
    cy.get(".passwordInput").type("invalid");

    cy.get(".loginButton").click();

    cy.get(".ant-message-error").should(
      "have.text",
      "Please check your password!"
    );

    cy.get(".userInput").clear();
    cy.get(".userInput").type("Abc");
    cy.get(".passwordInput").clear();
    cy.get(".passwordInput").type("Abcd@123");
    cy.get(".loginButton").click();

    cy.get(".ant-message-error").should(
      "have.text",
      "Username mentioned is not registered"
    );
  });

  it("successful login message alert should appear when credentials are correct", () => {
    cy.mount(renderLoginCommponent());
    cy.get(".userInput").type("abc");
    cy.get(".passwordInput").type("Abcd@123");

    cy.get(".userInput").should("have.value", "abc");
    cy.get("input[type='password']").should("have.value", "Abcd@123");

    cy.contains("Login").click();
    cy.get(".ant-message-success").and("have.text", "Login Succesful!");
  });
});
