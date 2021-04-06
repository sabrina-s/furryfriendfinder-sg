it("login", () => {
  cy.visit("http://localhost:3000/login");

  cy.get("input[name='username']").type("username");
  cy.get("input[name='password']").type("password");
  cy.get("Button").contains("Login").click();

  cy.location("pathname").should("eq", "/");

  cy.get("#navbar").should("contain", "username", "logout");
});
