import React, { Fragment } from 'react'
import Die, { IDie } from './Die'
import './Board.css'

interface IProps {
  dice: string[][]
  dieClickHandler: (die: IDie) => void
  selectedDice: IDie[]
}

const Board = ({dice, dieClickHandler, selectedDice}: IProps) => {
  const selectedDiceKeys = selectedDice.map(((die) => die.key))

  return (
    <div className="board">
      {dice.map(((rowArray, rowIndex) => {
        return rowArray.map((letter, columnIndex) => {
          const dieObj: IDie = {
            key: `${rowIndex}-${columnIndex}`,
            row: rowIndex,
            column: columnIndex,
            letter: letter
          }
          const isSelected = selectedDiceKeys.includes(dieObj.key)
          
          return (
            <Die 
              die={dieObj}
              key={dieObj.key}
              clickHandler={dieClickHandler}
              className={isSelected ? 'active' : ''}
            />
          )
        })
      }))}
    </div>
  )
}

export default Board