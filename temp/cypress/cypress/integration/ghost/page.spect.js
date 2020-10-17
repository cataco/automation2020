context('Page Creation', () => {

    it('Creates a post', () => {
        cy.visit('http://localhost:2368/ghost/#/signin')

        cy.get('[placeholder="Email Address"]').type('sergoix93@hotmail.com');
        cy.get('[placeholder="Password"]').type('pruebasautomaticas');
        cy.contains("Sign in").click();

        cy.get('[href="#/pages/"]').click({force: true});
        cy.get('[href="#/editor/page/"]').click({force: true});
        cy.get('[placeholder="Page Title"]').type('Tutulo de prueba');
        //cy.reload();
        //cy.get('[data-placeholder="Begin writing your page..."]').click();
        //cy.get('[placeholder="Page Title"]').type('Tutulo de prueba');
        cy.contains('Publish').click({force: true});

        //cy.contains("Username already taken.").should('be.visible')
      })
});
