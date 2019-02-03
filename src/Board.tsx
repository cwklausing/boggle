import React, { Component } from 'react'
import Die from './Die'
import './Board.css'
import { IDie } from './Die'

interface IProps {
  dice: string[][]
}

interface IState {
  selectedDice: IDie[]
}

class Board extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      selectedDice: [],
    }
  }

  dieClickHandler = (die: IDie) => {
    const { selectedDice } = this.state;
    let lastDie;

    // if the die is already present in selectedDice, it is NEVER valid
    if ( selectedDice.map(((die) => die.key)).indexOf(die.key) !== -1 ) {
      return false
    // if the array is empty, letter is always valid
    } else if (selectedDice.length === 0) {
      this.setState({ selectedDice: [die] })
    } else {
      lastDie = selectedDice[selectedDice.length - 1]
      if (this.dieIsAdjacent(die, lastDie)) {
        this.setState({ selectedDice: [...selectedDice, die]})
      } else {
        return false
      }
    }
    return false
  }

  // TODO: make generic to any square number, not just 4x4
  dieIsAdjacent = (thisDie: IDie, lastDie: IDie) => {
    // check if they're within one row and column of each other
    if (Math.abs(lastDie.row - thisDie.row) <= 1 && Math.abs(lastDie.column - thisDie.column) <= 1) {
        console.log('true' )
        return true
      }
      console.log('false' )
    return false
  }

  render() {
    return (<div className="board">
        {this.props.dice.map(((rowArray, rowIndex) => {
          return rowArray.map((letter, columnIndex) => {
            let dieObj: IDie = {
              key: `${rowIndex}-${columnIndex}`,
              row: rowIndex,
              column: columnIndex,
              letter: letter
            }
            return <Die die={dieObj} key={dieObj.key} clickHandler={this.dieClickHandler} />
          })
        }))}
      </div>
    )
  }
}

export default Board