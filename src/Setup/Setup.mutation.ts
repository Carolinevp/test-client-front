import gql from 'graphql-tag'

export const setupMutation = gql`
  mutation upsertSetup($setup: SetupInput!) {
    upsertSetup(setup: $setup) {
      project {
        id
        name
        properties {
          priceRange
          surfaceRange
          exposures
          typologies
        }
      }
    }
  }
`
