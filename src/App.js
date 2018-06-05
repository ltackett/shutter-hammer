import React, { Component, Fragment } from 'react';
import logo from './logo.svg';
import './App.scss';

import { NavLink, Route } from 'react-router-dom'
import { ShutterControl } from './ShutterControl'
import { BasicIntervalometer, SinglePulse, StartAt } from './Controls'

class App extends Component {
  render() {
    return (
      <div className="App">
        <section>
          <header>
            <NavLink exact to="/single-pulse">Single Pulse</NavLink>
            <NavLink exact to="/basic-intervalometer">Basic Intervalometer</NavLink>
          </header>

          <ShutterControl>
            {shutter =>
              <Fragment>
                <Route exact path="/single-pulse" render={() => (
                  <SinglePulse duration={100} onStart={shutter.handleShutterOpen} onComplete={shutter.handleShutterClose}>
                    {handleTrigger =>
                      <StartAt onStart={handleTrigger} />
                    }
                  </SinglePulse>
                )} />

                <Route exact path="/basic-intervalometer" render={() => (
                  <BasicIntervalometer duration={500} interval={2000} onStart={shutter.handleShutterOpen} onComplete={shutter.handleShutterClose}>
                    {handleTrigger =>
                      <StartAt onStart={handleTrigger} />
                    }
                  </BasicIntervalometer>
                )} />
              </Fragment>
            }
          </ShutterControl>
        </section>
      </div>
    );
  }
}

export default App;
