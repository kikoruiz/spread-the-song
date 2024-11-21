'use client'

import {useContext} from 'react'
import TransitionContext, {
  type Animation,
  type TransitionContext as TransitionContextInterface
} from '@/app/contexts/transition-context'

const ANIMATION_DURATION = 300

function getOutAnimation(animation: Animation) {
  return animation === 'slide-left' ? 'animate-slide-left-out' : 'animate-slide-right-out'
}

function getInAnimation(animation: Animation) {
  return animation === 'slide-left' ? 'animate-slide-left-in' : 'animate-slide-right-in'
}

function animate(animation: Animation, context: TransitionContextInterface) {
  return new Promise(resolve => {
    const className = getOutAnimation(animation)

    context.setClassName(className)
    context.animation.current = animation

    setTimeout(resolve, ANIMATION_DURATION)
  })
}

export default function useTransitions() {
  const transitionContext = useContext(TransitionContext)

  if (!transitionContext) {
    throw new Error('You are attempting to use useTransitions outside of a TransitionContext.')
  }

  const context = transitionContext

  function slideLeft() {
    return animate('slide-left', context)
  }

  function slideRight() {
    return animate('slide-right', context)
  }

  function slideIntoViewport() {
    if (context.animation.current) {
      const animation = getInAnimation(context.animation.current)

      context.setClassName(animation)
    }
  }

  return {slideLeft, slideRight, slideIntoViewport}
}
