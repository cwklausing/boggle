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
  clickHandler?: (die: IDie) => void
  className?: string
}

const Die = ({ die, clickHandler = () => null, className }: IProps) => (
  <div className={`die ${className}`} onClick={() => clickHandler(die)} >
    <span className="letter">
      {die.letter}
    </span>
  </div>
)

export default Die