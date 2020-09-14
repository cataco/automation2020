context('Tage Creation', () => {

    it('Creates a tag', () => {
        cy.visit('http://localhost:2368/ghost/#/signin')
        cy.get('[placeholder="Email Address"]').type('sergoix93@hotmail.com');
        cy.get('[placeholder="Password"]').type('pruebasautomaticas');
        cy.contains("Sign in").click();
        cy.get('[href="#/tags/"]').click({force: true});
        cy.get('[href="#/tags/new/"]').click({force: true});
        cy.get('[name="name"]').click({force: true}).type('Tutulo de prueba');
        cy.get('[placeholder="abcdef"]').click({force: true}).type('FFFFFF');
        cy.get('#tag-slug').click({force: true}).type('test');
        cy.get('#tag-description').click({force: true}).type('test');
        cy.contains("Save").click({force: true});

        //cy.contains("Username already taken.").should('be.visible')
      })
});
