describe("authentication tests", () => {
  it("displays authentication errors ", () => {
    cy.visit("/");
    cy.get('[data-test="email]');
  });
});
