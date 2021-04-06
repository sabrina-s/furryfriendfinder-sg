context("user setup", () => {
  it("login", () => {
    cy.visit("http://localhost:3000/login");
    cy.login("username", "password");

    cy.location("pathname").should("eq", "/");
    cy.get("#navbar").should("contain", "username", "logout");
    cy.getCookie("access_token").should("have.property", "value");
  });

  it("logout", () => {
    cy.logout();
    cy.getCookie("access_token").should("equal", null);
    cy.get("#navbar").should("not.contain", "username", "logout");
  });
});
