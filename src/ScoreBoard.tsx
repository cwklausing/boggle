import React from 'react'
import './ScoreBoard.css'

interface IProps {
  words: string[]
}

const ScoreBoard = ({words}: IProps) => {
  const scoreKey: {[x: number]: number} = {
    3: 1,
    4: 1,
    5: 2,
    6: 3,
    7: 5,
    8: 11,
  }
  
  return (
    <table className="scoreboard">
      <thead>
        <tr className="table-headers">
          <th>Word</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
        {words.map((word) => (
          <tr>
            <td>{word}</td>
            <td>{scoreKey[word.length] !== undefined ? scoreKey[word.length] : 11}</td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td className="total">Total</td>
          <td>{words.reduce((acc, curr) => acc + curr.length, 0)}</td>
        </tr>
      </tfoot>
    </table>
  )
}

export default ScoreBoard