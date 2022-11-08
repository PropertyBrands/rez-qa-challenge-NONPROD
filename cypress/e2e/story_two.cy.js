import MainPageObject from '../support/page_objects/mainPage'

describe('Story Two', () => {
  beforeEach(function() {
    cy.fixture('test_data').as('testdata')
    this.mainPage = new MainPageObject()
    cy.visit('')
  })

  it('The Filters selection should allow the user to select the number of bedrooms', function() {
    this.mainPage.getFiltersButton().click({force: true})
    this.mainPage.getFilterBedroomsPlusButton().then((button) => {
      for(let i = 0; i < 10; i ++){
        cy.wrap(button).click()
      }
    })
    this.mainPage.getFilterBedroomsValue().should('have.text', '10')
    this.mainPage.getFilterBedroomsMinusButton().then((button) => {
      for(let i = 0; i < 5; i ++){
        cy.wrap(button).click()
      }
    })
    this.mainPage.getFilterBedroomsValue().should('have.text', '5')
    this.mainPage.getFilterResultsButton().click()
    this.mainPage.getPropertiesHeaders().each((property) => {
      cy.wrap(property.text()).should('match', /Beds: [5-9]|Beds: \d+\d/)
    })
  })

  it('The Filters selection should allow the user to select the number of bathrooms.', function() {
    this.mainPage.getFiltersButton().click({force: true})
    this.mainPage.getFilterBathroomsPlusButton().then((button) => {
      for(let i = 0; i < 10; i ++){
        cy.wrap(button).click()
      }
    })
    this.mainPage.getFilterBathroomsValue().should('have.text', '10')
    this.mainPage.getFilterBathroomsMinusButton().then((button) => {
      for(let i = 0; i < 5; i ++){
        cy.wrap(button).click()
      }
    })
    this.mainPage.getFilterBathroomsValue().should('have.text', '5')
    this.mainPage.getFilterResultsButton().click()
    this.mainPage.getPropertiesHeaders().each((property) => {
      cy.wrap(property.text()).should('match', /Baths: [5-9]|Baths: \d+\d/)
    })
  })

  it('The Filters selection should allow the user to select the number of bedrooms and bathrooms.', function() {
    this.mainPage.getFiltersButton().click({force: true})
    this.mainPage.getFilterPlusButtons().then((button) => {
      for(let i = 0; i < 4; i ++){
        cy.wrap(button).click({multiple: true})
      }
    })
    this.mainPage.getFilterBedroomsValue().should('have.text', '4')
    this.mainPage.getFilterBathroomsValue().should('have.text', '4')
    this.mainPage.getFilterResultsButton().click()
    this.mainPage.getPropertiesHeaders().each((property) => {
      cy.wrap(property.text()).should('match', /(Beds: [4-9]|Beds: \d+\d) \| (Baths: [4-9]|Baths: \d+\d)/)
    })
  })

  it('The selection should limit the value to an integer with a lower value of 0 (zero)', function() {
    this.mainPage.getFiltersButton().click({force: true})
    this.mainPage.getFilterMinusButtons().then((button) => {
      for(let i = 0; i < 3; i ++){
        cy.wrap(button).click({multiple: true})
      }
    })
    this.mainPage.getFilterBedroomsValue().should('have.text', '0')
    this.mainPage.getFilterBathroomsValue().should('have.text', '0')
  })

  it('The Clear Filters button should reset both filters to their lower value', function() {
    this.mainPage.getFiltersButton().click({force: true})
    this.mainPage.getFilterPlusButtons().then((button) => {
      for(let i = 0; i < 5; i ++){
        cy.wrap(button).click({multiple: true})
      }
    })
    this.mainPage.getFilterBedroomsValue().should('have.text', '5')
    this.mainPage.getFilterBathroomsValue().should('have.text', '5')
    this.mainPage.getFilterResultsButton().click()
    this.mainPage.getProperties().its('length').as('len')
    this.mainPage.getPropertiesHeaders().each((property) => {
      cy.wrap(property.text()).should('match', /(Beds: [5-9]|Beds: \d+\d) \| (Baths: [5-9]|Baths: \d+\d)/)
    })
    this.mainPage.getFiltersButton().click({force: true})
    this.mainPage.getFilterClearButton().click({force: true})
    this.mainPage.getFilterBedroomsValue().should('have.text', '0')
    this.mainPage.getFilterBathroomsValue().should('have.text', '0')
    this.mainPage.getFilterResultsButton().click()
    this.mainPage.getProperties().then((properties) => {
      cy.wrap(properties).should('have.length.gt', this.len)
    })
  })

// 'The View Results button should close the Filter Results page and display properties on the hub meeting the criteria'
// case was realized in other tests

})