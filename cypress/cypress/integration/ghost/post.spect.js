context('Post Creation', () => {

    it('Creates a post', () => {
        cy.visit('http://localhost:2368/ghost/#/signin')

        cy.get('[placeholder="Email Address"]').type('sergoix93@hotmail.com');
        cy.get('[placeholder="Password"]').type('pruebasautomaticas');
        cy.contains("Sign in").click();
        cy.get('[href="#/posts/"]').click({force: true});
        cy.get('[href="#/editor/post/"]').click({force: true});
        cy.get('[placeholder="Post Title"]').type('Tutulo de prueba');
        cy.get('[data-placeholder="Begin writing your post..."]').type('Texto de prueba');
        cy.wait(5000);
        cy.contains('Publish').click();

        //cy.contains("Username already taken.").should('be.visible')
      })
});
