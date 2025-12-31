import styled from 'styled-components'
import * as globalStyles from '../../../styles/global'

export const SCTabs = styled.div`
  padding: 0 50px;
`

export const SCTab = styled.span`
  font-size: 1.4rem;
  font-weight: 500;
  margin-right: 40px;
  color: ${globalStyles.secondaryColor};
  // border-bottom: 1px solid ${globalStyles.mainColor};
  cursor: pointer;
  : hover {
    color: ${globalStyles.mainColor};
    opacity: 0.7;
    font-weight: 600;
  }
`
