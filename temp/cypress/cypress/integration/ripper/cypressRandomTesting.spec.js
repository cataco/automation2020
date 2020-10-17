describe('Web App under monkeys', function () {

    let url;
    let numberOfEvents;

    before(() => {
        url = Cypress.env('url');
        numberOfEvents = Cypress.env('events');
    })

    it('visits web app and survives monkeys', function () {
        cy.visit(url);
        cy.wait(1000);
        randomEvent(numberOfEvents);
    });

    function randomEvent(monkeysLeft) {

        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min;
        };
        var randomeEventId = getRandomInt(1, 5);
        var monkeysLeft = monkeysLeft;
        if (monkeysLeft > 0) {
            switch (randomeEventId) {
                case 1: // click on random link
                    cy.get('a').then($links => {
                        var randomLink = $links.get(getRandomInt(0, $links.length));
                        if (!Cypress.dom.isHidden(randomLink)) {
                            cy.wrap(randomLink).click({ force: true });
                            monkeysLeft = monkeysLeft - 1;
                        }
                        cy.wait(500);
                        randomEvent(monkeysLeft);
                    });
                    break;
                case 2: // type in random field
                    cy.get('input').then($inputs => {
                        var randomInput = $inputs.get(getRandomInt(0, $inputs.length));
                        if (!Cypress.dom.isHidden(randomInput)) {
                            cy.wrap(randomInput).type("Moneky Test", { force: true });
                            monkeysLeft = monkeysLeft - 1;
                        }
                        cy.wait(500);
                        randomEvent(monkeysLeft);
                    });
                    break;
                case 3: // click on random button
                    cy.get('button').then($buttons => {
                        var randomButton = $buttons.get(getRandomInt(0, $buttons.length));
                        if (!Cypress.dom.isHidden(randomButton)) {
                            cy.wrap(randomButton).click({ force: true });
                            monkeysLeft = monkeysLeft - 1;
                        }
                        cy.wait(500);
                        randomEvent(monkeysLeft);
                    });
                    break;
                case 4: // click on random option
                    cy.get('li').then($options => {
                        var randomOption = $options.get(getRandomInt(0, $options.length));
                        if (!Cypress.dom.isHidden(randomOption)) {
                            cy.wrap(randomOption).click({ force: true });
                            monkeysLeft = monkeysLeft - 1;
                        }
                        cy.wait(1000);
                        randomEvent(monkeysLeft);
                    });
                    break;
            }
        }
    }
});