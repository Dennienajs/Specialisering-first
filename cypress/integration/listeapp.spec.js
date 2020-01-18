const w8 = 100;

describe("listeapp", () => {
  it("Visits localhost:3000", () => {
    cy.visit("/").wait(w8);
  });

  /* 
Testet og derefter slettet.
  it("Logs in", () => {
    cy.url().should("include", "/login");

    cy.get("[data-testid=form-input-email]")
      .type(email)
      .wait(w8);

    cy.get("[data-testid=form-input-password]")
      .type(`${password}`)
      .wait(w8)
      .type("{enter}")
      .wait(w8);
  });

  */

  it("Redirects to home when visiting /login", () => {
    cy.visit("/login").wait(w8);
    cy.url().should("not.include", "/login");
    cy.get("[data-testid=handle-click-display-name]").should(
      "contain",
      "Dennie"
    );
  });
  it("Hides sidebar", () => {
    cy.get(".slider").click();
  });

  it("Toggles darkmode", () => {
    cy.get("[data-testid=header-toggle-darkmode]").click();
  });

  it("Succesfully adds todo", () => {
    cy.get("[data-testid=tilføj-punkt-input]")
      .type("hackerman todo")
      .wait(w8)
      .type("{enter}");

    cy.get(
      ":nth-child(1) > .punkter__liste-container-li > .punkt-punkt"
    ).should("contain", "hackerman");

    cy.get("[data-testid=tilføj-punkt-input]").should("be.empty");

    cy.get(".Toastify__toast").should("be.visible");
  });

  it("Completes todo", () => {
    cy.get(
      `:nth-child(1) > [aria-label="Mark 'hackerman todo' as done?"] > [data-testid=checkbox-tick]`
    )
      .click()
      .wait(w8);
  });
  it("Deletes todo", () => {
    cy.get(
      `:nth-child(1) > [aria-label="Mark 'hackerman todo' as delete?"] > [data-testid=checkbox-delete]`
    ).click();
  });

  it("Shows sidebar", () => {
    cy.get(".slider").click();
  });

  it("Adds personal list", () => {
    cy.get("[data-testid=add-liste-action]").click();

    cy.get("[data-testid=add-liste-submit]").should("be.visible");
    cy.get("[data-testid=add-liste-fortryd]").should("be.visible");
    cy.get("[data-testid=add-liste--vis]").should("be.visible");

    cy.get("[data-testid=add-liste-navn]")
      .type("Todo")
      .wait(w8)
      .type("{enter}")
      .wait(w8);
  });

  it("Adds todo to personal list", () => {
    cy.get(":nth-child(1) > [data-testid=sidebar-egne-lister]")
      .should("contain", "Todo")
      .click();

    cy.get(".punkter-overskrift").should("contain", "Todo");
    cy.get("[data-testid=tilføj-punkt-input]")
      .should("have.attr", "placeholder", "add to todo")
      .click()
      .wait(w8)
      .type("test listeapp with cypress!")
      .wait(w8)
      .type("{enter}");
  });

  it("Added todo should be visible in 'All'", () => {
    cy.get("[data-testid=All-action]")
      .click()
      .wait(w8);
    cy.get(".punkter-overskrift").should("contain", "All");
    cy.get("[data-testid=punkter]").should(
      "contain",
      "test listeapp with cypress!"
    );
  });
  it("Added todo should be visible in 'Today'", () => {
    cy.get("[data-testid=Today-action]")
      .click()
      .wait(w8);
    cy.get(".punkter-overskrift").should("contain", "Today");
    cy.get("[data-testid=punkter]").should(
      "contain",
      "test listeapp with cypress!"
    );
  });
  it("Added todo should be visible in 'Last 7 days'", () => {
    cy.get('[data-testid="Last 7 Days-action"]')
      .click()
      .wait(w8);
    cy.get(".punkter-overskrift").should("contain", "Last 7 Days");
    cy.get("[data-testid=punkter]").should(
      "contain",
      "test listeapp with cypress!"
    );
  });

  it("Deletes todo", () => {
    cy.get(
      `:nth-child(1) > [aria-label="Mark 'test listeapp with cypress!' as delete?"] > [data-testid=checkbox-delete]`
    )
      .click()
      .wait(w8);
  });

  it("Toggles personal lists", () => {
    cy.get("[data-testid=add-liste-action]")
      .should("be.visible")
      .and("contain", "Add List");
    cy.get("[data-testid=sidebar-toggle-egne-lister]")
      .click()
      .wait(w8);
    cy.get("[data-testid=add-liste]")
      .should("not.be.visible")
      .wait(w8);
    cy.get("[data-testid=sidebar-toggle-egne-lister]").click();
  });

  it("Deletes personal list", () => {
    cy.get("[data-testid=sidebar-egne-lister]")
      .should("contain", "Todo")
      .click()
      .wait(w8);

    cy.get("[data-testid=punkter]").should(
      "not.contain",
      "test listeapp with cypress!"
    );

    cy.get("[data-testid=individuel-liste-delete] > svg").click();

    cy.get(".Toastify__toast-body")
      .should("be.visible")
      .wait(2000);
  });

  /*
  Testet. Gider ikke logge ind i tests, så logger ikke ud her mere.
  it("Signs out", () => {
    cy.get("[data-testid=header-button-signout] > svg").click();
    cy.get("[data-testid=handle-click-display-name]").should(
      "contain",
      "Not signed in"
    );
  });
  */

  it("Toggles light theme", () => {
    cy.get("[data-testid=header-toggle-darkmode]").click();
  });
});
