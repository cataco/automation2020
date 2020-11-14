context('Lab', () => {

    it('Exports Content', () => {
        cy.visit('http://localhost:2368/ghost/#/signin')
        cy.screenshot('exports_content_type');
        cy.get('[placeholder="Email Address"]').type('sergoix93@hotmail.com');
        cy.get('[placeholder="Password"]').type('pruebasautomaticas');
        cy.screenshot('exports_content_sign_in');
        cy.contains("Sign in").click();
        cy.screenshot('exports_content_labs');
        cy.get('[href="#/settings/labs/"]').click({force: true});
        cy.screenshot('exports_content_select');
        cy.get('.gh-btn').eq(1).click({force: true});
        //cy.contains("Export").eq(1).click({force: true});

      })
});
