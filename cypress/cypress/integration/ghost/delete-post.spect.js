context('delete', () => {

    it('Delete Page', () => {
        cy.visit('http://localhost:2368/ghost/#/signin')

        cy.get('[placeholder="Email Address"]').type('sergoix93@hotmail.com');
        cy.get('[placeholder="Password"]').type('pruebasautomaticas');
        cy.contains("Sign in").click();
        cy.get('[href="#/posts/"]').click({force: true});
        cy.get('[title="Edit this post"]').eq(1).click({force: true});
        cy.wait(2000);
        cy.get('.view-actions').get('.post-settings').click({force: true})

        cy.contains("Delete post").click();
        cy.get(".gh-btn").eq(4
        ).click({force: true});
        //cy.get('.gh-btn').eq(1).click({force: true});
        //cy.contains("Export").eq(1).click({force: true});

      })
});
