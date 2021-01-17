import { startOfToday, getDaysInMonth, toDate, format } from "date-fns";
import React from "react";
import "./Calendar.css";

//TODO:
// colors property connected to settings   
type props = {}
type state = {selectedDay: number, selectedMonth: number, selectedYear: number, weeks: Array<Array<undefined | number>> }

class Calendar extends  React.Component<props,state> {
  state: state = {selectedDay: 1, selectedMonth: 0, selectedYear: 2020, weeks: []}
  dow : string[] = ["Sunday", "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
  months : string[] = ["January","February","March","April","May", "June", "July","August","September","October","November","December"]
  //change selectedDay if selectedDay > 28 check various stuff
  //OR on change of these states change selectedDay to 1
  componentDidMount(){
    let today = startOfToday()
    let [month,day,year] = format(today,"L d yyyy").split(" ")
    this.setState({selectedMonth: +month - 1, selectedDay: +day, selectedYear: +year })
    this.populateWeeks(+year, +month - 1)
  }
  getSnapshotBeforeUpdate(_prevProps: props, prevState: state) {
    if(prevState.selectedYear !== this.state.selectedYear || prevState.selectedMonth !== this.state.selectedMonth){
      this.populateWeeks(this.state.selectedYear, this.state.selectedMonth)
    }
  }
  populateWeeks(year: number, month: number) {
    let date = toDate(new Date(year, month, 1))
    let daysInMonth = getDaysInMonth(date)
    let idxToAdd = date.getDay()
    let weeksArray : Array<Array<any>> = []
    let dowArray : Array<undefined | number> = []
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
    this.setState({
      selectedMonth: this.state.selectedMonth < 11 ? this.state.selectedMonth + 1 : 0, 
      selectedYear: this.state.selectedMonth < 11 ? this.state.selectedYear : this.state.selectedYear + 1 
    })
  }
  decrement() {
    this.setState({
      selectedMonth: this.state.selectedMonth === 0 ? 11 : this.state.selectedMonth - 1, 
      selectedYear: this.state.selectedMonth === 0 ? this.state.selectedYear - 1 : this.state.selectedYear
    })
  }
  setSelectedDay(day: number | undefined) {
    day && day !== this.state.selectedDay && this.setState({selectedDay: day})
  }

  render(){
    const calendarClass: string = this.state.weeks.length === 6 ? "long" : ""
    
    return (
      <div id="calendar" className={calendarClass}>
        {/* "invisible[^overflow-y: hidden???]" sliding down "modal" onClick day element */}
        <div className="header red">
          <div className="chevrons" onClick={() => this.decrement()}>
            <img src="./images/left_arrow.svg" alt="<"/>
          </div>
          <div>
            <div>{this.months[this.state.selectedMonth]}</div>
            <div>{this.state.selectedYear}</div>
          </div>
          <div className="chevrons" onClick={() => this.increment()}>
            <img src="./images/right_arrow.svg" alt=">"/>
          </div>
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
                      <div 
                        className={`day ${idx} ${!day? "gray" : ""} ${day && day === this.state.selectedDay ? "selected" : ""}`} 
                        onClick={() => this.setSelectedDay(day)}
                      >
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