import { Given, Then } from "cypress-cucumber-preprocessor/steps";
const { uniqueNamesGenerator, adjectives, colors, animals } = require('unique-names-generator');
var randomWords = require('random-words');

var Name = uniqueNamesGenerator({ dictionaries: [animals] });

var Body = ((randomWords(20)).toString()).replace(/,/g, ' ');

var commentBody = Body.charAt(0).toUpperCase() + Body.slice(1);

var commentName = Name.charAt(0).toUpperCase() + Name.slice(1);

var replyBody = Body.charAt(0).toUpperCase() + Body.slice(1);

var replyName = Name.charAt(0).toUpperCase() + Name.slice(1);

Given('I have a comment', () => {

    cy.intercept("GET", "/api/comments").as("getComments");
    cy.intercept("POST", "/api/comments").as("makeComment");

    cy.visit('https://acommentapi.com/');
    cy.wait("@getComments");

    cy.get('button:contains(Add Comment)').click()

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

    cy.get("button:contains(Post Comment)").click()

    cy.wait("@makeComment")
    cy.wait(200);

    cy.get(`.container.comments:contains(${commentName})`).should("contain", commentName).and("contain", commentBody)
})

Given('I have a reply', () => {

    cy.intercept("GET", "/api/comments").as("getComments");
    cy.intercept("POST", "/api/comments").as("makeComment");

    cy.visit('https://acommentapi.com/');
    cy.wait("@getComments");

    cy.get('button:contains(Reply)').first().click()

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

    cy.get("button:contains(Post Reply)").click()

    cy.wait("@makeComment")
    cy.wait(200);

    cy.get(`.container.replies:contains(${replyName})`).should("contain", replyName).and("contain", replyBody)
})

When('I want to delete the comment', () => {

    cy.get(`.container.comments:contains(${commentName})`).contains("Delete").click()
    cy.wait(200)
    cy.get("button:contains(Yes)").click()
})

When('I want to delete the reply', () => {

    cy.get(`.container.replies:contains(${replyName})`).contains("Delete").click()
    cy.wait(200)
    cy.get("button:contains(Yes)").click()
})

Then('The comment deletes', () => {

    cy.get(".container.comments").contains(commentBody).should('not.exist')
})

Then('The reply deletes', () => {

    cy.get(".container.replies").contains(replyBody).should('not.exist')
})