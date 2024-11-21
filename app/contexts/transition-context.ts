import {createContext, type Dispatch, type MutableRefObject, type SetStateAction} from 'react'

export type Animation = 'slide-left' | 'slide-right'

export interface TransitionContext {
  animation: MutableRefObject<Animation>
  className: string
  setClassName: Dispatch<SetStateAction<string>>
}

export default createContext<TransitionContext | null>(null)
