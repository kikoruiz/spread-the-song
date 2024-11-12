'use client'

import {useState, useRef, type PropsWithChildren} from 'react'
import {cx} from 'class-variance-authority'
import TransitionContext, {type Animation} from '@/app/contexts/transition-context'
import Navigation from './navigation'
import Logo from '@/assets/brand/logo-full.svg'

export default function TransitionProvider({
  children,
  className: containerClassName
}: PropsWithChildren<{
  className: string
}>) {
  const animation = useRef<Animation>('slide-left')
  const [className, setClassName] = useState('')

  return (
    <TransitionContext.Provider
      value={{
        animation,
        className,
        setClassName
      }}
    >
      <header className="sticky top-0 z-20 flex flex-col gap-12 justify-center items-center w-full p-12 backdrop-blur bg-transparent">
        <Logo className="w-60" />

        <Navigation />
      </header>

      <main className={cx(className, containerClassName)}>{children}</main>

      <footer className="flex justify-center p-12 font-bold">Spread the Song © 2024</footer>
    </TransitionContext.Provider>
  )
}
