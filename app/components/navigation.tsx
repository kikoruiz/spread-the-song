'use client'

import {useEffect, useRef, useState} from 'react'
import {useRouter, usePathname} from 'next/navigation'
import {useTranslations} from 'next-intl'
import useTransitionContext from '../hooks/use-transition'

const SECTIONS = ['search', 'convert']

export default function Navigation() {
  const t = useTranslations('sections')
  const {push} = useRouter()
  const pathname = usePathname()
  const {slideLeft, slideRight} = useTransitionContext()
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([])
  const defaultTabIndex = SECTIONS.findIndex(section => pathname.includes(section))
  const [activeTabIndex, setActiveTabIndex] = useState<number>(defaultTabIndex)
  const [tabAttributes, setTabAttributes] = useState({left: 0, width: 0, height: 0})

  useEffect(() => {
    if (activeTabIndex === null) {
      return
    }

    const setTabPosition = () => {
      const currentTab = tabsRef.current[activeTabIndex] as HTMLElement

      setTabAttributes({
        left: currentTab?.offsetLeft ?? 0,
        width: currentTab?.clientWidth ?? 0,
        height: currentTab?.clientHeight ?? 0
      })
    }

    setTabPosition()
  }, [activeTabIndex])

  async function navigate(index: typeof activeTabIndex) {
    const slide = index > activeTabIndex ? slideLeft : slideRight

    slide().then(() => push(SECTIONS[index]))
  }

  return (
    <div className="relative p-1.5 rounded-xl bg-gradient-to-t from-gray-dark-700 to-gray-dark-900 backdrop-blur-sm">
      <span
        className="absolute bottom-0 top-1/2 -translate-y-1/2 -z-10 flex transition-all duration-300 drop-shadow-md"
        style={tabAttributes}
      >
        <span className="h-full w-full rounded-md bg-gradient-to-t from-yellow-500 to-yellow-300" />
      </span>

      {SECTIONS.map((section, index) => {
        const isActive = activeTabIndex === index

        return (
          <button
            key={index}
            ref={el => {
              tabsRef.current[index] = el
            }}
            disabled={isActive}
            className={`${
              isActive ? 'text-gray-dark-900' : 'text-gray-dark-200 hover:text-gray-dark-50 drop-shadow'
            } cursor-pointer select-none transition-all py-1.5 px-6 text-lg`}
            onClick={() => {
              navigate(index)
              setActiveTabIndex(index)
            }}
          >
            {t(section)}
          </button>
        )
      })}
    </div>
  )
}
