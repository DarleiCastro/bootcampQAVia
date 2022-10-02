class FormacaoPage{
    get #escola() { return cy.get('[data-test="education-school"]') }
    get #grau() { return cy.get('[data-test="education-degree"]') }
    get #curso() { return  cy.get('[data-test="education-fieldOfStudy"]')}
    get #dataInicio() {return cy.get('#from') } 
    get #checkCursando() { return cy.get('[name="current"]')}
    get #dataFim() { return cy.get('[data-test="education-to"] > .MuiInputBase-root')}
    get #descricao() { return cy.get('[rows="1"]')}
    get #btnAdd() { return cy.get('[data-test="education-submit"]').click()}

    addFormacao(escola, grau, curso, dataInicio, dataFim,descricao){
        this.#escola.type(escola)
        this.#grau.type(grau)
        this.#curso.type(curso)
        this.#dataInicio.type(dataInicio)
        this.#dataFim.type(dataFim)
        this.#descricao.type(descricao)
        this.#btnAdd.click()
    }

    addFormacaoCursando(escola, grau, curso, dataInicio, descricao){
        this.#escola.type(escola)
        this.#grau.type(grau)
        this.#curso.type(curso)
        this.#dataInicio.type(dataInicio)
        this.#checkCursando.check()
        this.#descricao.type(descricao)
        this.#btnAdd.click()
    }
}

export default new FormacaoPage()