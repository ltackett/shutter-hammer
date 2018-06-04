import React, { Component, Fragment } from 'react'

export default class SinglePulse extends Component {
  static defaultProps = {
    onStart: () => null,
    onComplete: () => null,
  }

  handleTrigger = () => {
    const { duration, onStart, onComplete } = this.props

    onStart()
    setTimeout(() => {
      onComplete()
    }, duration)
  }

  render() {
    return this.props.children(this.handleTrigger)
  }
}
