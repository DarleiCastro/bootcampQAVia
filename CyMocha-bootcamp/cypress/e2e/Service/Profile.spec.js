/// <reference types="cypress"/>
import infoProfile from '../../fixtures/profile.json'

describe('Teste para Perfil usuario', () => {
    let token
    beforeEach(()=>{
        cy.tokenJwt().then((auth) =>{
            token = auth
        })
    })

    it('[GET] Selecionar Usuario pelo ID', () => {
        cy.idUsuario(token).then((response) => {
            let userId = response.body._id
            cy.request({
                method: "GET",
                url: `/api/profile/user/${userId}`,
            }).then((response) =>{
                expect(response.status).to.eq(200)
                cy.log(response.body.user.name)
                })  
        });
    });

    it('[POST] Edita perfil de usuario', () => {
        cy.request({
            method: "POST",
            url: '/api/profile',
            headers:{
                Cookie: token
            },
            body: infoProfile
            }).then((response) =>{
                expect(response.status).to.eq(200)
            })       
    });

    it('[PUT] Adicionar um experiência profissional', () => {
        cy.addExpProfissional(token).then((response) =>{
            expect(response.status).to.eq(200)
        })    
    });

    it('[DELETE] Deleta a primeira experiência profissional ', () => {
        cy.addExpProfissional(token).then((response) => {
            let experienceId = response.body.experience[0]._id
            cy.request({
                method: "DELETE",
                url: `/api/profile/experience/${experienceId}`,
                headers:{
                    Cookie: token
                }
            }).then((response) =>{
                expect(response.status).to.eq(200)
            }) 
        })
       
    });

    it('[PUT] Add formação acadêmica', () => {
        cy.addFormacaoAcademica(token).then((response) =>{
            expect(response.status).to.eq(200)
        })
    });

    it('[DELETE] Deleta a primeira Formação Acadêmica ', () => {
        cy.addFormacaoAcademica(token).then((response) => {
            let educationId = response.body.education[0]._id
            cy.request({
                method: "DELETE",
                url: `/api/profile/education/${educationId}`,
                headers:{
                    Cookie: token
                }                
            }).then((response) =>{
                expect(response.status).to.eq(200)
            }) 
        })
       
    }); 
});