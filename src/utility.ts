import { IDie } from './Die'

export const dieIsAdjacent = (thisDie: IDie, lastDie: IDie) => {
  // check if they're within one row and column of each other
  return (Math.abs(lastDie.row - thisDie.row) <= 1 && Math.abs(lastDie.column - thisDie.column) <= 1)
}

export const dieArrayToUpperStr = (dieArray: IDie[]) => (
  dieArray.reduce((accum, current) => `${accum}${current.letter}`, '').toUpperCase()
)

export const letterArrayToAJAXParam = (dieArray: string[][]) => (
  dieArray.reduce((rowAccum, row) => {
    return rowAccum + row.reduce((colAccum, col) => `${colAccum}${col === 'Qu' ? 'Q' : col }`)
  }, '')
)