Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    cy.get('#firstName').type('Jhonata')
    cy.get('#lastName').type('Nascimento Santos')
    cy.get('#email').type('Jhonatans.barcelona@gmail.com')
    cy.get('#open-text-area').type('Teste')
    cy.contains('button', 'Enviar').click()
})