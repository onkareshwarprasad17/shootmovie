import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../components/context/context";
import store from "../components/redux/store";
import Login from "../components/Login";

function renderLoginCommponent(user, login, logout) {
  return (
    <MemoryRouter>
      <Provider store={store}>
        <AuthContext.Provider value={{ user, login, logout }}>
          <Login />
        </AuthContext.Provider>
      </Provider>
    </MemoryRouter>
  );
}
describe("Login Component", () => {
  beforeEach(() => {
    cy.viewport(1280, 720);
  });
  it("renders correctly", () => {
    let login = cy.spy();
    let logout = cy.spy();
    cy.mount(renderLoginCommponent(null, login, logout));

    cy.contains("Login");
  });

  it("error message alert should be shown if user credentials are wrong", () => {
    let login = cy.spy();
    let logout = cy.spy();
    cy.mount(renderLoginCommponent(null, login, logout));

    cy.get(".userInput").type("abc");
    cy.get(".passwordInput").type("invalid");

    cy.get(".loginButton").click();
    cy.wait(3000);
    cy.get(".ant-message-error").should(
      "have.text",
      "Invalid username or password!"
    );

    cy.get(".userInput").clear();
    cy.get(".userInput").type("mor4");
    cy.get(".passwordInput").clear();
    cy.get(".passwordInput").type("83r");
    cy.get(".loginButton").click();
    cy.wait(3000);
    cy.get(".ant-message-error").should(
      "have.text",
      "Invalid username or password!"
    );
  });

  it("successful login message alert should appear when credentials are correct", () => {
    let login = cy.spy();
    let logout = cy.spy();
    let user = null;
    cy.mount(renderLoginCommponent(user, login, logout));

    cy.get(".userInput").type("mor_2314");
    cy.get(".passwordInput").type("83r5^_");

    cy.get(".userInput").should("have.value", "mor_2314");
    cy.get("input[type='password']").should("have.value", "83r5^_");

    cy.contains("Login").click();
    cy.wait(3000);
    cy.get(".ant-message-success").and("have.text", "Login Successful!");
  });
});
