/// <reference types="cypress"/>
const formacaoPage = require('../../support/Formacao/formacao-pages')

describe('Funcionalidade Adicionar Formacao Academica', () => {
    beforeEach(() => {
        cy.fixture("usuarios").then((usr) => {
            cy.login(usr[0].email, usr[0].senha)
        })
    });
    it('Deve adicionar formação academica com sucesso', () => {    
        cy.visit('adicionar-formacao')  
        formacaoPage.addFormacao("IFF JC","TEC INFO","TEC","02/02/2011","10/12/2014","Técnico em Informática")
        cy.get('[data-test="education-delete"]').should('be.visible')      
    });
    it('Deve adicionar cursando uma formação academica  com sucesso', () => {    
        cy.visit('adicionar-formacao') 
        formacaoPage.addFormacaoCursando("EBAC","Engenheiro","Engnheiro de QA","02/02/2016", "Curso de Engenharia de Qualidade")
        cy.get('[data-test="education-delete"]').should('be.visible')
    });
    it('Deve eliminar uma formação academica com sucesso', () => {
        cy.visit('dashboard') 
        cy.get('[data-test="education-delete"]').first().click()
        cy.contains('Formação Acadêmica Removida').should('be.visible')
    });

});