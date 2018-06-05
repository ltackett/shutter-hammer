import React, { Component } from 'react'
import moment from 'moment'

import './StartAt.scss'

const hours        = []
const minutes      = []
const seconds      = []
const milliseconds = []

let n = 0
while (n < 24) {
  hours[n] = n
  n++
}

n = 0
while (n < 60) {
  minutes[n] = n
  seconds[n] = n
  n++
}

n = 0
while (n < 1000) {
  milliseconds[n] = n
  n = n+50
}

export default class StartAt extends Component {
  state = {
    hour:        0,
    minute:      0,
    second:      0,
    millisecond: 0,
    triggerTime: moment().add(1, 'days'),
    // triggerTime: moment().add(2, 'seconds'),
  }

  componentDidMount() {
    this.setTriggerTime()
  }

  componentDidUpdate(prevProps, prevState) {
    const hourNotEqual = this.state.hour !== prevState.hour
    const minuteNotEqual = this.state.minute !== prevState.minute
    const secondNotEqual = this.state.second !== prevState.second
    const millisecondNotEqual = this.state.millisecond !== prevState.millisecond

    if (hourNotEqual || minuteNotEqual || secondNotEqual || millisecondNotEqual) {
      this.setTriggerTime()
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: parseInt(e.target.value) })
  }

  setTriggerTime = () => {
    const { hour, minute, second, millisecond } = this.state

    const currentTime = moment()
    const triggerTime = moment()
    triggerTime.hours(hour)
    triggerTime.minutes(minute)
    triggerTime.seconds(second)
    triggerTime.milliseconds(millisecond)

    if (currentTime.unix() > triggerTime.unix()) {
      triggerTime.add(1, 'days')
    }

    this.setState({ triggerTime })

    // Kick off the timer heartbeat
    if (this.timer === undefined) {
      window.requestAnimationFrame(() => {
        this.heartbeat()
      })
    }
  }

  passedTriggerTime = () => {
    const triggerTime = this.state.triggerTime.unix()
    const currentTime = moment().unix()
    return currentTime > triggerTime
  }

  heartbeat = () => {
    if (this.passedTriggerTime()) {
      clearTimeout(this.timer)
      this.timer = undefined
      this.props.onStart()
      return
    }

    this.timer = setTimeout(() => {
      this.heartbeat()
    }, 500)
  }

  render() {
    return (
      <section id="StartAt">
        <p>Start at time:</p>

        <div>
          <div>
            <span>Hour</span>
            <select name="hour" onChange={this.handleChange}>
              {hours.map(hour =>
                <option value={hour}>{hour}</option>
              )}
            </select>
          </div>

          <div>
            <span>Minute</span>
            <select name="minute" onChange={this.handleChange}>
              {minutes.map(minute =>
                <option value={minute}>{minute}</option>
              )}
            </select>
          </div>

          <div>
            <span>Second</span>
            <select name="second" onChange={this.handleChange}>
              {seconds.map(second =>
                <option value={second}>{second}</option>
              )}
            </select>
          </div>

          <div>
            <span>Millisecond</span>
            <select name="millisecond" onChange={this.handleChange}>
              {milliseconds.map(millisecond =>
                <option value={millisecond}>{millisecond}</option>
              )}
            </select>
          </div>
        </div>
      </section>
    )
  }
}
