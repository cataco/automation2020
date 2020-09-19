describe('Web App under monkeys', function () {

    let url;
    let numberOfEvents;
    let seeds;

    before(() => {
        url = Cypress.env('url');
        numberOfEvents = Cypress.env('events');
        seeds = Cypress.env('seeds').split(';'); 
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
    var randomeEventId = getRandomInt(0, seeds.length);
    var monkeysLeft = monkeysLeft;
    if (monkeysLeft > 0) {
        var seedKeyValue = seeds[randomeEventId].split(':');
        var seedObject = seedKeyValue[0];
        var seedEvent = seedKeyValue[1];
        cy.get(seedObject).then($elements => {
            var randomElement = $elements.get(getRandomInt(0, $elements.length));
            if (!Cypress.dom.isHidden(randomElement)) {
                switch (seedEvent) {
                    case 'click':
                        cy.log('CLICK '+seedObject);
                        cy.wrap(randomElement).click({ force: true });
                        break;
                    case 'type':
                        cy.log('TYPE '+seedObject);
                        cy.wrap(randomElement).type('Random Testing Text ' + randomeEventId, { force: true });
                        break;
                    case 'clear':
                        cy.log('CLEAR '+seedObject);
                        cy.wrap(randomElement).clear({ force: true });
                        break;
                    case 'dblclick':
                        cy.log('DB CLICK '+seedObject);
                        cy.wrap(randomElement).dblclick({ force: true });
                        break;
                    case 'scroll':
                        cy.log('SCROLL '+seedObject);
                        cy.wrap(randomElement).scrollIntoView({ force: true });
                        break;
                }
                monkeysLeft = monkeysLeft - 1;
            }
            cy.wait(500);
            randomEvent(monkeysLeft);
        });
    }
}
});