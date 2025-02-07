import Calendar from './Calendar.vue'
import jsonConfiguration from "../assets/configuration.json"
const  configuration  = JSON.stringify(jsonConfiguration)

describe('Calendar component', () => {

  beforeEach(() => {
    cy.mount(Calendar,{
      props:{
        conf:configuration
      }
    })
  })

  it('check if year unit is enabled and have set value', () => {
    cy.get('#calendar-select').select("year")
    cy.get('#calendar-number-year').type("55")
    cy.get('#calendar-form').submit()
    cy.get('#output').then(($output) =>{
      const output = $output.text()
      const outputJson = JSON.parse(output)
      expect(outputJson.configuration[0].enabled).to.eq(true)
      expect(outputJson.selectedUnit).to.eq('year')
      expect(outputJson.numberUnit.value).to.eq(55)
    } )
  })

  it('check if quarter unit is enabled and has proper value according to min / max configuration', () => {
    cy.get('#calendar-select').select("quarter")
    cy.get('#calendar-number-quarter').type("3")
    cy.get('#calendar-form').submit()
    cy.get('#output').then(($output) =>{
      const output = $output.text()
      const outputJson = JSON.parse(output)
      const quarter = outputJson.configuration.find(unit => unit.name === 'quarter')
      expect(quarter.min).to.be.lte(quarter.value)
      expect(quarter.max).to.be.gte(quarter.value)
    } )
  })

  it('check if date-from unit is enabled and is selected unit', () => {
    cy.get('#calendar-select').select("date-from")
    cy.get('#calendar-form').submit()
    cy.get('#output').then(($output) =>{
      const output = $output.text()
      const outputJson = JSON.parse(output)
      expect(outputJson.selectedUnit).to.eq('date-from')
    } )
  })

  it('check if date-to unit is enabled and is selected unit', () => {
    cy.get('#calendar-select').select("date-to")
    cy.get('#calendar-form').submit()
    cy.get('#output').then(($output) =>{
      const output = $output.text()
      const outputJson = JSON.parse(output)
      expect(outputJson.selectedUnit).to.eq('date-to')
    } )
  })

  it('check if date-from-to unit is enabled and is selected unit', () => {
    cy.get('#calendar-select').select("date-from-to")
    cy.get('#calendar-form').submit()
    cy.get('#output').then(($output) =>{
      const output = $output.text()
      const outputJson = JSON.parse(output)
      expect(outputJson.selectedUnit).to.eq('date-from-to')
    } )
  })

  it('check if date-from unit is enabled and have proper value according to configuration min / max date', () => {
    cy.get('#calendar-select').select("date-from")
    cy.get('#calendar-date-from').type('2025-02-07')
    cy.get('#calendar-form').submit()
    cy.get('#output').then(($output) =>{
      const output = $output.text()
      const outputJson = JSON.parse(output)
      const dateMin = new Date(outputJson.dateUnitFrom.min)
      const dateMax = new Date(outputJson.dateUnitFrom.max)
      const dateValue = new Date(outputJson.dateUnitFrom.value)
      expect(outputJson.dateUnitFrom.value).to.eq('2025-02-07')
      expect(dateMin).to.lt(dateValue)
      expect(dateMax).to.gt(dateValue)
    } )
  })

  it('check if minute unit is disabled as it should be according to entry configuration', () => {
    cy.get('#calendar-select option:contains(minute)').should('not.exist')
  })
})