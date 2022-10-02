///<reference types="cypress"/>

describe('US0002 -  Criar perfil de usuario', () => {
    beforeEach(() => {
        cy.cadastrar()        
        cy.visit('criar-perfil')
    });
    it('Deve criar perfil de usuario com sucesso', () => {
        cy.criarPerfil('vários e mais alguns')
        cy.get('.large').should('contain','Dashboard')
        cy.get('[data-test="alert"]').should('be.visible')
    });

    it('Validar Campos obrigatorios (Status - Conhecimentos)', () => {
        cy.get('[data-test="profile-submit"]').click()
        cy.get('#status').should('not.contain.text')
        cy.get('[data-test="profile-skills"] > .MuiInputBase-root > .MuiInputBase-input').should('not.contain.text')
        cy.get('.MuiFormHelperText-root').should('be.visible')
    });

    it('Deve criar perfil só com dados obrigatorios com sucesso', () => {
        cy.get('#mui-component-select-status').click()
        cy.get('[data-test="status-2"]').click()
        cy.get('[data-test="profile-skills"] > .MuiInputBase-root > .MuiInputBase-input')
            .type('CYPRESS')
        cy.get('[data-test="profile-submit"]').click()
        cy.get('[data-test="alert"]').should('be.visible')
    });
});