const email = "dennie.dc@hotmail.com";
const password = "CypressT3steRR37";

describe("Successfully loads localhost:3000", () => {
  before(() => {
    cy.visit("http://localhost:3000").wait(1000);
  });
  it.skip("lands on the login page and logs in", () => {
    cy.url().should("include", "/login");

    cy.get("[data-testid=form-input-email]")
      .type(email)
      .wait(500);

    cy.get("[data-testid=form-input-password]")
      .type(`${password}`)
      .wait(500)
      .type("{enter}")
      .wait(2000);
  });

  it.skip("user is logged in and lands on home", () => {
    cy.url().should("not.include", "/login");
    cy.get("[data-testid=handle-click-display-name]").should(
      "contain",
      "Dennie"
    );
  });
  it.skip("toggles sidebar", () => {
    cy.get(".slider").click();
  });

  it.skip("toggles darkmode", () => {
    cy.get("[data-testid=header-toggle-darkmode]").click();
  });

  it.skip("succesfully adds a todo", () => {
    cy.get("[data-testid=tilføj-punkt-input]")
      .type("hackerman todo")
      .wait(1000)
      .type("{enter}");

    // check added
    cy.get(
      ":nth-child(1) > .punkter__liste-container-li > .punkt-punkt"
    ).should("contain", "hackerman");
  });

  it.skip("click green tick on :nth-child(1) todo. (first)", () => {
    cy.get(
      `:nth-child(1) > [aria-label="Mark 'hackerman todo' as done?"] > [data-testid=checkbox-tick]`
    )
      .click()
      .wait(1000);
  });
  it.skip("click red tick on :nth-child(1) todo. (first)", () => {
    cy.get(
      `:nth-child(1) > [aria-label="Mark 'hackerman todo' as delete?"] > [data-testid=checkbox-delete]`
    ).click();
  });
});
