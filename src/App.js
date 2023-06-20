import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Main from './Main'
import About from './About';
import View from './View';
import AddBook from './components/AddBook';
const App = () => {
  return (
    <div>
 <>

      <Router>
      <Switch>
        <Route exact path="/" component={Main }/>
        <Route exact path="/addBook/:id" component={AddBook }/>
        <Route path="/about" component={About} />
        <Route path="/view/:id" component={View} />
        {/* <Route path="/contact" component={Contact} /> */}
     
      </Switch>
    </Router>
    </>

    </div>
  )
}

export default App
