import React, { Component, Fragment } from 'react'

const msToTime = (duration) => {
  var milliseconds = parseInt((duration % 1000) / 100),
    seconds = parseInt((duration / 1000) % 60),
    minutes = parseInt((duration / (1000 * 60)) % 60),
    hours = parseInt((duration / (1000 * 60 * 60)) % 24);

  hours = (hours < 10) ? "0" + hours : hours;
  minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;
  milliseconds = (milliseconds < 10) ? "0" + milliseconds : milliseconds;

  return hours + ":" + minutes + ":" + seconds + ":" + milliseconds;
}

export default class BasicIntervalometer extends Component {
  static defaultProps = {
    duration: 200,
    interval: 2000,
    onStart: () => null,
    onComplete: () => null,
  }

  state = {
    firing: false,
    countDown: 0,
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.firing === true && this.state.firing !== prevState.firing) {
      this.handleTrigger()
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timer)
  }

  handleStartIntervalometer = () => {
    this.heartbeat()
  }

  handleTrigger = () => {
    this.props.onStart()

    setTimeout(() => {
      this.setState({ firing: false })
      this.props.onComplete()
    }, this.props.duration)
  }

  heartbeat = () => {
    const pulse = 50
    const { interval } = this.props
    let countDown = this.state.countDown


    if (countDown <= 0) {
      this.setState({ firing: true })
      countDown = interval - pulse
    } else {
      countDown = countDown - pulse
    }

    this.setState({ countDown })

    this.timer = setTimeout(() => {
      this.heartbeat()
    }, pulse)
  }




  render() {
    return (
      <section>
        {this.props.children(this.handleStartIntervalometer)}

        <p>{msToTime(this.state.countDown)}</p>

        {this.state.firing &&
          <p>BANG!</p>
        }
      </section>
    )
  }
}
