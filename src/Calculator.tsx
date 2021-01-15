import { number } from 'prop-types';
import React from 'react';
import './Calculator.css';

type props = {};
type state = {currentOperand: string, previousOperand: string, currentOperation: string, displayNumber: string}

class Calculator extends  React.Component<props,state> {
  state: state = {
    currentOperand: '',
    previousOperand: '',
    currentOperation: '',
    displayNumber: ''
  }
  componentDidMount() {
    window.addEventListener("keydown", this.keyInput)
  }
  componentWillUnmount() {
    window.removeEventListener("keydown", this.keyInput)
  }
  setOperand(digit: string) {
    let isDecimal :boolean = digit === '.'
    let isZero :boolean = digit === '0'
    if(!this.state.currentOperand && this.state.displayNumber){
      if(!isDecimal){
        this.setState({previousOperand: this.state.displayNumber, currentOperand: digit, displayNumber: digit})
      }
      return
    }
    if(isDecimal && (this.state.currentOperand.includes('.') || !this.state.currentOperand)) {
      return
    }
    if(isZero && this.state.currentOperand === '0'){
      return 
    }
    this.setState({currentOperand: this.state.currentOperand + digit, displayNumber: this.state.currentOperand + digit})
    this.forceUpdate()
  }
  keyInput(evt : any){
    let operators = ['/','*','-','+']
    let operations = ['divide', 'multiply', 'subtract', 'add']
    let operation = operations[operators.indexOf(evt.key)]
    let isNum = /^\d+$/.test(evt.key)
    let isEquals = evt.key === 'Enter' || evt.key === '='
    if(isNum) {
      this.setOperand(evt.key)
    } else if(isEquals) {
      this.resolve()
    } else if(operation) {
      // if(this.state.currentOperation){ this[operation].call() }
    }
  }  
  setOperation(operation:string) {
    if(!this.state.currentOperation){
      this.setState({previousOperand: this.state.currentOperand ? this.state.currentOperand : this.state.displayNumber, currentOperand: ''})
    }
    if(this.state.previousOperand && this.state.currentOperand && this.state.currentOperation !== operation) {
      this.resolve()
    }
    this.setState({currentOperation: operation })
  }
  multiply(){
    this.setOperation('multiply')
  }
  subtract(){
    this.setOperation('subtract')
  }
  divide(){
    this.setOperation('divide')
  }
  add(){
    this.setOperation('add')
  }
  resolve(){
    let solution : number;
    let prev: number = Number(this.state.previousOperand)
    let curr: number = Number(this.state.currentOperand)
    switch(this.state.currentOperation) {
      case 'add':
        solution = prev + curr
        break;      
      case 'subtract':
        solution = prev - curr
        break;
      case 'multiply':
        solution = prev * curr
        break;
      case 'divide':
        solution = prev / curr
        break;
      default:
        solution = 0
        break;
    }
    if(this.state.currentOperation && this.state.currentOperand && this.state.previousOperand) {
      this.setState({currentOperand: '', previousOperand: '', currentOperation: '', displayNumber: `${solution}`})
    }
  }
  squareRoot() {
    this.setOperand(`${Math.sqrt(+this.state.currentOperand)}`)
  }
  clear() {
    this.setState({currentOperand: '', previousOperand: '', currentOperation: '', displayNumber: ''})
  }
  checkWindow() {
    return ''
  }

  render(){
    return (
      <div id="calculator" onKeyDown={(event) => this.keyInput(event)}>
        <div id="result" onClick={() => this.checkWindow()}>
          <div>{this.state.displayNumber}</div>
        </div>
        <div id="controls">
          <div>
            <div id="extra-operators">
              <div className="btn" onClick={() => this.clear()}><span>C</span></div>
              <div className="btn" onClick={() => this.squareRoot()}><span>√</span></div>
            </div>
            <div id="numbers"> 
              <div>
                <div className="btn" onClick={() => this.setOperand("7")}><span>7</span></div>
                <div className="btn" onClick={() => this.setOperand("8")}><span>8</span></div>
                <div className="btn" onClick={() => this.setOperand("9")}><span>9</span></div>
              </div>
              <div>
                <div className="btn" onClick={() => this.setOperand("4")}><span>4</span></div>
                <div className="btn" onClick={() => this.setOperand("5")}><span>5</span></div>
                <div className="btn" onClick={() => this.setOperand("6")}><span>6</span></div>
              </div>
              <div>
                <div className="btn" onClick={() => this.setOperand("1")}><span>1</span></div>
                <div className="btn" onClick={() => this.setOperand("2")}><span>2</span></div>
                <div className="btn" onClick={() => this.setOperand("3")}><span>3</span></div>
              </div>
              <div>
                <div className="btn" onClick={() => this.setOperand("0")}><span>0</span></div>
                <div className="btn" onClick={() => this.setOperand('.')}><span>.</span></div>
                <div className="btn" onClick={() => this.resolve()}><span>=</span></div>
              </div>  
            </div>
          </div>
          <div>
            <div id="basic-operators">
              <div>
                <div onClick={() => this.divide()}><span>/</span></div>
                <div onClick={() => this.multiply()}><span>*</span></div>
                <div onClick={() => this.subtract()}><span>-</span></div>
              </div >
              <div>
                <div onClick={() => this.add()}><span>+</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Calculator;