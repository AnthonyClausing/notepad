
import React from 'react';
import './Notes.css';

type props = {};
type state = {text: string}
class Notes extends React.Component<props,state> {
  state: state = {
    text: ""
  }

  saveNotes(evt: any){
    if(evt){
      evt.preventDefault()
      chrome.storage.sync.set({"notes": evt && evt.target.value})
    }
  }

  componentWillMount(){
    chrome.storage.sync.get(["notes"], (result) => this.setState({text: result["notes"]}))
  }

  render(){
    return (
      <textarea className="notes" onChange={this.saveNotes} value={this.state.text}></textarea>
    );
  }
  
}

export default Notes;