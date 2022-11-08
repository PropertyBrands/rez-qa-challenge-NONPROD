import MainPageObject from '../support/page_objects/mainPage'

describe('Story One', () => {
  beforeEach(function() {
    cy.fixture('test_data').as('testdata')
    this.mainPage = new MainPageObject()
    cy.visit('')
  })

  it('Each property should have favourite on/off button', function() {
    this.mainPage.getFavouriteButtons().each((fav_btn_lst) => {
      cy.wrap(fav_btn_lst)
        .should('exist')
        .should('be.visible')
        .should('have.attr', 'aria-checked', 'false')
        .click()
        .should('have.attr', 'aria-checked', 'true')
        .click()
        .should('have.attr', 'aria-checked', 'false')
    })
  })

  it('The hub should have an indicator on the number of properties selected as saved', function() {
    this.mainPage.getFavouritesCounter()
      .should('exist')
      .should('be.visible')
      .should('have.text', '(0)')
  })

  it('Indicator should show the total count of saved properties', function() {
    this.mainPage.getFavouriteButtons().then((fav_btn_lst) => {
      cy.wrap(fav_btn_lst).each((fav_btn) => {
        cy.wrap(fav_btn).click()
      })
      this.mainPage.getFavouritesCounter().should('have.text', `(${fav_btn_lst.length})`)
    })
  })

  it('When the indicator is clicked the hub should only display saved properties', function() {
    let headers = new Array()
    this.mainPage.getFavouriteButtons().then((fav_btn_lst) => {
      const sliced = fav_btn_lst.slice(0, 5);
      cy.wrap(sliced).each((fav_btn) => {
        headers.push(fav_btn.parent().find('h2').text())
        fav_btn.click()
      })
    })
    this.mainPage.getFavouritesFilterToggle().click({force: true})
    this.mainPage.getProperties().then((properties_lst) => {
      cy.wrap(properties_lst).should('have.length', 5)
      cy.wrap(properties_lst).each((property, index) => {
        cy.wrap(property).find('h2').should('have.text', headers[index])
      })
    })
  })

  it('Can un-save a property from the filtered view', function() {
    this.mainPage.getFavouriteButtons().then((fav_btn_lst) => {
      const sliced = fav_btn_lst.slice(0, 5);
      cy.wrap(sliced).each((fav_btn) => {
        fav_btn.click()
      })
    })
    this.mainPage.getFavouritesFilterToggle().click({force: true})
    this.mainPage.getProperties().should('have.length', 5)
    this.mainPage.getFavouriteButtons().eq(0).click()
    this.mainPage.getProperties().should('have.length', 4)
    this.mainPage.getFavouritesCounter().should('have.text', '(4)')
  })

// Could not test indicator on details screen because details page returns HTTP 404

})