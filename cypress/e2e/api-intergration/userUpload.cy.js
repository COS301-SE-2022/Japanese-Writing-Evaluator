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

    

    // const mockImage = {
    //     id: '82',
    //     image: 'data:image/png;base64,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',
    //     imagechar: 'U',
    //     file: 'u.png'
    // }
    // it('user upload headers ',()=>{
    //     cy.log(window.localStorage.getItem('token'))
    //     cy.request({
    //             method: 'POST',
    //             url: 'http://localhost:8080/upload',
    //             body: { mockImage },
    //             Headers: {
    //                 // 'content-type': 'application/json', 
    //                 'user-token': window.localStorage.getItem('token')
    //             }
    //         }
    //     )
    //     // .its('headers')
    //     // .its('content-type')
    //     // .should('include', 'application/json')

    //     // cy.request('POST','http://localhost:8080/upload',mockImage)
    //     // .its('headers')
    //     // .its('user-token')
    //     // .should('not.equal', '')
    // });

    // it('user upload response code ',()=>{
    //     cy.request('POST','http://localhost:8080/upload',mockImage).as('Upload');
    //     cy.get('@Upload').then(data=>{
    //         expect(data.status).to.equal(200)
    //     })
    // });
})