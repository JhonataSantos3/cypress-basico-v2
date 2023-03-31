/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function() {
        cy.visit('./src/index.html')
    })
    it('Verifica o título da aplicação', function() {
  
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  
    }) 
    it('Preencha os campos obrigatórios e envia o formulário', function() {
        const longText = 'teste teste teste teste teste teste'
        cy.get('#firstName').should('be.visible').type('Jhonata').should('have.value', 'Jhonata')
        cy.get('#lastName').should('be.visible').type('Nascimento Santos').should('have.value', 'Nascimento Santos')
        cy.get('#email').should('be.visible').type('Jhonatans.barcelona@gmail.com').should('have.value', 'Jhonatans.barcelona@gmail.com')
        cy.get('#open-text-area').should('be.visible').type(longText, {delay: 0}).should('have.value', longText)
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')
    })
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        cy.get('#firstName').should('be.visible').type('Jhonata').should('have.value', 'Jhonata')
        cy.get('#lastName').should('be.visible').type('Nascimento Santos').should('have.value', 'Nascimento Santos')
        cy.get('#email').should('be.visible').type('Jhonatans.barcelona@gmail.com').should('have.value', 'Jhonatans.barcelona@gmail.com')
        cy.get('#open-text-area').should('be.visible').type('Teste')
        cy.contains('button', 'Enviar').click()


        cy.get('.success').should('be.visible')
})
    it('valor não-numérico for digitado', function() {
   
    cy.get('#phone').type('asctdbtb').should('have.value', '')
})
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
    cy.get('#firstName').type('Jhonata')
    cy.get('#lastName').type('Nascimento Santos')
    cy.get('#email').type('Jhonatans.barcelona@gmail.com')
    cy.get('#phone-checkbox').check()
    cy.get('#open-text-area').type('Teste')
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
})
    it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
    cy.get('#firstName').type('Walmyr').should('have.value', 'Walmyr')
    .clear().should('have.value', '')
    cy.get('#lastName').type('Nascimento Santos').should('have.value', 'Nascimento Santos')
    .clear().should('have.value', '')
    cy.get('#email').type('Jhonatans.barcelona@gmail.com').should('have.value', 'Jhonatans.barcelona@gmail.com')
    .clear().should('have.value', '')
    cy.get('#phone').type('1234').should('have.value', '1234')
    .clear().should('have.value', '')
})
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){

    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
})
    it('envia o formuário com sucesso usando um comando customizado', function(){
    cy.fillMandatoryFieldsAndSubmit()
    cy.get('.success').should('be.visible')
})
    it('seleciona um produto (YouTube) por seu texto', function(){
    cy.get('#product').select('youtube').should('have.value', 'youtube')

})
    it('seleciona um produto (Mentoria) por seu valor (value)', function(){
    const nome = 'mentoria'
    cy.get('#product').select(nome).should('have.value', nome)
})
    it('seleciona um produto (Blog) por seu índice', function(){
cy.get('#product').select(1).should('have.value', 'blog')
})
    it('marca o tipo de atendimento "Feedback"', function(){
    cy.get(':nth-child(4) > input').check().should('be.checked')
})
    it('marca cada tipo de atendimento', function(){
    cy.get('input[type="radio"]').should('have.length', '3')
    .each(function($radio){
        cy.wrap($radio).check()
        cy.wrap($radio).should('be.checked')
    })
})
    it('marca ambos checkboxes, depois desmarca o último', function(){
cy.get('input[type="checkbox"]').check()
.should('be.checked')
.last().uncheck().should('not.be.checked')
    
  })  
  it('seleciona um arquivo da pasta fixtures', function(){
    cy.get('input[type="file"]')
    .should('not.have.value')
    .selectFile('./cypress/fixtures/example.json')
    .should(function($input){
    expect($input[0].files[0].name).to.equal('example.json')
})
    })
it('seleciona um arquivo simulando um drag-and-drop', function(){
    cy.get('input[type="file"]')
    .should('not.have.value')
    .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop'})
    .should(function($input){
    expect($input[0].files[0].name).to.equal('example.json')
})
})
it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
cy.fixture('example.json').as('sampleFile')
cy.get('input[type="file"]')
.selectFile('@sampleFile')
.should(function($input){
expect($input[0].files[0].name).to.equal('example.json')

})
})
it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
    cy.get('#privacy a').should('have.attr', 'target', '_blank')
})
    it('acessa a página da política de privacidade removendo o target e então clicanco no link', function(){
        cy.get('#privacy a')
        .invoke('removeAttr', 'target')
        .click()
        cy.contains('Talking About Testing').should('be.visible')
    })
    it.only('testa a página da política de privavidade de forma independente', function(){

    })
  
})
  