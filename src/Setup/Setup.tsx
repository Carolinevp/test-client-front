import { useQuery, useMutation } from '@apollo/client'
import * as React from 'react'
import { useState } from 'react'
// import { Form } from 'react-final-form'

import {
  Button,
  Title,
  Text,
  Icon,
  Card,
  TextInput,
  Select,
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
  const [exposure, setExposure] = useState<string[]>([''])

  const [upsertSetup] = useMutation<setup>(setupMutation, {
    variables: {
      project: {
        id: projectResponse?.data?.project?.id,
        name: projectResponse?.data?.project?.name,
        properties: {
          budget: budget,
          surface: surface,
          exposures: exposure,
          typology: Number(typology[0]),
        },
      },
    },
  })

  function handleSurfaceChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSurface(Number(event.currentTarget.value))
  }

  function handleBudgetChange(event: React.ChangeEvent<HTMLInputElement>) {
    setBudget(Number(event.currentTarget.value))
  }

  function handleTypologyChange(event: number) {
    // eslint-disable-next-line no-console
    console.log('event', event)
    setTypology(event === 1 ? `${event} pièce` : `${event} pièces`)
  }

  function handleExposureChange(event: string) {
    if (exposure[0] === '') setExposure([event])
    else if (!exposure.includes(event)) setExposure([...exposure, event])
    else {
      exposure.splice(exposure.indexOf(event), 1)
      setExposure([...exposure])
    }
  }

  const onSubmit = () => {
    upsertSetup()
    // eslint-disable-next-line no-console
    console.log('clicked', Number(typology[0]))
  }

  // const typologyArr = projectResponse?.data?.project?.properties?.typologies?.map(
  //   (typo: number) => {
  //     return (<option value=`${typo} ${typo === 1 ? 'pièce' : 'pièces'}` >)
  //   }
  // )

  // const exposureArr = projectResponse?.data?.project?.properties?.exposures?.map(
  //   (exposure: string) => exposure
  // )

  // eslint-disable-next-line no-console
  // console.log('exposureArr', exposureArr)
  return (
    <SetupContainer>
      <Title type="header">{projectResponse?.data?.project?.name}</Title>
      <br />
      <form onSubmit={onSubmit}>
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
            <Select
              className="select-input"
              options={projectResponse.data?.project?.properties?.typologies?.map(
                (typo: any) => {
                  return {
                    label: `${typo} ${typo === 1 ? 'pièce' : 'pièces'}`,
                    value: typo,
                  }
                }
              )}
              small={true}
              placeholder={typology ? typology : 'Typologie'}
              elementRight={<Icon icon="house-building-outline"></Icon>}
              value={typology}
              onChange={handleTypologyChange}
            />
            {/* <div>
                  <TextInput
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
                          value={
                            typo === 1 ? `${typo} pièce` : `${typo} pièces`
                          }
                        ></option>
                      )
                    )}
                  </datalist>
                </div> */}

            <Select
              className="select-input"
              options={projectResponse?.data?.project?.properties?.exposures?.map(
                (expo: string) => {
                  return {
                    label: expo,
                    value: expo,
                  }
                }
              )}
              small={true}
              placeholder={
                exposure[0] && exposure[0] !== ''
                  ? exposure.join(', ')
                  : 'Exposition'
              }
              elementRight={<Icon icon="compass-outline"></Icon>}
              value={exposure}
              onChange={handleExposureChange}
            />
            {/* <TextInput
                  small={true}
                  placeholder="Exposition"
                  elementRight={<Icon icon="compass-outline"></Icon>}
                  value={exposure}
                  list="exposures"
                  onChange={handleExposureChange}
                  multiple={true}
                />
                <datalist id="exposures">
                  {projectResponse?.data?.project?.properties?.exposures?.map(
                    (expo: string, index: number) => (
                      <option key={index} value={expo}></option>
                    )
                  )}
                </datalist> */}
          </div>
          <Button onClick={onSubmit}>Valider</Button>
        </Card>
      </form>
    </SetupContainer>
  )
}

export default Setup
