import React, { Component } from 'react';
import './App.css';
// import { HashRouter } from 'react-router-dom';
import store from './redux'
import { Provider } from 'react-redux';
// import Content from './Components/content'
// import Footer from './Components/footer'
// import Nav from './Components/navbar';
// import Login from './Components/login'
// import Signup from './Components/signup'
// import Home from './Components/home'
// import PostProduct from './Components/postproduct'
// import Addetails from './Components/addetails'
// import Profile from './Components/profile'
// import Search from './Components/search'
// import UserAds from './Components/userads'
// import UpdateAd from './Components/updatead'
// import userReducer from './reducer/user';
// import { connect } from 'react-redux';
// import history from './Components/history'
import Navigator from './Components/navigator'
class App extends Component {
  state = {
    authenticated: false
  }
  componentDidMount() {
    fetch("/dashboard")
      .then((res) => res.text())
      .then((res) => {
        console.log(JSON.parse(res))
        var user = JSON.parse(res)
        if (user.authentication) {
          console.log("yes");
         
          store.dispatch({ type: 'addUser', payload: user.user })
        }
        else {
          console.log("No")
          store.dispatch({ type: 'addUser', payload: null })

        }
      })
      .catch((err) => { console.log(err) })

  }

  render() {
    return (
      <Provider store={store}>

        
            <Navigator/>
            


            {/* <Footer /> */}
       
      </Provider>

    );
  }
}

export default App;
