import React from 'react'
import styled from 'styled-components'
import ResourceViewChart from '../components/ResourceViewChart'
import ResourceViewSummary from '../components/ResourceViewSummary'

const ResourceViewWrapper  = styled.div`
    display: flex;
    flex-direction: column;
`
const ResourceView = () => {
  return (
    <ResourceViewWrapper>
      <ResourceViewChart/>
      <ResourceViewSummary/>

    </ResourceViewWrapper>
  )
}

export default ResourceView