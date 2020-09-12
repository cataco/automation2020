context('Habitica Tests - Party Flow', () => {

    before(() => {
        cy.visit('https://habitica.com/static/home');
        login();
    })

    it('creates a party', () => {
        cy.contains('Start a Party').click();
        cy.contains('Create a Party').click();
        cy.contains("myname123fff's Party").should('be.visble');
        cy.get('.item-with-icon .number').should('have.text', '1')
    });

    it('edits a party', () => {
        cy.get('button[b-btn="b-btn"]').click();
        cy.get('input.form-control').clear().type('My Test Party');
        cy.get('textarea').type('Description Text for Party With Special Chars %% ... ?*');
        cy.get('.btn-md').click();
        cy.contains("My Test Party").should('be.visble');
        cy.contains('Description Text for Party With Special Chars %% ... ?*').should('be.visible');
    });

    it('invite a member to a party', () => {
        cy.contains('Invite Friends').click();
        cy.get('.input-group input').first().type('testemail@mail.com');
        cy.contains('Send Invites').click();
        cy.get("Invitation Sent").should('be.visible');
    });

    it('deletes a party', () => {
        cy.get('.btn-danger').click();
        cy.on('window:confirm', () => true)
        .contains('Start a Party').click()
        .contains('Create a Party').should('be.visible');
    });

    function login() {
        cy.visit('https://habitica.com/static/home');
        cy.get('.login-button').click().wait(1000)
            .get('#usernameInput').type('myname123fff');
        cy.get('#passwordInput').type('myname123fff');
        cy.get('.btn-info[type="submit"]').click();
    }
});
