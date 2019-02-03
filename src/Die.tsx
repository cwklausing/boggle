import React from 'react';
import './Die.css'

export interface IDie {
  key: string,
  row: number,
  column: number,
  letter: string,
}

interface IProps {
  die: IDie
  clickHandler: (die: IDie) => void
}

const Die = ({ die, clickHandler }: IProps) => (
  <div className="die" onClick={() => clickHandler(die)} >
    <span className="letter">
      {die.letter}
    </span>
  </div>
)

export default Die