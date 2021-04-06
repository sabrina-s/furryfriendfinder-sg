context("user setup", () => {
  it("login", () => {
    cy.visit("http://localhost:3000/login");
    cy.login("username", "password");

    cy.location("pathname").should("eq", "/");
    cy.get("#navbar").should("contain", "username", "logout");
  });
});
