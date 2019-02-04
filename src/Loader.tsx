import React from 'react'
import Die from './Die'
import './Loader.css'

const Loader = () => (
  <div className="loader-wrap">
    <div className="loader">
      <Die die={{letter: 'L', key: '', column: 0, row: 0}}/>
      <Die die={{letter: 'O', key: '', column: 0, row: 0}}/>
      <Die die={{letter: 'A', key: '', column: 0, row: 0}}/>
      <Die die={{letter: 'D', key: '', column: 0, row: 0}}/>
    </div>
  </div>
)

export default Loader