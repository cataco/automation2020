const faker = require("faker");

context('Post Creation', () => {
    let title = faker.random.word();
    let description = faker.random.words();

    it('Creates a post with title: '+title +". and description: "+description, () => {
        cy.visit('http://localhost:2368/ghost/#/signin')
        cy.screenshot('creates_post_sign_in');
        cy.get('[placeholder="Email Address"]').type('sergoix93@hotmail.com');
        cy.get('[placeholder="Password"]').type('pruebasautomaticas');
        cy.contains("Sign in").click();
        cy.screenshot('creates_post_navigates');
        cy.get('[href="#/posts/"]').click({force: true});
        cy.screenshot('creates_post_title');
        cy.get('[href="#/editor/post/"]').click({force: true});
        cy.screenshot('creates_post_types');
        cy.get('[placeholder="Post Title"]').type(title);
        cy.screenshot('creates_post_types_description');
        cy.get('[data-placeholder="Begin writing your post..."]').type(description);
        cy.wait(5000);
        cy.contains('Publish').click();
        cy.screenshot('creates_post_after_publish');
        //cy.contains("Username already taken.").should('be.visible')
      })
});
