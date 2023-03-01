describe("Correct User", () => {
  it("login component renders successfully", () => {
    cy.visit("/");

    cy.get("h3").should("include.text", "SHOOTMovie");
    cy.get("button").should("visible.and.have.text", "Login");
  });

  it("user able to login with correct credentials", () => {
    cy.visit("/");

    cy.get(".userInput").type("abc");
    cy.get(".passwordInput").type("Abcd@123");

    cy.get(".loginButton").click();
    cy.get(".ant-message-success").and("have.text", "Login Successful!");

    cy.intercept(
      "https://api.themoviedb.org/3/movie/popular?api_key=76753a92ec5331ee546d385fbd9eb031",
      (req) => {
        req.continue((res) => {
          expect(res.body.results).to.have.length(20);
        });
      }
    );

    cy.location("pathname").should("eq", "/home");
    cy.contains("Black Panther").click();

    cy.location("pathname").should("eq", "/movie/505642");
    cy.get("img").should("be.visible");
  });
});

describe("Invalid User", () => {
  it("login component throw error on invalid credentials", () => {
    cy.visit("/");

    // With valid password, but incorrect username
    cy.get(".userInput").type("Abc");
    cy.get(".passwordInput").clear();
    cy.get(".passwordInput").type("Abcd@123");

    cy.get(".loginButton").click();

    cy.get(".ant-message-error").should(
      "have.text",
      "Username mentioned is not registered"
    );

    // With correct username, but incorrect password
    cy.get(".userInput").clear();
    cy.get(".userInput").type("abc");
    cy.get(".passwordInput").type("invalid");

    cy.get(".loginButton").click();

    cy.get(".ant-message-error").should(
      "have.text",
      "Please check your password!"
    );
  });
});
