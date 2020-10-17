const faker = require("faker");

context('Tags Creation', () => {
    let title = faker.random.word();
    let description = faker.random.words();

    it('Creates a tag with name: '+title+" and descriptio: "+description, () => {
        cy.visit('http://localhost:2368/ghost/#/signin')
        cy.get('[placeholder="Email Address"]').type('sergoix93@hotmail.com');
        cy.get('[placeholder="Password"]').type('pruebasautomaticas');
        cy.contains("Sign in").click();
        cy.get('[href="#/tags/"]').click({force: true});
        cy.get('[href="#/tags/new/"]').click({force: true});
        cy.get('[name="name"]').click({force: true}).type(title);
        cy.get('[placeholder="abcdef"]').click({force: true}).type('FFFFFF');
        cy.get('#tag-slug').click({force: true}).type('test');
        cy.get('#tag-description').click({force: true}).type(description);
        cy.contains("Save").click({force: true});

        //cy.contains("Username already taken.").should('be.visible')
      })
});
