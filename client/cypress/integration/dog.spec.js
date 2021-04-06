context("dog", () => {
  it("displays all dogs when not filtered", () => {
    cy.visit("/");
    cy.get(".dogs").find(".dog").should("have.length", 3);
  });

  it("displays only matched dogs when filtered by hdbApproved status", () => {
    cy.get("[type='checkbox']").check();
    cy.get(".dogs").find(".dog").should("have.length", 2);
    cy.get("[type='checkbox']").uncheck();
    cy.get(".dogs").find(".dog").should("have.length", 3);
  });

  it("displays only matched dogs when filtered by name", () => {
    cy.get("input[name='search-dog-name']").type("bernie");
    cy.get(".dogs").find(".dog").should("have.length", 1);
  });
});
