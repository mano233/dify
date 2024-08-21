import React, { useEffect } from 'react'
import { useShallow } from 'zustand/react/shallow'
import NavLink from './navLink'
import type { NavIcon } from './navLink'
import AppBasic from './basic'
import useBreakpoints, { MediaType } from '@/hooks/use-breakpoints'
import { useStore as useAppStore } from '@/app/components/app/store'

export type IAppDetailNavProps = {
  iconType?: 'app' | 'dataset' | 'notion'
  title: string
  desc: string
  icon: string
  icon_background: string
  navigation: Array<{
    name: string
    href: string
    icon: NavIcon
    selectedIcon: NavIcon
  }>
  extraInfo?: (modeState: string) => React.ReactNode
}

const AppDetailNav = ({ title, desc, icon, icon_background, navigation, extraInfo, iconType = 'app' }: IAppDetailNavProps) => {
  const { appSidebarExpand, setAppSiderbarExpand } = useAppStore(useShallow(state => ({
    appSidebarExpand: state.appSidebarExpand,
    setAppSiderbarExpand: state.setAppSiderbarExpand,
  })))
  const media = useBreakpoints()
  const isMobile = media === MediaType.mobile
  const expand = appSidebarExpand === 'expand'

  const handleToggle = (state: string) => {
    setAppSiderbarExpand(state === 'expand' ? 'collapse' : 'expand')
  }

  useEffect(() => {
    if (appSidebarExpand) {
      localStorage.setItem('app-detail-collapse-or-expand', appSidebarExpand)
      setAppSiderbarExpand(appSidebarExpand)
    }
  }, [appSidebarExpand, setAppSiderbarExpand])

  return (
    <div
      className={`
        shrink-0 flex flex-col bg-background-default-subtle border-r border-divider-burn transition-all
        ${expand ? 'w-[216px]' : 'w-14'}
      `}
    >
      <div
        className={`
          shrink-0
          ${expand ? 'p-3' : 'p-2'}
        `}
      >
        {iconType !== 'app' && (
          <AppBasic
            mode={appSidebarExpand}
            iconType={iconType}
            icon={icon}
            icon_background={icon_background}
            name={title}
            type={desc}
          />
        )}
      </div>
      {!expand && (
        <div className='mt-1 mx-auto w-6 h-[1px] bg-divider-subtle' />
      )}
      <nav
        className={`
          grow space-y-1
          ${expand ? 'p-4' : 'px-2.5 py-4'}
        `}
      >
        {navigation.map((item, index) => {
          return (
            <NavLink key={index} mode={appSidebarExpand} iconMap={{ selected: item.selectedIcon, normal: item.icon }} name={item.name} href={item.href} />
          )
        })}
        {extraInfo && extraInfo(appSidebarExpand)}
      </nav>

    </div>
  )
}

export default React.memo(AppDetailNav)
