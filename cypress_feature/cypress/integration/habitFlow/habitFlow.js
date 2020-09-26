import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

Given('I login', () => {
    cy.visit('https://habitica.com/static/home');
    cy.get('.login-button').click().wait(1000)
        .get('#usernameInput').type('myname123fff');
    cy.get('#passwordInput').type('myname123fff');
    cy.get('.btn-info[type="submit"]').click();
    cy.wait(1000).get('body').type('{esc}', { force: true });
});

Then('I see main page', () => {
    cy.get(".avatar").should('be.visible');
});

Given(`I select the option to create a new Habit`, () => {
    cy.get('#create-task-btn').click();
    cy.get('.create-task-btn .icon-habit').click();
});

Then(`I create the habit with title {string}`, (title) => {
    cy.get('.input-title').type(title);
    cy.get('.negative.mx-auto').click();
    cy.get('.btn-primary.btn-footer').click();
});

Then(`I can see {string} in the tasks dashboard`, (title) => {
    cy.contains(title).should('be.visible');
});

Then(`I select the habit with title {string} and validate data`, (title) => {
    cy.contains(title).click();
    cy.get('.input-title').should('have.value', title);
    cy.get('.difficulty-item.isButton').contains('Easy').should('be.visible');
    cy.get('button span.label').contains('Daily').should('be.visible');
    cy.get('.input-group input').should('have.value', '0');
});

Then(`I edit the habit with the following data:`, (dataTable) => {
    let title = dataTable.rawTable[0][0];
    let adjustStreak = dataTable.rawTable[0][1];
    let resetStreak = dataTable.rawTable[0][2];
    cy.get('.input-title').clear().type(title);
    cy.get('.input-group input').clear().type(adjustStreak);
    cy.get('button span.label').contains('Daily').click();
    cy.get('span.label').contains(resetStreak).click();
    cy.get('.m-auto').click();
    cy.contains(title).click();
    cy.get('.input-title').should('have.value', title);
    cy.get('.difficulty-item.isButton').should('be.visible');
    cy.get('button span.label').contains(resetStreak).should('be.visible');
    cy.get('.input-group input').should('have.value', adjustStreak);
});

Then(`I delete habit with title {string}`, (title) => {
    cy.contains(title).click();
    cy.get('.delete-task-btn').click();
    cy.on('window:confirm', () => true)
            .contains(title).should('not.be.visible');
});

Then(`I can not see {string} in the tasks dashboard`, (title) => {
    cy.contains(title).should('not.be.visible');
});