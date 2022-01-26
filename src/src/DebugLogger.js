import React from 'react';

export class DebugLogger extends React.Component {

  constructor(props) {
    super(props)
    console.log(props)
    this.__registerConsoleLogListener()
    this.state = {
      elementID: props?.elementID ? props?.elementID :  "debug-logger",
      enabled: props?.enabled != undefined ? props?.enabled : true, 
      logData: [],
      listStyle : props?.listStyle ? props?.listStyle : {
        backgroundColor: 'black',
        color: 'green',
        listStyleType: 'none', /* Remove bullets */
        padding: 0, /* Remove padding */
        margin: 0 /* Remove margins */
      }
    }
    this.timeStamps = props?.timeStamps != undefined ? props.timeStamps : true
  }

  static DateInfo(){
    return new Date().toISOString();
  }

  enable(){
    this.setState(
      {
        enabled: true
      }
    )
  }

  disable(){
    this.setState(
      {
        enabled: false
      }
    )
  }

  addToLogData(data){
    if(this.timeStamps) {
      data = `[${DebugLogger.DateInfo()}]: ${data}`
    }
    let nLogData = this.state.logData
    nLogData.push(data)
    this.setState(
      {
        logData: nLogData
      }
    )
    this.render()
  }


  __renderLogData(){
    let renderLogs = this.state.logData.map((data) =>
      <li>{data}</li>
    );

    return (
    <ul style={this.state.listStyle}>
      {renderLogs}
    </ul>
    )
  }

  __registerConsoleLogListener(){

    var self = this

    var originallog = console.log;

    console.log = function(txt) {
        self.addToLogData(txt)

        originallog.apply(console, arguments);
    }

  }

  render(){
    if(this.state.enabled) {
      return (
        <div id={this.state.elementID}>
         <h1>Debug Logger:</h1>
         {this.__renderLogData()}
        </div>
      );
    } else {
      return ("")
    }
  }


}

export default DebugLogger;