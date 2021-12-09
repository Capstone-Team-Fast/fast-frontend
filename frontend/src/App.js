import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom'
import { Route } from 'react-router-dom'

//import CustomersList from './example/CustomersList'

import Recipient from './components/Data/Recipient/Recipient'
import Driver from './components/Data/Driver/Driver'
import AddDriver from './components/Data/Driver/AddDriver'
import AddRecipient from './components/Data/Recipient/AddRecipient'
import UpdateDriver from './components/Data/Driver/UpdateDriver';
import UpdateRecipient from './components/Data/Recipient/UpdateRecipient';
import ViewRecipient from './components/Data/Recipient/ViewRecipient';
import ViewDriver from './components/Data/Driver/ViewDriver';
import Routing from './components/Routing/Routing';
import UploadDriversList from './components/Data/Driver/UploadDriversList'
import PreviewDrivers from './components/Data/Driver/PreviewDrivers'
import RouteResults from './components/Route_Results/RouteResults';
import DriverRoute from './components/Route_Results/DriverRoute';

import './App.css';


const BaseLayout = () => (
  <div className="container-fluid">
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="/">ISC Driver and Recipient Data</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
  <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div className="navbar-nav">
      <a className="nav-item nav-link" href="/">ADD DATA</a>
      <a className="nav-item nav-link" href="/routing">CREATE ROUTE</a>

    </div>
  </div>
</nav>

    <div className="content">
      <Route path="/" exact component={Driver} />
      <br/>
      <Route path="/" exact component={Recipient} />
      <Route path="/routing" exact component={Routing} />
      <Route path="/routeResults/:id" exact component={RouteResults} />
      <Route path="/routeResults/driverRoute/:routeId/:driverId" exact component={DriverRoute} />
      <Route path="/addDriver" exact component={AddDriver} />
      <Route path="/addRecipient" exact component={AddRecipient} />
      <Route path="/updateDriver/:id" exact component={UpdateDriver} />
      <Route path="/updateRecipient/:id" exact component={UpdateRecipient} />
      <Route path="/recipientDetail/:id" exact component={ViewRecipient} />
      <Route path="/driverDetail/:id" exact component={ViewDriver} />
      <Route path="/uploadDriversList" exact component={UploadDriversList}/>
      <Route path="/previewDrivers" exact component={PreviewDrivers}/>
    </div>
  </div>
  
)

class App extends Component {
  render() {
    return (
      <BrowserRouter forceRefresh={true}>
        <BaseLayout/>
      </BrowserRouter>
    );
  }
}

export default App;