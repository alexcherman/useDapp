import { useContext, useEffect } from 'react'
import { ChainCall } from '../providers/chainState/callsReducer'
import { ChainStateContext } from '../providers/chainState/context'
import { Falsy } from '../model/types'

export function useChainCalls(calls: ChainCall[]) {
  const { addCalls, removeCalls, value } = useContext(ChainStateContext)

  useEffect(() => {
    addCalls(calls)
    return () => removeCalls(calls)
  }, [JSON.stringify(calls), addCalls, removeCalls])

  return calls.map(({ address, data }) => {
    return value?.state?.[address]?.[data]
  })
}

export function useChainCall(call: ChainCall | Falsy) {
  const [result] = useChainCalls(call ? [call] : [])
  return result
}
