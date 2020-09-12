context('Habitica Tests - Register and Login Flow', () => {

    let testUser;

    before(() => {
        cy.visit('https://habitica.com/static/home');
        var randomNumber = getRandomInt(0, 1000);
        testUser = 'cyTestUser' + randomNumber;
    })

    it('creates account', () => {
        cy.get('#usernameInput').type(testUser).should('have.value', testUser);
        cy.get('[type="email"]').type(testUser + '@email.com').should('have.value', testUser + '@email.com');
        cy.get('[placeholder="Password"]').type(testUser);
        cy.get('[placeholder="Confirm Password"]').type(testUser);
        cy.get('.btn-info[type="submit"]').click()
            .get("#avatar-modal___BV_modal_body_").should('be.visible');

    });

    it('Logs out', () => {
        cy.get('#menu_collapse').click();
        cy.contains('Log Out').click({ force: true });
    });

    it('Logs in', () => {
        cy.get('.login-button').click()
            .wait(1000)
            .get('#usernameInput').type('myname123fff');
        cy.get('#passwordInput').type('myname123fff');
        cy.get('.btn-info[type="submit"]').click()
            .get('#menu_collapse').should('be.visible');
        cy.get('#menu_collapse').click();
        cy.contains('Log Out').click({ force: true });
    });

    it('creates account with existing user data', () => {
        cy.get('#usernameInput').type(testUser).should('have.value', testUser);
        cy.get('[type="email"]').type(testUser + '@email.com').should('have.value', testUser + '@email.com');
        cy.get('[placeholder="Password"]').type(testUser);
        cy.get('[placeholder="Confirm Password"]').type(testUser);
        cy.get('.btn-info[type="submit"]').should('be.disabled');
    });

   
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    };
});

