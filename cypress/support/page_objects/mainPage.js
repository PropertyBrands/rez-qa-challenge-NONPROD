class MainPageObject {

  getFavouriteButtons () {
    return cy.get('.bt-teaser').find('.bt-button')
  }

  getFavouritesCounter () {
    return cy.get('.bt-favorites-link__count')
  }

  getFavouritesFilterToggle () {
    return cy.get('.bt-favorites-mode-toggle')
  }

  getFilterBathroomsMinusButton () {
    return cy.contains('Minimum Bathrooms').siblings('.bt-range-filter__button--minus')
  }

  getFilterBathroomsPlusButton () {
    return cy.contains('Minimum Bathrooms').siblings('.bt-range-filter__button--plus')
  }

  getFilterBathroomsValue () {
    return cy.contains('Minimum Bathrooms').siblings('.bt-range-filter__value')
  }

  getFilterBedroomsPlusButton () {
    return cy.contains('Minimum Bedrooms').siblings('.bt-range-filter__button--plus')
  }

  getFilterBedroomsMinusButton () {
    return cy.contains('Minimum Bedrooms').siblings('.bt-range-filter__button--minus')
  }

  getFilterBedroomsValue () {
    return cy.contains('Minimum Bedrooms').siblings('.bt-range-filter__value')
  }

  getFilterClearButton () {
    return cy.get('.bt-clear-filters')
  }

  getFilterMinusButtons () {
    return cy.get('.bt-range-filter__button--minus')
  }

  getFilterPlusButtons () {
    return cy.get('.bt-range-filter__button--plus')
  }

  getFilterResultsButton () {
    return cy.get('.bt-modal-toggle--close')
  }

  getFiltersButton () {
    return cy.get('.bt-modal-toggle--filters')
  }

  getProperties () {
    return cy.get('.bt-teaser')
  }

  getPropertiesHeaders () {
    return cy.get('.bt-teaser__info')
  }

}

export default MainPageObject