context('Habitica Tests - Shop Flow', () => {

    before(() => {
        cy.visit('https://habitica.com/static/home');
        login();
    })

    it('Tries to shop item', () => {
        cy.get('.nav-link[href="/shops/market"]').click();
        cy.get('.item-wrapper').first().click()
            .get('button.notEnough').should('exist')
            .get('.close-icon').click({ force: true });
    });

    function login() {
        cy.visit('https://habitica.com/static/home');
        cy.get('.login-button').click().wait(1000)
            .get('#usernameInput').type('myname123fff');
        cy.get('#passwordInput').type('myname123fff');
        cy.get('.btn-info[type="submit"]').click()
            .wait(1000).get('body').type('{esc}', { force: true });
    }
});

