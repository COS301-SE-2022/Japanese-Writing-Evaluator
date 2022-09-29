Cypress.Commands.add('login', (username, pass) => {
    cy.request({
        method: 'POST',
        url: 'http://localhost:8080/login',
        body: { email: username, password: pass },
    }).then(({ body }) => {
        cy.log('data:'+body)
        window.localStorage.setItem('id', body['data'][1].toString())
        window.localStorage.setItem('token',body['user-token'].toString())
    })
})


describe('User progress', () => {

    beforeEach(() => {
        cy.login('sechaba836@gmail.com', 'admin')
    })

    it('view users progress',()=>{
        cy.visit('/home')
        cy.get('a').eq(2).click()
        expect('/progress')

    });

    it('view hiragana progress', ()=>{
        cy.visit('/home')
        cy.get('a').eq(2).click()
        cy.get('app-options:first').click()

    })
})