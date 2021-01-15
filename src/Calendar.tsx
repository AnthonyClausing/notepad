import { number } from "prop-types";
import { startOfToday, getDaysInMonth, toDate, format } from "date-fns";
import React from "react";
import "./Calendar.css";

//TODO:
// colors property connected to settings   
// additional logic for nav to next year
type props = {}
type state = {selectedMonth: string, selectedDay: string, selectedYear: string, weeks: Array<Array<undefined | number>> }

class Calendar extends  React.Component<props,state> {
  state: state = {selectedMonth: "", selectedDay: "", selectedYear: "", weeks: []}
  dow : string[] = ["Sunday", "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
  months : string[] = ["January","February","March","April","May", "June", "July","August","September","October","November","December"]
  
  componentDidMount(){
    // #calendar height: 17.5rem; grid-template-rows: .8fr .4fr repeat(6,1fr);////when 6 week month
    let today = startOfToday()
    let [month,day,year] = format(today,"MMMM d yyyy").split(" ")
    this.setState({selectedMonth: month, selectedDay: day, selectedYear: year })
  }
  componentWillUpdate(_nextProps : props, nextState : state) {
    if(nextState.selectedYear !== this.state.selectedYear || nextState.selectedMonth !== this.state.selectedMonth){
      //change selectedDay if selectedDay > 28 check various stuff
      //OR on change of these states change selectedDay to 1
      this.populateWeeks(+nextState.selectedYear, this.months.indexOf(nextState.selectedMonth))
    }
  }

  populateWeeks(year: number, month: number) {
    let date = toDate(new Date(year, month, 1))
    let daysInMonth = getDaysInMonth(date)
    let idxToAdd = date.getDay()
    let weeksArray : Array<Array<any>> = []
    let dowArray : Array<any> = []
    for(let i = 1; i <= daysInMonth;i++){
      dowArray[idxToAdd] = i
      if(i === daysInMonth) { weeksArray.push([...dowArray]) }
      if(idxToAdd === 6){
        weeksArray.push([...dowArray])
        dowArray = []
        idxToAdd = 0
      } else {
        idxToAdd++
      }
    }
    while(weeksArray[weeksArray.length - 1].length < 7) {
      weeksArray[weeksArray.length - 1].push(undefined)
    }
    this.setState({weeks: weeksArray})
  }
  increment() {
    //by month
    let idx: number = this.months.indexOf(this.state.selectedMonth)
    if(idx === 11) {
      this.setState({selectedMonth: this.months[0]})
    }else {
      this.setState({selectedMonth: this.months[idx + 1]})
    }
  }
  decrement() {
    //by month
    let idx: number = this.months.indexOf(this.state.selectedMonth)
    if(idx === 0) {
      this.setState({selectedMonth: this.months[11]})
    }else {
      this.setState({selectedMonth: this.months[idx - 1]})
    }
  }

  render(){
    const calendarClass: string = this.state.weeks.length === 6 ? "long" : ""
    
    return (
      <div id="calendar" className={calendarClass}>
        {/* "invisible[^overflow-y: hidden???]" sliding down "modal" onClick day element */}
        <div className="header red">
          <div className="chevrons" onClick={() => this.decrement()}>|----</div>
          <div>
            <div>{this.state.selectedMonth}</div>
            <div>{this.state.selectedYear}</div>
          </div>
          <div className="chevrons" onClick={() => this.increment()}>----|</div>
        </div>
        <div className="days-of-week">
          {this.dow.map(d => {
            return (<div>{d.slice(0,3)}</div>)
          })}
        </div>
        {
          this.state.weeks.map(days => {
            return(
              <div className="week">
                {
                  days.map((day, idx) => {
                    return (
                      <div className={`day ${idx} ${!day? "gray" : ""}`}>
                        <div>{day ? day : ""}</div>
                      </div>
                    )
                  })
                }
              </div>
            )
          })
        }
      </div>
    );
  }
}

export default Calendar;