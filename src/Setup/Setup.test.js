// eslint-disable-next-line import-helpers/order-imports
import { MockedProvider } from '@apollo/client/testing'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import React from 'react'

import Setup from './Setup'

describe('Setup', () => {
  it('should render form with title "Vos critères"', () => {
    render(
      <MockedProvider>
        <Setup />
      </MockedProvider>
    )
    expect(screen.getByText(/Vos critères/i)).toBeInTheDocument()
  })

  it('should render the submit button', () => {
    render(
      <MockedProvider>
        <Setup />
      </MockedProvider>
    )
    expect(screen.getByRole('button', { name: 'Valider' })).toBeInTheDocument()
  })

  it('should render form with 4 fields', () => {
    render(
      <MockedProvider>
        <Setup />
      </MockedProvider>
    )

    expect(screen.getByPlaceholderText(/Surface minimale/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/Typologie/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/Exposition/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/Budget maximum/i)).toBeInTheDocument()
  })

  //? this last test is not working for some reason...
  it('should submit when button is clicked', () => {
    const onSubmit = jest.fn((e) => e.preventDefault())
    render(
      <MockedProvider>
        <Setup onClick={onSubmit} />
      </MockedProvider>
    )
    fireEvent.submit(screen.getByTestId('form'))
    expect(onSubmit).toHaveBeenCalled()
  })
})
