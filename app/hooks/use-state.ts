'use-client'

import {useContext} from 'react'
import StateContext from '../contexts/state-context'

export default function useState() {
  return useContext(StateContext)
}
