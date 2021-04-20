Feature: Fully test frontend

  Scenario: User adds a comment
    Given I navigate to acommentapi
    Then I want to add a comment
    And I type out a comment
    And I post the comment
    Then The comment posts

  Scenario: User adds a reply
    Given I navigate to acommentapi
    Then I want to add a reply
    And I type out a reply
    And I post the reply
    Then The reply posts

Scenario: User can delete a comment
  Given I have a comment
  When I want to delete the comment
  Then The comment deletes

  Scenario: User can delete a reply
    Given I have a reply
    When I want to delete the reply
    Then The reply deletes

  Scenario: User can like a comment
    Given I have a comment I want to like
    When I press like on the comment
    Then The comment gains a like

  Scenario: User can like a reply
    Given I have a reply I want to like
    When I press like on the reply
    Then The reply gains a like

  Scenario: User can edit a reply
    Given I want to edit a reply
    And I change the reply
    Then The reply reposts

  Scenario: User can edit a comment
    Given I want to edit a comment
    And I change the comment
    Then The comment reposts

  Scenario: User can navigate to documentation
    Given I want to see documentation
    When I click the link
    Then I am at documentation

  Scenario: User can use dark mode
    Given I click dark mode
    Then The site will be in dark mode