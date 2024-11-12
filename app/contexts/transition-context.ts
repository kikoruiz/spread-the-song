import {createContext, type Dispatch, type MutableRefObject, type SetStateAction} from 'react'

export type Animation = 'slide-left' | 'slide-right'

interface TransitionContext {
  animation: MutableRefObject<Animation>
  className: string
  setClassName: Dispatch<SetStateAction<string>>
}

const TransitionContext = createContext<TransitionContext | null>(null)

export default TransitionContext
