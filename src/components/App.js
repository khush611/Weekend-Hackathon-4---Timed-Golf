import React, { Component, useState } from "react";
import "../styles/App.css";
class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { on: false, time: 0, x: 0, y: 0 };
    this.sid = React.createRef();
    this.startTimer = this.startTimer.bind(this);
    this.arrowKeyHandler = this.arrowKeyHandler.bind(this);
  }
  startTimer() {
    this.setState({ on: true });

    this.sid.current = setInterval(
      () =>
        this.setState((prevState) => {
          return {
            time: prevState.time + 1
          };
        }),
      1000
    );

    document.addEventListener("keydown", this.arrowKeyHandler);
  }
  arrowKeyHandler(event) {
    const key = event.keyCode;
    let curX = this.state.x;
    let curY = this.state.y;
    if (key === 39) {
      curX += 5;
      this.setState({ x: curX });
    } else if (key === 37) {
      curX -= 5;
      this.setState({ x: curX });
    } else if (key === 38) {
      curY -= 5;
      this.setState({ y: curY });
    } else if (key === 40) {
      curY += 5;
      this.setState({ y: curY });
    }
  }
  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    console.log("x " + this.state.x);
    console.log("y " + this.state.y);
    console.log(this.state.time);
    if (this.state.x === 250 && this.state.y === 250) {
      clearInterval(this.sid.current);
      document.removeEventListener("keydown", this.arrowKeyHandler); //this
    }
    return (
      <>
        <div id="wrapper">
          <button className="start" onClick={this.startTimer}>
            Start
          </button>
        </div>
        <div
          className="ball"
          style={{ left: this.state.x, top: this.state.y }}
        ></div>
        <div className="hole"></div>
      </>
    );
  }
}

export default Timer;
