/// <reference types="cypress" />

context("Window", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
    cy.fixture("testAdrian").then(function (data) {
      this.data = data;
      cy.log("DATA: ", data);

      cy.fixture("index").then(function (index) {
        //una vez q me has traido el json index con el alias index
        this.index = index;
        cy.log("Locator: ", index);
      });
    });
  });

  it("make sure that the app renders without error", function () {
    cy.get(this.index.contenedor).should("exist");
    cy.get(this.index.textbox).should("be.visible");
    cy.get(this.index.textbox).should("exist");
  });

  it("ensure that the `notes` state loads with no entries", function () {
    cy.get(this.index.button).click();
    cy.get(this.index.notes).should("have.value", "");
  });

  it("ensure that the `notes` state and that the note is rendered in the `ul`", function () {
    cy.get("ul").should("exist");
    cy.get(this.index.textbox).type(this.data.T1);
    cy.get(this.index.button).click();
    cy.get("ul").should("have.length", 1);
  });
  it("when the delete button is pressed that note is deleted from the `notes`", function () {
    cy.get("ul").should("exist");
    cy.get(this.index.textbox).type(this.data.T2);
    cy.get(this.index.button).click();
    cy.get(this.index.row1).should("exist");
    cy.get(this.index.buttonDelete).click();
    cy.get(this.index.row1).should("not.exist");
    cy.get("ul").should("be.empty");
  });
});
