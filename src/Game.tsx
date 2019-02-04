import React, { Component, Fragment } from 'react'
import axios from 'axios'
import Die, { IDie } from './Die'
import Board from './Board'
import Loader from './Loader'
import './Game.css'
import ScoreBoard from './ScoreBoard';
import { 
  dieIsAdjacent,
  letterArrayToAJAXParam,
  dieArrayToUpperStr 
} from './utility'

const BOGGLE_SOLVE_URL = 'https://codebox-boggle-v1.p.mashape.com/'

interface IProps {
  dice: string[][]
}

interface IState {
  selectedDice: IDie[]
  isError: boolean
  isLoading: boolean
  solvedList: any
  playerList: string[]
  toast: {
    show: boolean
    message: string
  }
  timer: number
}

class Game extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      selectedDice: [],
      isError: false,
      isLoading: true,
      solvedList: undefined,
      playerList: [],
      toast: {
        show: false,
        message: '',
      },
      timer: 120,
    }
  }

  componentDidMount = () => {
    const letterString = letterArrayToAJAXParam(this.props.dice)
    const options = {
      method: 'GET',
      url: `${BOGGLE_SOLVE_URL}${letterString}`,
      headers: { 
        'X-Mashape-Key': process.env.REACT_APP_API_KEY,
        'Accept': 'text/plain'
      }
    }

    axios(options)
      .then((res) => {
        this.setState({
          isLoading: false,
          isError: false,
          solvedList: res.data,
        })
      })
      .catch((err) => {
        this.setState({
          isLoading: false,
          isError: true
        })
        console.log(err)
      })
  }

  dieClickHandler = (clickedDie: IDie) => {
    const { selectedDice } = this.state;

    // if the die is already present in selectedDice...
    if (selectedDice.map(((die) => die.key)).includes(clickedDie.key)) {
      // check if die is most recently selected--if so, deselect
      if (selectedDice[selectedDice.length - 1].key === clickedDie.key) {
        this.setState((prevState) => ({
          selectedDice: prevState.selectedDice.slice(0, -1),
        }))
      }
      // othewise don't allow it to be clicked
      return false
    // if the array is empty, letter is always valid
    } else if (selectedDice.length === 0) {
      this.setState({ selectedDice: [clickedDie] })
    } else {
      let lastDie = selectedDice[selectedDice.length - 1]
      if (dieIsAdjacent(clickedDie, lastDie)) {
        this.setState({ selectedDice: [...selectedDice, clickedDie]})
      } else {
        return false
      }
    }
    return false
  }

  clearLetters = () => {
    this.setState({
      selectedDice: []
    })
  }

  handleAddWord = () => {
    const addedWord = dieArrayToUpperStr(this.state.selectedDice)
    const isUnique = !this.state.playerList.includes(addedWord)
    const isValid = this.state.solvedList.includes(addedWord)

    if (addedWord.length < 3) {
      this.alertToast("Only words 3 letters or longer allowed")
    } else if (!isUnique) {
      this.alertToast("This word has already been added!")
    } else if (!isValid) {
      this.alertToast("Sorry, invalid word")
    } else {      
      this.setState({
        playerList: [...this.state.playerList, addedWord]
      })
    }
    this.clearLetters()
  }

  alertToast = (message: string) => {
    // show toast
    this.setState({
      toast: { show: true, message: message }
    })
    // then hide toast after 2000ms
    setTimeout(() => {
      this.setState({
      toast: { show: false, message: message,
      }})
    }, 2000)
  }

  render() {
    const { isLoading } = this.state
    return (
      <Fragment>
        <div className={`toast ${this.state.toast.show ? 'active' : ''}`}>{this.state.toast.message}</div>
        { isLoading && <Loader /> }
        { !isLoading && this.state.isError && (
          <p>Whoops! Something went wrong. Check console for details.</p>
        )}
        { !this.state.isError && !isLoading && (
          <div className="game-wrap">
            <div className="board-wrap">
              <Board
                dice={this.props.dice}
                dieClickHandler={this.dieClickHandler}
                selectedDice={this.state.selectedDice} 
              />
              <div className="buttons">
                <button className="button add-word" onClick={this.handleAddWord}>Add Word</button>
                <button className="button" onClick={this.clearLetters}>Clear Letters</button>
              </div>
            </div>
            <ScoreBoard words={this.state.playerList} />
          </div>
        )}
      </Fragment>
    )
  }
}

export default Game