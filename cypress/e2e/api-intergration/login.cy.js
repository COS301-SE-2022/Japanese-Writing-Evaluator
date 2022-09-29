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

describe('Login Page', () => {

    beforeEach(() => {
        cy.login('sechaba836@gmail.com', 'admin')
    })
  
    it('home should be accessible', () => {
      cy.visit('/home')
    })
  
})