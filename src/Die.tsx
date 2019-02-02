import React from 'react';
import './Die.css'

interface IProps {
  letter: string
}

const Die = ({ letter }: IProps) => (
  <div className="die">
    <span className="letter">
      {letter}
    </span>
  </div>
)

export default Die