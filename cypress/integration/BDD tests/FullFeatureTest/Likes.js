import {Given, Then} from "cypress-cucumber-preprocessor/steps";

var commentLikes = 0;

var replyLikes = 0;

Given('I have a comment I want to like', () => {

    cy.intercept("GET", "/api/comments").as("getComments");
    cy.intercept("PUT", "/api/comments").as("addLike");

    cy.visit('https://acommentapi.com/');
    cy.wait("@getComments");
})

When('I press like on the comment', () => {


    cy.get(".container.comments:contains(Cypress Test)").first().find(".btn-info.float-left.btn.btn-info").invoke('text').then(($span) => {
        commentLikes = $span.replace(/\D/g,'');
    })

    cy.get(".container.comments:contains(Cypress Test)").first().contains("Likes").click()
})

Then('The comment gains a like', () => {
    cy.wait("@addLike")
    cy.wait("@getComments");

    cy.get(".container.comments:contains(Cypress Test)").first().find(".btn-info.float-left.btn.btn-info").should("contain", parseFloat(commentLikes) + 1)
})

Given('I have a reply I want to like', () => {

    cy.intercept("GET", "/api/comments").as("getComments");
    cy.intercept("PUT", "/api/comments").as("addLike");

    cy.visit('https://acommentapi.com/');
    cy.wait("@getComments");
})

When('I press like on the reply', () => {

    cy.get(".container.replies:contains(Cypress Test)").last().find(".btn-info.likes.btn-sm").invoke('text').then(($span) => {
        replyLikes = $span.replace(/\D/g,'');
    })

    cy.get(".container.replies:contains(Cypress Test)").last().contains("Likes").click()
})

Then('The reply gains a like', () => {
    cy.wait("@addLike")
    cy.wait("@getComments");

    cy.get(".container.replies:contains(Cypress Test)").last().find(".btn-info.likes.btn-sm").should("contain", parseFloat(replyLikes) + 1)
})