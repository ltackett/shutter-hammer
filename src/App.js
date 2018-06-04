import React, { Component, Fragment } from 'react';
import logo from './logo.svg';
import './App.css';

import { ShutterControl } from './ShutterControl'
import { SinglePulse, StartAt } from './Controls'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <ShutterControl>
            {shutter =>
              <Fragment>
                <SinglePulse duration={100} onStart={shutter.handleShutterOpen} onComplete={shutter.handleShutterClose}>
                  {handleTrigger =>
                    <StartAt onStart={handleTrigger} />
                  }
                </SinglePulse>
              </Fragment>
            }
          </ShutterControl>
        </header>
      </div>
    );
  }
}

export default App;
