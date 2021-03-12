import { useQuery, useMutation } from '@apollo/client'
import * as React from 'react'
import { useState } from 'react'

import {
  Button,
  Title,
  Text,
  Icon,
  Card,
  TextInput,
  TextInputList,
} from '@habx/ui-core'

import { setupMutation } from './Setup.mutation'
import { projectQuery } from './Setup.query'
import { SetupContainer } from './Setup.style'
import { project, setup } from './types/project'
import './Setup.css'

const Setup = () => {
  const projectResponse = useQuery<project>(projectQuery)

  const [surface, setSurface] = useState<number>()
  const [budget, setBudget] = useState<number>()
  const [typology, setTypology] = useState<string>('')
  const [exposure, setExposure] = useState<string[]>([])

  const [upsertSetup] = useMutation<setup>(setupMutation, {
    variables: {
      budget: budget,
      surface: surface,
      exposures: exposure,
      typology: Number(typology[0]),
    },
  })

  function handleSurfaceChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSurface(Number(event.currentTarget.value))
  }

  function handleBudgetChange(event: React.ChangeEvent<HTMLInputElement>) {
    setBudget(Number(event.currentTarget.value))
  }

  function handleTypologyChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTypology(event.currentTarget.value)
  }

  function handleExposureChange(value: any) {
    setExposure(value)
  }

  return (
    <SetupContainer>
      <Title type="header">{projectResponse.data?.project?.name}</Title>
      <br />
      <form onSubmit={() => upsertSetup()}>
        <Card spacing="narrow" id="card">
          <div>
            <Text>Vos critères</Text>
          </div>
          <div className="input">
            <TextInput
              className="text-input"
              small={true}
              type="number"
              placeholder="Budget maximum"
              elementRight={<Icon icon="euro"></Icon>}
              value={budget}
              onChange={handleBudgetChange}
              min={projectResponse.data?.project?.properties?.priceRange.min}
              max={projectResponse.data?.project?.properties?.priceRange.max}
              step={1000}
            />

            <TextInput
              className="text-input"
              type="number"
              small={true}
              min={projectResponse.data?.project?.properties?.surfaceRange.min}
              max={projectResponse.data?.project?.properties?.surfaceRange.max}
              placeholder="Surface minimale"
              elementRight={<Text>m²</Text>}
              value={surface}
              onChange={handleSurfaceChange}
            />
            <TextInput
              className="text-input"
              small={true}
              placeholder="Typologie"
              elementRight={<Icon icon="house-building-outline"></Icon>}
              value={typology}
              list="typologies"
              onChange={handleTypologyChange}
            />
            <datalist id="typologies">
              {projectResponse?.data?.project?.properties?.typologies?.map(
                (typo: number) => (
                  <option
                    key={typo}
                    value={typo === 1 ? `${typo} pièce` : `${typo} pièces`}
                  ></option>
                )
              )}
            </datalist>
            <TextInputList
              className="text-input"
              small={true}
              placeholder="Exposition"
              // elementRight={<Icon icon="compass-outline"></Icon>}
              value={exposure}
              options={projectResponse?.data?.project?.properties?.exposures}
              onChange={handleExposureChange}
              multiple
            />
          </div>
          <Button onClick={() => upsertSetup()} data-testid="form">
            Valider
          </Button>
        </Card>
      </form>
    </SetupContainer>
  )
}

export default Setup
