import { useEffect, useState } from 'react'
import { useUserData } from '../../../../context'
import {
  VFFloatingTabWrapper,
  VFFloatingTabButton,
  VFFloatingTabButtonActiveShadow,
  tabTextColorVar,
  shadowLeftVar,
  shadowWidthVar,
  shadowBgVar,
} from './styles.css'
import * as globalStyles from '../../../../styles/global'
import { assignInlineVars } from '@vanilla-extract/dynamic'

export interface VFFloatingTabItemProps{
    label:string
    value:string
    id: string
}

export interface VFFloatingTabProps {
  tabs: Array<VFFloatingTabItemProps>
  defaultTab?: number
  handleClick?: (i: any) => void
  selectedTabId?: string 
}

interface ActiveShadowDataType {
  width: number | string | undefined
  left: number | string | undefined
}

const VFFloatingTab = (props: VFFloatingTabProps) => {
  const { tabs, defaultTab = 0, handleClick, selectedTabId } = props
  const { user } = useUserData()
  const themeUi = user?.user?.theme_ui ?? 'DEFAULT'

  const [activeIndex, setActiveIndex] = useState<number>(defaultTab)
  const [activeShadowData, setActiveShadowData] =
    useState<ActiveShadowDataType | null>(null)
  
  useEffect(() => {
    const el = document.getElementById(tabs[defaultTab].id)
    setActiveShadowData({
      left: el?.offsetLeft,
      width: el?.offsetWidth,
    })
  }, [])
  
  useEffect(() => {
    const currentIdx = selectedTabId
      ? tabs.findIndex((t) => t.id === selectedTabId)
      : activeIndex
    const safeIdx = currentIdx === -1 ? 0 : currentIdx
    const el = document.getElementById(tabs[safeIdx].id)
    if (el) {
      setActiveShadowData({
        left: el.offsetLeft,
        width: el.offsetWidth,
      })
      setActiveIndex(safeIdx)
    }
  }, [tabs])

   useEffect(() => {
    if (selectedTabId) {
      const idx = tabs.findIndex((t) => t.id === selectedTabId)
      if (idx !== -1 && idx !== activeIndex) {
        const el = document.getElementById(tabs[idx].id)
        if (el) {
          setActiveShadowData({
            left: el.offsetLeft,
            width: el.offsetWidth,
          })
          setActiveIndex(idx)
        }
      }
    }
  }, [selectedTabId])

  const onClick = (e: any, index: number) => {
    setActiveShadowData({
      left: e.currentTarget.offsetLeft,
      width: e.currentTarget.offsetWidth,
    })
    setActiveIndex(index)
    if (handleClick) handleClick(tabs[index])
  }

  // theme button background (same logic as before)
  const activeBg = globalStyles.chooseThemeColor[themeUi].colorButton

  return (
    <div className={VFFloatingTabWrapper}>
      {tabs.map((t: VFFloatingTabItemProps, index: number) => (
        <button
          id={t.id}
          key={t.id}
          type="button"
          className={VFFloatingTabButton}
          onClick={(e) => onClick(e, index)}
          data-testid="floatingTabButton"
          style={assignInlineVars({
            [tabTextColorVar]: index === activeIndex ? 'white' : '#2E2E2E',
          })}
          aria-pressed={index === activeIndex}
        >
          {t.label}
        </button>
      ))}

      {activeShadowData && (
        <div
          className={VFFloatingTabButtonActiveShadow}
          style={assignInlineVars({
            [shadowBgVar]: activeBg,
            [shadowLeftVar]:
              typeof activeShadowData.left === 'number'
                ? `${activeShadowData.left}px`
                : `${activeShadowData.left || 0}`,
            [shadowWidthVar]:
              typeof activeShadowData.width === 'number'
                ? `${activeShadowData.width}px`
                : `${activeShadowData.width || 0}`,
          })}
          aria-hidden
        />
      )}
    </div>
  )
}

export default VFFloatingTab
