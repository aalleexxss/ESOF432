import { Given, Then } from "cypress-cucumber-preprocessor/steps";

Given('I want to see documentation', () => {

    cy.intercept("GET", "/api/comments").as("getComments");
    cy.intercept("POST", "/api/comments").as("makeComment");

    cy.visit('https://acommentapi.com/');
    cy.wait("@getComments");
})

When('I click the link', () => {

    cy.get("a:contains(here)").should('have.attr', 'href').then((href) => {
        cy.forceVisit(href)
    })
})

Then('I am at documentation', () => {
    cy.url().should('contain', 'https://backend-309717.wm.r.appspot.com/docs/')
})