/// <reference types="Cypress" />
import auth from '../fixtures/auth.json'
import infoExperience from '../fixtures/experience.json'
import infoAcademica from '../fixtures/formacaoAcademica.json'
const faker = require('faker-br')

Cypress.Commands.add('navigate', (route) => {
    cy.intercept(route).as('loadpage')
    cy.visit(route, { timeout: 30000 })
    cy.wait('@loadpage')
})

Cypress.Commands.add("login", (email, password) => { 
    cy.visit('login')
    cy.get('[data-test="login-email"] > .MuiInputBase-root > .MuiInputBase-input').type(email)
   //  cy.get('[data-test="login-password"] > .MuiInputBase-root > .MuiInputBase-input').type(password)
    cy.get('[data-test="login-password"]').type(password)
    cy.get('[data-test="login-submit"]').click()
 })
 // cadastrar usuario
 Cypress.Commands.add("cadastrar", () => {
      const nome = faker.name.firstName()
      const email = faker.internet.email()
      const senha = faker.internet.password()
      cy.visit('cadastrar')
      cy.get('[data-test="register-name"] > .MuiInputBase-root > .MuiInputBase-input').type(nome)
      cy.get('[data-test="register-email"] > .MuiInputBase-root > .MuiInputBase-input').type(email)
      cy.get('[data-test="register-password"] > .MuiInputBase-root > .MuiInputBase-input').type(senha)
      cy.get('[data-test="register-password2"] > .MuiInputBase-root > .MuiInputBase-input').type(senha)
      cy.get('[data-test="register-submit"]').click()
 })
 // Criar perfil usuario
 Cypress.Commands.add("criarPerfil", (biografia) => {
      const empresa = faker.company.companyName()
      const site = faker.internet.url()
      const cidade = faker.address.city()
      const conhecimento = 'Só sei que nada sei'
      const github = `https://github.com/`
    cy.get('#mui-component-select-status').click()
    cy.get('[data-test="status-2"]').click()     
    cy.get('[data-test="profile-company"] > .MuiInputBase-root > .MuiInputBase-input').type(empresa)
    cy.get('[data-test="profile-webSite"] > .MuiInputBase-root > .MuiInputBase-input').type(site)
    cy.get('[data-test="profile-location"] > .MuiInputBase-root > .MuiInputBase-input').type(cidade)
    cy.get('[data-test="profile-skills"] > .MuiInputBase-root > .MuiInputBase-input').type(conhecimento)
    cy.get('[data-test="profile-gitHub"] > .MuiInputBase-root > .MuiInputBase-input').type(github)
    cy.get('[rows="1"]').type(biografia) 
    cy.get('[data-test="profile-submit"]').click()
 })

// APIs
 Cypress.Commands.add("tokenJwt", () => {
   cy.request({
      method: 'POST',
      url: 'api/auth',
      body: auth
   }).then((response) =>{
      return response.body.jwt
   })    
})

Cypress.Commands.add("criarPostagem", (token,value) => {
   cy.request({
      method: 'POST',
      url: 'api/posts',
      headers: {
         Cookie: token
      },
      body: {
         text: value
      }
  })
   
})

Cypress.Commands.add("idUsuario", (token) => {
   cy.request({
      method: 'GET',
      url: '/api/auth',
      headers: {
         Cookie: token
      }
  })
})

Cypress.Commands.add("addExpProfissional", (token) => {
   cy.request({    
         method: "PUT",
         url: '/api/profile/experience',
         headers:{
            Cookie: token
         },
         body: infoExperience[0]
   })
})

Cypress.Commands.add("addFormacaoAcademica", (token) => {
   cy.request({
      method: "PUT",
      url: '/api/profile/education',
      headers:{
          Cookie: token
      },
      body: infoAcademica[1]    
   })
})

// import user from '../fixtures/usuarios.json'
// Cypress.Commands.add("loginApp", (email, password) => { 
//     cy.request({
//       method: 'POST',
//       url: '/api/auth',
//       body: {
//          "email": user[0].email,
//          "password": user[0].senha
//       }
//     })
// })