describe('Форма входа - https://practicetestautomation.com/practice-test-login/', () => {

  beforeEach(() => {
    cy.visit('https://practicetestautomation.com/practice-test-login/')
    cy.wait(2000) // ВРЕМЕННОЕ ожидание, чтобы страница успела прогрузиться
    cy.get('#username').should('exist') // проверка, что поле появилось
  })

  //  1. Успешный вход с правильными данными
  it('Успешный вход с правильными данными', () => {
    cy.get('#username').type('student')
    cy.get('#password').type('Password123')
    cy.get('#submit').click()


    cy.url().should('include', '/logged-in-successfully')
    cy.contains('Congratulations student. You successfully logged in!').should('be.visible')
  })

  //  2. Ошибка при вводе неправильного логина
  it('Ошибка при вводе неправильного логина', () => {
    cy.get('#username').type('неправильныйЛогин')
    cy.get('#password').type('Password123')
    cy.get('#submit').click()


    cy.get('div#error').should('be.visible')
    cy.get('div#error').should('have.text', 'Your username is invalid!')
  })

  //  3. Ошибка при вводе неправильного пароля
  it('Ошибка при вводе неправильного пароля', () => {
    cy.get('#username').type('student')
    cy.get('#password').type('неверныйПароль')
    cy.get('#submit').click()


    cy.get('div#error').should('be.visible')
    cy.get('div#error').should('have.text', 'Your password is invalid!')
  })

  //  4. Ошибка при отправке пустой формы
  it('Ошибка при отправке пустой формы', () => {
    cy.get('#submit').click()


    cy.get('div#error').should('be.visible')
    cy.get('div#error').should('contain', 'username') // универсальная проверка
  })

  //  5. Ошибка при логине с заглавной буквы
  it('Ошибка при логине с заглавной буквы', () => {
    cy.get('#username').type('Student') // заглавная "S"
    cy.get('#password').type('Password123')
    cy.get('#submit').click()


    cy.get('div#error').should('be.visible')
    cy.get('div#error').should('have.text', 'Your username is invalid!')
  })

})
