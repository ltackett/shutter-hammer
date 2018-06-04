import React, { Component } from 'react';

// Audio context setup
// ============================================================================
const AudioContext = window.AudioContext || window.webkitAudioContext
const audioCtx = new AudioContext()

let gainNode = audioCtx.createGain()
gainNode.gain.value = 0

let osc = audioCtx.createOscillator()
osc.frequency.value = 19000
osc.type = "sine"
osc.detune.value = 0

osc.connect(gainNode)
osc.start()
gainNode.connect(audioCtx.destination)

export default class App extends Component {
  handleShutterOpen() {
    gainNode.gain.value = 1
    console.log('shutter open')
  }

  handleShutterClose() {
    gainNode.gain.value = 0
    console.log('shutter closed')
  }

  render() {
    return this.props.children({
      handleShutterOpen: this.handleShutterOpen,
      handleShutterClose: this.handleShutterClose,
    });
  }
}
