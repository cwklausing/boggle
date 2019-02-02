import React, { Component } from 'react'
import Die from './Die'
import './Board.css'

interface IProps {
  dice: string[]
}

class Board extends Component<IProps> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      selectedLetters: [],
    }
  }

  clickHandler = () => {
    
  }

  render() {
    return (<div className="board">
        {this.props.dice.map(((die, index) => {
          return <Die letter={die} key={index} />
        }))}
      </div>
    )
  }
}

export default Board