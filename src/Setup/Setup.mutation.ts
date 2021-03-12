import gql from 'graphql-tag'

export const setupMutation = gql`
  mutation upsertSetup(
    $budget: Int!
    $surface: Int!
    $exposures: [String]!
    $typology: Int!
  ) {
    upsertSetup(
      setup: {
        budget: $budget
        surface: $surface
        exposures: $exposures
        typology: $typology
      }
    )
  }
`
