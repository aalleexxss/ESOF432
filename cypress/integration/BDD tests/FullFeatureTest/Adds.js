import { Given, Then } from "cypress-cucumber-preprocessor/steps";
const { uniqueNamesGenerator, adjectives, colors, animals } = require('unique-names-generator');
var randomWords = require('random-words');

var cName = uniqueNamesGenerator({ dictionaries: [animals] });

var cBody = ((randomWords(20)).toString()).replace(/,/g, ' ');

var rName = uniqueNamesGenerator({ dictionaries: [animals] });

var rBody = ((randomWords(20)).toString()).replace(/,/g, ' ');

var commentBody = cBody.charAt(0).toUpperCase() + cBody.slice(1);

var commentName = "Cypress Test: " + cName.charAt(0).toUpperCase() + cName.slice(1);

var replyBody = rBody.charAt(0).toUpperCase() + rBody.slice(1);

var replyName = "Cypress Test: " + rName.charAt(0).toUpperCase() + rName.slice(1);

Given('I navigate to acommentapi', () => {

    cy.intercept("GET", "/api/comments").as("getComments");
    cy.intercept("POST", "/api/comments").as("makeComment");

    cy.visit('https://acommentapi.com/');
    cy.wait("@getComments");
})

Then('I want to add a comment', () => {

    cy.get('button:contains(Add Comment)').click()
})

And('I type out a comment', () => {

    cy.get(".form-control").first().clear()
    cy.get(".form-control").last().clear()

    cy.get("button:contains(Post Comment)").click()
    cy.get(".form-group").should("contain", "Cannot be empty")

    cy.get(".form-control").first().type(commentName)
    cy.get("button:contains(Post Comment)").click()
    cy.get(".form-group").should("contain", "Cannot be empty")
    cy.get(".form-control").first().clear()

    cy.get(".form-control.body").type(commentBody)
    cy.get("button:contains(Post Comment)").click()
    cy.get(".form-group").should("contain", "Cannot be empty")

    cy.get(".form-control").first().type(commentName)


})

And('I post the comment', () => {
    cy.get("button:contains(Post Comment)").click()
})

Then('The comment posts', () => {

    cy.wait("@makeComment")
    cy.wait(200);

    cy.get(`.container.comments:contains(${commentName})`).should("contain", commentName).and("contain", commentBody)
})

Given('I navigate to acommentapi', () => {
    cy.intercept("GET", "/api/comments").as("getComments");
    cy.intercept("POST", "/api/comments").as("makeComment");

    cy.visit('https://acommentapi.com/');
    cy.wait("@getComments");
})

Then('I want to add a reply', () => {
    cy.get('button:contains(Reply)').first().click()
})

And('I type out a reply', () => {

    cy.get(".form-control").first().clear()
    cy.get(".form-control").last().clear()

    cy.get("button:contains(Post Reply)").click()
    cy.get(".form-group").should("contain", "Cannot be empty")

    cy.get(".form-control").first().type(replyName)
    cy.get("button:contains(Post Reply)").click()
    cy.get(".form-group").should("contain", "Cannot be empty")
    cy.get(".form-control").first().clear()

    cy.get(".form-control.reply").type(replyBody)
    cy.get("button:contains(Post Reply)").click()
    cy.get(".form-group").should("contain", "Cannot be empty")

    cy.get(".form-control").first().type(replyName)
})

And('I post the reply', () => {
    cy.get("button:contains(Post Reply)").click()
})

Then('The reply posts', () => {

    cy.wait("@makeComment")
    cy.wait(200);

    cy.get(".container.replies").should("contain", replyName).and("contain", replyBody)
})