// ShutterControl
// This is the higher-order React component that handles opening and closing
// the camera shutter signal.

import { Component } from 'react';

// Audio context setup
// ============================================================================
const AudioContext = window.AudioContext || window.webkitAudioContext
const audioCtx = new AudioContext()

// Initialize audio at a gain of 0
let gainNode = audioCtx.createGain()
gainNode.gain.value = 0

// Initialize a sine wave oscillator at 19khz
let osc = audioCtx.createOscillator()
osc.frequency.value = 19000
osc.type = "sine"
osc.detune.value = 0

// Connect the gain node and start the oscillator
osc.connect(gainNode)
osc.start()
gainNode.connect(audioCtx.destination)

export default class App extends Component {
  // Opening the shutter turns gain to 1 (full volume)
  handleShutterOpen() {
    gainNode.gain.value = 1
    console.log('shutter open')
  }

  // Closing the shutter turns gain to 0 (silent)
  handleShutterClose() {
    gainNode.gain.value = 0
    console.log('shutter closed')
  }

  // Expose methods via render props
  render() {
    return this.props.children({
      handleShutterOpen: this.handleShutterOpen,
      handleShutterClose: this.handleShutterClose,
    });
  }
}
