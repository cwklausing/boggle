import React, { Component } from 'react';
import Board from './Board'

const dice = [
  ['A', 'A', 'E', 'E', 'G', 'N'],
  ['E', 'L', 'R', 'T', 'T', 'Y'],
  ['A', 'O', 'O', 'T', 'T', 'W'],
  ['A', 'B', 'B', 'J', 'O', 'O'],
  ['E', 'H', 'R', 'T', 'V', 'W'],
  ['C', 'I', 'M', 'O', 'T', 'U'],
  ['D', 'I', 'S', 'T', 'T', 'Y'],
  ['E', 'I', 'O', 'S', 'S', 'T'],
  ['D', 'E', 'L', 'R', 'V', 'Y'],
  ['A', 'C', 'H', 'O', 'P', 'S'],
  ['H', 'I', 'M', 'N', 'Qu', 'U'],
  ['E', 'E', 'I', 'N', 'S', 'U'],
  ['E', 'E', 'G', 'H', 'N', 'W'],
  ['A', 'F', 'F', 'K', 'P', 'S'],
  ['H', 'L', 'N', 'N', 'R', 'Z'],
  ['D', 'E', 'I', 'L', 'R', 'X'],
];

class App extends Component {
  generateBoard = (dice: string[][]) => {
    const shuffledArray = this.shuffleArray(dice).map((dieArray) => {
      const randomDiceRoll = Math.floor(Math.random() * 5)
      return dieArray[randomDiceRoll]
    })
    
    return this.formatBoard(shuffledArray)
  }
  
  formatBoard = (array: any[]) => {
    const oldArray = [...array]
    let arraySquare = Math.sqrt(array.length)
    // formats the array into a square matrix
    let formattedArray: string[][] = []
    for (let i = 0; i < arraySquare; i++) {
      formattedArray.push([...oldArray.splice(0, arraySquare)])
    }

    return formattedArray;
  }

  shuffleArray = (array: string[][]) => {
    let newArray = [ ...array]

    // shuffles the array
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }

  isSquareArray = (array: any[]) => {
    return Number.isInteger(Math.sqrt(array.length))
  }

  render() {
    return (
      <div className="App">
        {this.isSquareArray(dice) ? (
          <Board dice={this.generateBoard(dice)} />
        ) : (
          <div>The number of dice provided is not a square number</div>
        )}
      </div>
    );
  }
}

export default App;
