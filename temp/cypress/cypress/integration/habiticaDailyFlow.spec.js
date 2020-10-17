context('Habitica Tests - Daily CRUD', () => {

    before(() => {
        cy.visit('https://habitica.com/static/home');
        login();
    })


    it('creates a new daily task', () => {
        cy.get('#create-task-btn').click();
        cy.get('.create-task-btn .icon-daily').click();
        cy.get('.input-title').type('Study Cypress');
        cy.get('.btn-primary.btn-footer').click();
        cy.contains('Study Cypress').should('be.visible');
    });

    it('reads a new daily task', () => {
        cy.wait(1000)
            .contains('Study Cypress').click();
        cy.get('.input-title').should('have.value', 'Study Cypress');
        cy.get('.difficulty-item.isButton').contains('Easy').should('be.visible');
        cy.get('button span.label').contains('Weekly').should('be.visible');
        cy.get('.input-group-outer input').should('have.value', '1');
    });

    it('edits a new daily task', () => {
        cy.get('.input-title').clear().type('Study Cypress - EDIT');
        cy.get('.input-group-outer input').clear().type('2');
        cy.get('button span.label').contains('Weekly').click();
        cy.get('span.label').contains('Daily').click();
        cy.get('.m-auto').click();
        cy.contains('Study Cypress - EDIT').click();
        cy.get('.input-title').should('have.value', 'Study Cypress - EDIT');
        cy.get('.difficulty-item.isButton').should('be.visible');
        cy.get('button span.label').contains('Daily').should('be.visible');
        cy.get('.input-group-outer input').should('have.value', '2');
    });

    it('deletes a daily task', () => {
        cy.get('.delete-task-btn').click();
        cy.on('window:confirm', () => true)
            .contains('Study Cypress - EDIT').should('not.be.visible');

    });

    function login() {
        cy.visit('https://habitica.com/static/home');
        cy.get('.login-button').click().wait(1000)
            .get('#usernameInput').type('myname123fff');
        cy.get('#passwordInput').type('myname123fff');
        cy.get('.btn-info[type="submit"]').click();
        cy.wait(1000).get('body').type('{esc}', { force: true });
    }
});

