import { Given, Then } from "cypress-cucumber-preprocessor/steps";

Given('I want to see Cypress Dashboard', () => {

    cy.intercept("GET", "/api/comments").as("getComments");
    cy.intercept("POST", "/api/comments").as("makeComment");

    cy.visit('https://acommentapi.com/');
    cy.wait("@getComments");
})

When('I click the cypress link', () => {

    cy.get("div.dropdown.btn-group").click()
    cy.get("a:contains(Cypress Dashboard)").should('have.attr', 'href').then((href) => {
        cy.forceVisit(href)
    })
})

Then('I am at the dashboard', () => {
    cy.url().should('contain', 'https://dashboard.cypress.io/projects/racs8y/runs?branches=%5B%5D&committers=%5B%5D&flaky=%5B%5D&page=1&status=%5B%5D&tags=%5B%5D&timeRange=%7B%22startDate%22%3A%221970-01-01%22%2C%22endDate%22%3A%222038-01-19%22%7D')
})