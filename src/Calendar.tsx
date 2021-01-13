import { number } from 'prop-types';
import { startOfToday, format } from 'date-fns';
import React from 'react';
import './Calendar.css';

//TODO:
// colors property connected to settings   
type props = {}
type state = {selectedMonth: string, selectedDay: string, selectedYear: string}

class Calendar extends  React.Component<props,state> {
  state: state = {selectedMonth: '', selectedDay: '', selectedYear: ''}
  dow : string[] = ['Sunday', 'Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
  months : string[] = ['January','February','March','April','May', 'June', 'July','August','September','October','November','December']
  
  componentDidMount(){
    let [month,day,year] = format(startOfToday(),'MMMM d yyyy').split(' ')
    this.setState({selectedMonth: month, selectedDay: day, selectedYear: year })
  }

  render(){
    return (
      <div id="calendar">
        {/* "invisible[^overflow-y: hidden???]" sliding down "modal" onClick day element */}
        <div className="header red">
          <div className="chevrons">|----</div>
          <div>
            <div>{this.state.selectedMonth}</div>
            <div>{this.state.selectedYear}</div>
          </div>
          <div className="chevrons">----|</div>
        </div>
        <div className="week">
          <div className="day 0"><div></div></div>
          <div className="day 1"></div>
          <div className="day 2"></div>
          <div className="day 3"></div>
          <div className="day 4"></div>
          <div className="day 5"></div>
          <div className="day 6"></div>
        </div>
        <div className="week">
          <div className="day 0"><div></div></div>
          <div className="day 1"></div>
          <div className="day 2"></div>
          <div className="day 3"></div>
          <div className="day 4"></div>
          <div className="day 5"></div>
          <div className="day 6"></div>
        </div>
        <div className="week">
          <div className="day 0"><div></div></div>
          <div className="day 1"></div>
          <div className="day 2"></div>
          <div className="day 3"></div>
          <div className="day 4"></div>
          <div className="day 5"></div>
          <div className="day 6"></div>
        </div>
        <div className="week">
          <div className="day 0"><div></div></div>
          <div className="day 1"></div>
          <div className="day 2"></div>
          <div className="day 3"></div>
          <div className="day 4"></div>
          <div className="day 5"></div>
          <div className="day 6"></div>
        </div>
        <div className="week">
          <div className="day 0"><div></div></div>
          <div className="day 1"></div>
          <div className="day 2"></div>
          <div className="day 3"></div>
          <div className="day 4"></div>
          <div className="day 5"></div>
          <div className="day 6"></div>
        </div>
      </div>
    );
  }
}

export default Calendar;