context('Habitica Tests - Challenge CRUD', () => {

    before(() => {
        cy.visit('https://habitica.com/static/home');
        login();
    })

    it('creates public challenge', () => {
        cy.get('.nav-link[href="/challenges/myChallenges"]').click();
        cy.get('.create-challenge-button').click();
        cy.get('[placeholder="What is your Challenge name?"]').type('Cypress Public Challenge');
        cy.get('[placeholder="What short tag should be used to identify your Challenge?"]').type('Cypress Challenge');
        cy.get('.summary-count').type("This is a Cypress Challenge. Lorem Ipsum is simply dummy text of the printing and typesetting industry.");
        cy.get('.description-textarea').type("This is the description of my new cypress challenge");
        cy.get('select').select('00000000-0000-4000-A000-000000000000');
        cy.get('.category-select').click({ force: true })
            .get('input[id="challenge-modal-cat-creativity"]').check({ force: true });
        cy.contains('Close').click({ force: true });
        cy.contains('Add Challenge Tasks').click();
    });

    function login() {
        cy.visit('https://habitica.com/static/home');
        cy.get('.login-button').click().wait(1000)
            .get('#usernameInput').type('myname123fff');
        cy.get('#passwordInput').type('myname123fff');
        cy.get('.btn-info[type="submit"]').click();
    }
});

