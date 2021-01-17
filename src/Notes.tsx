
import React from 'react';
import './Notes.css';

//REFACTOR: Functional Component???
type props = {};
type state = {text: string}
class Notes extends React.Component<props,state> {
  state: state = {
    text: ""
  }
  getNotes() {
    chrome.storage.sync.get(["notes"], (result) => this.setState({text: result["notes"]}))
  }
  saveNotes(){
    chrome.storage.sync.set({"notes": this.state.text})
  }
  handleInput(evt: any){
    this.setState({text: evt.target.value})
  }
  componentWillMount(){
    this.getNotes()
  }
  componentWillUnmount(){
    this.saveNotes()
  }

  render(){
    return (
      <textarea id="notes" value={this.state.text} onInput={(evt) => this.handleInput(evt)} onChange={() => this.saveNotes()}></textarea>
    );
  } 
}

export default Notes;