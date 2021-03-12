/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: project
// ====================================================

export interface project_project {
  __typename: "Project";
  id: string | null;
  name: string | null;
  properties: {
    priceRange: {
      min: number,
      max: number,
    }
    surfaceRange: {
      min: number,
      max: number,
    }
    exposures: string[],
    typologies: number[],
  }
}

export interface project {
  project: project_project;
}

export interface setup {
  budget: number
  surface: number
  exposures: string[]
  typology: number
}
