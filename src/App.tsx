import React from 'react';
import './App.css';
import Notes from  './Notes';
import Calculator from './Calculator';
import Calendar from './Calendar';

type props = {}
type state = {selectedFeature: number}

class App extends  React.Component<props,state> {
  state: state = {selectedFeature: 0}
  render(){
    const features = ["notes", "calculator", "calendar"]
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
          {
            features.map((f, idx) => {
              return (
                <div onClick={() => this.setState({selectedFeature: idx })}>
                  <img className="icons" src={`./images/${f}.svg`} alt={f}/>
                </div>
              )
            })
          }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
