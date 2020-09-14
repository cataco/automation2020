context('Lab', () => {

    it('Exports Content', () => {
        cy.visit('http://localhost:2368/ghost/#/signin')

        cy.get('[placeholder="Email Address"]').type('sergoix93@hotmail.com');
        cy.get('[placeholder="Password"]').type('pruebasautomaticas');
        cy.contains("Sign in").click();
        cy.get('[href="#/settings/labs/"]').click({force: true});
        cy.get('.gh-btn').eq(1).click({force: true});
        //cy.contains("Export").eq(1).click({force: true});

      })
});
