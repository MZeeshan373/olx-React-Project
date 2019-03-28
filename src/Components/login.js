import React, { Component } from 'react'
import {connect} from 'react-redux'
import {addUser} from '../actions/action'

class Login extends Component {
    login = () => {
       
                var values = {
            username: this.refs.username.value,
            password: this.refs.password.value
        }

        if(values.username===""){
            alert("Please Enter Your Email First")
        }
        else if(values.password==="")
        {
            alert("Please Enter Your password")
        }
        else{
            var options = {
                method: 'POST', // or 'PUT'
                body: JSON.stringify(values), // data can be `string` or {object}!
                headers: {
                    'Content-Type': 'application/json'
                }
            }
    
            fetch('/login', options)
                .then(res => res.json())
                .then(data => {
                    // console.log('Success:', JSON.stringify(data))
                    this.props.dispatch(addUser(data))
                    this.props.history.push('/')
                })
                .catch(error =>{
                    this.refs.msg.style.display="block";
                    console.error('Error:', error)
                } );
    
        }
        
    }

   

    render() {
        return (
            <div className="main-login">
            {console.log(this.props)}
                <form>
                    <p className="msg" ref="msg" >Email or Password is Incorrect. </p>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="text" name="username" ref='username' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                        
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" name="password" ref="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                    </div>
                                        
                <button type="button" onClick={this.login} className="btn btn-dark ">Login</button>
                </form>
                {/* {console.log(this.props.user)} */}
            </div>
        );
    }
}
var mapStateToProps=(store)=>{
    return {
        user:store.userReducer
    }
}
export default connect(mapStateToProps)(Login);