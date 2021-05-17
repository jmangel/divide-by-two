import React, { useState } from 'react';
import {
  Input,
} from 'reactstrap';

import './App.css';

const App: React.FC = () => {
  const [numToDivide, setNumToDivide] = useState(2.0);

  const dividedNumber = (numToDivide / 2)

  const dividedNumbers: Array<string | number> = (((dividedNumber * 1000) % 10) > 0) ? [
    Math.ceil(100 * dividedNumber) / 100,
    Math.floor(100 * dividedNumber) / 100,
  ] : [
    dividedNumber
  ]

  return (
    <div className="App">
      <header className="App-header flex-row justify-content-between">
        <span className="ml-3">
          Divide By Two
        </span>
      </header>
      <Input
        type="number"
        name="numToDivide"
        value={numToDivide}
        onChange={e => setNumToDivide(parseFloat(e.target.value))}
        className='w-25 mx-2'
        inline
      />
      {
        dividedNumbers.map((dividedNumber) => (
          <p>{dividedNumber}</p>
        ))
      }
    </div>
  );
}

export default App;
