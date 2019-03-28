import React, { Component } from 'react'
import { validate } from './emailvalidate'


class Signup extends Component {

    signup = () => {
        this.refs.msg.style.display = "none";
        var d = new Date();
        var months = ["January", "February", "March", "April", "May",
            "June", "July", "August", "September", "October", "November", "December"];
        var date = d.getDate() + "-" + months[d.getMonth()] + "-" + d.getFullYear();
        var values = {
            f_name: this.refs.f_name.value,
            l_name: this.refs.l_name.value,
            email: this.refs.email.value,
            password: this.refs.password.value,
            phone: this.refs.phone.value,
            s_address: this.refs.s_address.value,
            city: this.refs.city.value,
            country: this.refs.country.value,
            z_code: this.refs.z_code.value,
            date: date

        }

        if (this.refs.f_name.value === "") {
            alert("Please Enter Your First Name")
            this.refs.f_name.focus()
        }
        else if (this.refs.l_name.value === "") {
            alert("Please Enter Your Last Name")
            this.refs.l_name.focus()
        }
        else if (this.refs.email.value === "") {
            alert("Please Enter Your Email Address")
            this.refs.email.focus()
        }
        else if (!validate(this.refs.email.value)) {
            alert("Your Email Format in not Valid")
            this.refs.email.focus()
        }
        else if (this.refs.password.value === "") {
            alert("Please Set Your Password First")
            this.refs.password.focus()
        }
        else if (this.refs.phone.value === "") {
            alert("Please Enter Your Phone Number")
            this.refs.phone.focus()
        }
        else if (this.refs.s_address.value === "") {
            alert("Please Enter Your Address First")
            this.refs.s_address.focus()
        }

        else if (this.refs.country.value === "") {
            alert("Please Enter Your Country Name")
            this.refs.country.focus()
        }
        else if (this.refs.city.value === "") {
            alert("Please Enter Your City Name")
            this.refs.city.focus()
        }
        else if (this.refs.z_code.value === "") {
            alert("Please Enter Zip Code of Your City")
            this.refs.z_code.focus()
        }
        else {

            fetch('/searchRecord?email=' + this.refs.email.value)
                .then((res) => res.text())
                .then((data) => {
                    var user = JSON.parse(data)
                    if (user.userExist) {
                        this.refs.msg.style.display = "block";
                        this.refs.email.focus();
                    }
                    else {
                        var options = {
                            method: 'POST', // or 'PUT'
                            body: JSON.stringify(values), // data can be `string` or {object}!
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        }

                        fetch('/signup', options)
                            .then(res => res.json())
                            .then(response => {
                                this.props.history.push('/login')
                            })
                            .catch(error => console.error('Error:', error));

                    }
                })
                .catch((err) => { console.log(err) })




        }



    }
  
    render() {
        return (
            <div className='main-signup'>
                <form>
                    <div className="row">
                        <p className="msg" ref="msg" >Given email is already registered with an account</p>
                        <div className="form-group col-md-6 ">
                            <input type="text" className="form-control" ref='f_name' placeholder="First name" />
                        </div>
                        <div className="form-group col-md-6">
                            <input type="text" className="form-control" ref='l_name' placeholder="Last name" />
                        </div>

                        <div className="form-group col-md-12">

                            <input type="email" className="form-control" id="inputEmail4" ref='email' placeholder="Email" />
                        </div>
                        <div className="form-group col-md-12">
                            <input type="password" className="form-control" id="inputPassword4" ref='password' placeholder="Password" />
                        </div>
                        <div className="form-group col-md-12">
                            <input type="Number" className="form-control" id="inputPhone" ref='phone' placeholder="Phone" />
                        </div>
                        <div className="form-group col-md-12">
                            <input type="text" className="form-control" id="inputAddress" ref='s_address' placeholder="Street Address" />
                        </div>
                        <div className="form-group col-md-12">
                            <input type="text" className="form-control" id="inputCountry" ref='country' placeholder="Country" />
                        </div>

                        <div className="form-group col-md-6">
                            <input type="text" placeholder="City" className="form-control" ref='city' id="inputCity" />
                        </div>

                        <div className="form-group col-md-3">
                            <input type="text" placeholder="Zip Code" className="form-control" ref='z_code' id="inputZip" />
                        </div>
                    </div>



                </form>
                <button className="bg-primary btn" onClick={this.signup} >Sign Up</button>
               
            </div>
        );
    }
}

export default Signup;