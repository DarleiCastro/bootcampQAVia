/// <reference types="cypress" />
import usuarios from "../../fixtures/usuarios.json"

describe('US0001 - Funcionalidade Login', () => {
    it('Deve fazer login com sucesso', () => {
        cy.login('darlei@bootcamp.com','89S-tL:Qq_G5vda')
        cy.get('[data-test="dashboard-welcome"]').should('contain', ' Bem-vindo')
    });

    it('Validar mensagem de erro com usuario invalido', () => {
        cy.login('darleiii@bootcamp.com','89S-tL:Qq_G5vda')
        cy.get('[data-test="alert"]').should('contain', 'Credenciais inválidas')
    });

    it('Deve fazer login com sucesso - usando importação', () => {
        cy.login(usuarios[0].email, usuarios[0].senha)
        cy.title().should('eq', 'ConexaoQA')
    });

    it('Deve fazer login com sucesso - usando fixture', () => {
        cy.fixture("usuarios").then((usr) => {
            cy.login(usr[0].email, usr[0].senha)
            cy.title().should('eq', 'ConexaoQA')
        })
    });
})