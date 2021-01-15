import React from 'react';
import './App.css';
import Notes from  './Notes';
import Calculator from './Calculator';
import Calendar from './Calendar'
import { types } from 'util';

type props = {}
type state = {selectedFeature: number}

class App extends  React.Component<props,state> {
  state: state = {selectedFeature: 0}
  render(){
    const features = ["Notes", "Calculator", "Calendar"]
    return (
      <div className="App">
        {
          this.state.selectedFeature === 0 && <Notes/> 
        }
        {
          this.state.selectedFeature === 1 && <Calculator/>
        }
        {
          this.state.selectedFeature === 2 && <Calendar/>
        }
        <div className="inline">
          <div>
          {features.map((f, idx) => (<div onClick={() => this.setState({selectedFeature: idx })}>{f}</div>))}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
