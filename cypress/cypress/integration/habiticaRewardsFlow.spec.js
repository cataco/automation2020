context('Habitica Tests - Reward CRUD', () => {

    before(() => {
        cy.visit('https://habitica.com/static/home');
        login();
    })


    it('creates a new Reward', () => {
        login();
        cy.get('#create-task-btn').click();
        cy.get('.create-task-btn .icon-reward').click();
        cy.get('.input-title').type('Automation Reward');
        cy.get('.btn-primary.btn-footer').click();
        cy.contains('Automation Reward').should('be.visible');
    });

    it('reads a new Reward', () => {
        cy.wait(1000)
            .contains('Automation Reward').click();
        cy.get('.input-title').should('have.value', 'Automation Reward');
        cy.get('input[type="number"]').should('have.value', '10');
    });

    it('edits a new Reward', () => {
        cy.get('.input-title').clear().type('Automation Reward - EDIT');
        cy.get('input[type="number"]').clear().type('21');
        cy.get('.m-auto').click();
        cy.contains('Automation Reward - EDIT').click();
        cy.get('.input-title').should('have.value', 'Automation Reward - EDIT');
        cy.get('input[type="number"]').should('have.value', '21');
    });

    it('deletes a Reward', () => {
        cy.get('.delete-task-btn').click();
        cy.on('window:confirm', () => true)
            .contains('Automation Reward - EDIT').should('not.be.visible');

    });

    function login() {
        cy.visit('https://habitica.com/static/home');
        cy.get('.login-button').click().wait(1000)
            .get('#usernameInput').type('myname123fff');
        cy.get('#passwordInput').type('myname123fff');
        cy.get('.btn-info[type="submit"]').click();
    }
});

