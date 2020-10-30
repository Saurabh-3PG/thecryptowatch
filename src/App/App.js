import React, { Component } from 'react'

import '../App/App.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Module from './Modules';

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import Home from './Modules/Home/Home';
import Details from './Modules/Details';
import PageNotFound from './PageNotFound'

//PureComponent is the React Components which by default implements shouldComponentUpdate and if any props related to present component has changed
class App extends Component {
  // Simple class component
  //  Component Lifecycles
  //     #1 First time rendered Lifecycles (Create)
  constructor(props) { // Lifecycles_create_call__1 - not an reactjs Lifecycles but of ES6 - no http requests plz
    super(props)
    this.state = {
      name: 'Saurabh'
    }
    console.log(`[Main.js] constructor`)
  }

  static getDerivedStateFromProps(props, state) { // Lifecycles_create_call__2 - It is there to keep states in sync with props change - no http requests plz
    console.log(`[Main.js] getDerivedStateFromProps`)
    return state;
  }

  // componentWillMount(){
  //     console.log(`[Main.js] componentWillMount`)
  // }

  render() { // Lifecycles_create_call__3 - Layout print - no http requests plz
    console.log(`[Main.js] render`)
    return (
      <div>
        <Module>
          <BrowserRouter>
            <Header />
            <Switch>
              <Route path='/' exact component={Home} />
              <Redirect from='/home' to="/" exact component={Home} />
              <Route path='/details:id' exact component={Details} />
              <Route path="*">
                <PageNotFound />
              </Route>
            </Switch>
            <Footer />
          </BrowserRouter>
        </Module>
      </div>
    );
  }

  componentDidMount() {
    // Lifecycles_create_call__3 - only called when all the sub components of reader lifecycle is complete
    // then this life cycle will end
    // no set state
    console.log(`[Main.js] componentDidMount`)
  }
  componentWillUnmount() {
    console.log(`[Main.js] componentWillUnmount`)
  }

  //      #2 When somethings change (props) Lifecycles (Update)
  //      These are only called when state get updated

  //  getDerivedStateFromProps() get called ---- Lifecycles_Update_Step01

  // componentWillReceiveProps(){

  // }

  shouldComponentUpdate(nextProps, nextState) { // ---- Lifecycles_Update_Step01 // not needed incase of PureComponent
    // here we can cancel update
    console.log(`[Main.js] shouldComponentUpdate`)
    return true;
  }

  // -- then the render() get called after it ends  // ---- Lifecycles_Update_Step02

  getSnapshotBeforeUpdate(prevProps, prevState) { // ---- Lifecycles_Update_Step03
    console.log(`[Main.js] getSnapshotBeforeUpdate`)
    // getting to current scrolling position of the user
    // return null;
    return { message: 'Hello' }
  }
  componentDidUpdate(prevProps, prevState, snapshot) { // ---- Lifecycles_Update_Step04
    console.log(`[Main.js] componentDidUpdate`, snapshot)
  }


}

export default App;