context('Habitica Tests - To Do CRUD', () => {

    before(() => {
        cy.visit('https://habitica.com/static/home');
        login();
    })


    it('creates a new To Do', () => {
        login();
        cy.get('#create-task-btn').click();
        cy.get('.create-task-btn .icon-todo').click();
        cy.get('.input-title').type('Automation Project');
        cy.get('input.checklist-item').type('Worker 1')
            .get('.new-icon').click()
            .get('[placeholder="New checklist item"]').type('Worker 2')
        cy.get('.btn-primary.btn-footer').click();
        cy.contains('Automation Project').should('be.visible');
    });

    it('reads a new To Do task', () => {
        cy.wait(1000)
            .contains('Automation Project').click();
        cy.get('.input-title').should('have.value', 'Automation Project');
        cy.get('.difficulty-item.isButton').contains('Easy').should('be.visible');
        cy.contains('Worker 1').should('be.visible');
        cy.contains('Worker 2').should('be.visible');
    });

    it('edits a new To Do task', () => {
        cy.get('.input-title').clear().type('Automation Project - EDIT');
        cy.get('.new-icon').click()
            .get('[placeholder="New checklist item"]').type('Worker 3')
        cy.get('.m-auto').click();
        cy.contains('Automation Project - EDIT').click();
        cy.get('.input-title').should('have.value', 'Automation Project - EDIT');
        cy.contains('Worker 1').should('be.visible');
        cy.contains('Worker 2').should('be.visible');
        cy.contains('Worker 3').should('be.visible');
    });

    it('deletes a To Do', () => {
        cy.get('.delete-task-btn').click();
        cy.on('window:confirm', () => true)
            .contains('Automation Project - EDIT').should('not.be.visible');

    });

    function login() {
        cy.visit('https://habitica.com/static/home');
        cy.get('.login-button').click().wait(1000)
            .get('#usernameInput').type('myname123fff');
        cy.get('#passwordInput').type('myname123fff');
        cy.get('.btn-info[type="submit"]').click();
    }
});

