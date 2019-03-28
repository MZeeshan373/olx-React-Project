import React, { Component } from 'react';
import { HashRouter,Route, Switch } from 'react-router-dom';

import Nav from './navbar';
import Login from './login'
import Signup from './signup'
import Home from './home'
import PostProduct from './postproduct'
import Addetails from './addetails'
import Profile from './profile'
import Search from './search'
import UserAds from './userads'
import UpdateAd from './updatead'
import { connect } from 'react-redux';
import Footer from './footer'



class Navigator extends Component {
  state = {
    user: null
  }
  render() {
  
    return (

      <HashRouter >


        <div style={{ minWidth: "400px" }} >
          <Nav />
          {
            this.props.user !== null ?
              <Switch>
                <Route path='/updatead/:id' component={UpdateAd} />
                <Route path='/ad-details/:id/:userID' component={Addetails} />
                <Route path='/profile' component={Profile} />
                <Route path='/search' component={Search} />
                <Route path='/sell' component={PostProduct} />
                <Route path='/userads' component={UserAds} />
                <Route path="/" component={Home} />
              </Switch>
              :
              <Switch>
                <Route path='/login' component={Login} />
                <Route path='/ad-details/:id/:userID' component={Addetails} />                
                <Route path='/signup' component={Signup} />
                <Route path='/search' component={Search} />
                <Route path="/" component={Home} />
              </Switch>
          }
          <Footer/>
        </div>
      </HashRouter>
    )
  }
}
const mapStateToProps = (store) => {
  return {
    user: store.userReducer
  }
}

export default connect(mapStateToProps)(Navigator);
