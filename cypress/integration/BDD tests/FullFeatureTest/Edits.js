import { Given, Then } from "cypress-cucumber-preprocessor/steps";

var ogComment = ""

var ogReply = ""


Given('I want to edit a comment', () => {

    cy.intercept("GET", "/api/comments").as("getComments");
    cy.intercept("PUT", "/api/comments/edit").as("makeEdit");

    cy.visit('https://acommentapi.com/');
    cy.wait("@getComments");
})

And('I change the comment', () => {

    cy.get(".container.comments:contains(Cypress Test)").last().find(".card-title.body").invoke('text').then(($span) => {
        ogComment = $span
    })

    cy.get(".container.comments:contains(Cypress Test)").last().find("button:contains(Edit)").click()

    cy.get("textarea.edit-box").type(" - Edited")
    cy.get("button:contains(Update Comment)").click()
    cy.wait("@makeEdit")
})

Then('The comment reposts', () => {
    cy.get(".container.comments:contains(Cypress Test)").last().find(".card-title.body").should("contain", ogComment + " - Edited")
})

Given('I want to edit a reply', () => {

    cy.intercept("GET", "/api/comments").as("getComments");
    cy.intercept("PUT", "/api/comments/edit").as("makeEdit");

    cy.visit('https://acommentapi.com/');
    cy.wait("@getComments");
})

And('I change the reply', () => {

    cy.get(".container.replies:contains(Cypress Test)").last().find(".card-title").invoke('text').then(($span) => {
        ogReply = $span
    })

    cy.get(".container.replies:contains(Cypress Test)").last().find("button:contains(Edit)").click()

    cy.get("textarea.edit-box").type(" - Edited")
    cy.get("button:contains(Update Comment)").click()
    cy.wait("@makeEdit")
})

Then('The reply reposts', () => {
    cy.get(".container.replies:contains(Cypress Test)").last().find(".card-body").should("contain", ogReply + " - Edited")
})