
import React from 'react';
import './Calculator.css';

class Calculator extends React.Component {
  // state: state = {
  //   value: 0
  // }
  render(){
    return (
      <div id="calculator">
        <div id="result">
        0
        </div>
        <div id="controls">
          <div>
            <div id="extra-operators">
              <div className="button">%</div>
              <div className="button">√</div>
            </div>
            <div id="numbers"> 
              <div>
                <div className="button">7</div>
                <div className="button">8</div>
                <div className="button">9</div>
              </div>
              <div>
                <div className="button">4</div>
                <div className="button">5</div>
                <div className="button">6</div>
              </div>
              <div>
                <div className="button">1</div>
                <div className="button">2</div>
                <div className="button">3</div>
              </div>
              <div>
                <div className="button">0</div>
                <div className="button">.</div>
                <div className="button">=</div>
              </div>  
            </div>
          </div>
          <div>
            <div id="basic-operators">
              <div>
                <div>/</div>
                <div>x</div>
                <div>-</div>
              </div>
              <div>
                <div>+</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
}

export default Calculator;