context('Habitica Tests - Habit CRUD', () => {

    before(() => {
        cy.visit('https://habitica.com/static/home');
        login();
    })


    it('creates a new habit', () => {
        cy.get('#create-task-btn').click();
        cy.get('.create-task-btn .icon-habit').click();
        cy.get('.input-title').type('Watch Netflix');
        cy.get('.negative.mx-auto').click();
        cy.get('.btn-primary.btn-footer').click();
        cy.contains('Watch Netflix').should('be.visible');
    });

    it('reads a new habit', () => {
        cy.contains('Watch Netflix').click();
        cy.get('.input-title').should('have.value', 'Watch Netflix');
        cy.get('.difficulty-item.isButton').contains('Easy').should('be.visible');
        cy.get('button span.label').contains('Daily').should('be.visible');
        cy.get('.input-group input').should('have.value', '0');
    });

    it('edits a new habit', () => {
        cy.get('.input-title').clear().type('Watch Netflix - EDIT');
        cy.get('.input-group input').clear().type('1');
        cy.get('button span.label').contains('Daily').click();
        cy.get('span.label').contains('Weekly').click();
        cy.get('.m-auto').click();
        cy.contains('Watch Netflix - EDIT').click();
        cy.get('.input-title').should('have.value', 'Watch Netflix - EDIT');
        cy.get('.difficulty-item.isButton').should('be.visible');
        cy.get('button span.label').contains('Weekly').should('be.visible');
        cy.get('.input-group input').should('have.value', '1');
    });

    it('deletes a habit', () => {
        cy.get('.delete-task-btn').click();
        cy.on('window:confirm', () => true)
            .contains('Watch Netflix - EDIT').should('not.be.visible');

    });

    it('creates a new daily task', () => {
        login();
        cy.get('#create-task-btn').click();
        cy.get('.create-task-btn .icon-daily').click();
        cy.get('.input-title').type('Study Cypress');
        cy.get('.btn-primary.btn-footer').click();
        cy.contains('Study Cypress').should('be.visible');
    });

    function login() {
        cy.visit('https://habitica.com/static/home');
        cy.get('.login-button').click().wait(1000)
            .get('#usernameInput').type('myname123fff');
        cy.get('#passwordInput').type('myname123fff');
        cy.get('.btn-info[type="submit"]').click();
    }
});

