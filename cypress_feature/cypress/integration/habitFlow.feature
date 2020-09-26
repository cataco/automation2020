Feature: habitFlow

Background:
  Given I login
  Then I see main page

Scenario: Create new habit
  Given I select the option to create a new Habit
  When I create the habit with title "Cucumber Habit"
  Then I can see "Cucumber Habit" in the tasks dashboard

Scenario: Edit habit
  Given I select the habit with title "Cucumber Habit" and validate data
  When I edit the habit with the following data:
  | Cucumber Habit - Edit  | 1             | Weekly        |
  Then I can see "Cucumber Habit - Edit" in the tasks dashboard

Scenario: Delete habit
  Given I delete habit with title "Cucumber Habit - Edit"
  Then I can not see "Cucumber Habit - Edit" in the tasks dashboard


  