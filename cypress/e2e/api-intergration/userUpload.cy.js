// Cypress.Commands.add('login', (username, pass) => {
//     cy.request({
//         method: 'POST',
//         url: 'http://localhost:8080/login',
//         body: { email: username, password: pass },
//     }).then(({ body }) => {
//         cy.log('data:'+body)
//         window.localStorage.setItem('id', body['data'][1].toString())
//         window.localStorage.setItem('token',body['user-token'].toString())
//     })
// })


describe('User upload', () => {

    beforeEach(() => {
        cy.login('sechaba836@gmail.com', 'admin')
    })

    it('navigate to upload',()=>{
        cy.visit('/home')
        cy.get('app-options:first').click()
        cy.get('app-block-try-char:first').click()

    });

    it('upload image',()=>{
        cy.visit('/home')
        cy.get('app-options:first').click()
        cy.get('app-block-try-char:first').click()
        cy.get('input').selectFile('cypress/fixtures/kanaA1.jpg')
        cy.get('ion-button:first').click()

    });

    it('upload wrong character',()=>{
        cy.visit('/home')
        cy.get('app-options:first').click()
        cy.get('app-block-try-char:first').click()
        cy.get('input').selectFile('cypress/fixtures/kanaDA2.jpg')
        cy.get('ion-button:first').click()

    });

})