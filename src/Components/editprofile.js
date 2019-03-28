import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'



class EditProfile extends Component{

   
    updateprofile= () => {

        var values = {
            id:this.props.user._id,
            f_name: this.refs.f_name.value,
            l_name: this.refs.l_name.value,
            email: this.refs.email.value,
            phone: this.refs.phone.value,
            s_address: this.refs.s_address.value,
            city: this.refs.city.value,
            country: this.refs.country.value,
            z_code: this.refs.z_code.value

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

            var options = {
                method: 'POST', // or 'PUT'
                body: JSON.stringify(values), // data can be `string` or {object}!
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            fetch('/updateprofile', options)
                .then(res => res.json())
                .then(response => {
                    // console.log('Success:', JSON.stringify(response))
                    this.props.history.push('/profile')
                })
                .catch(error => console.error('Error:', error));

        }



    }

    render(){

        return(
            <div class="main-profile-update-container">

            
            <div className='main-profile-update'>
            <form>
                <div className="pedit row">
                    <div className="form-group col-md-6 ">
                        <label htmlFor="fname" >First Name</label>
                        <input type="text" className="form-control" id="fname" ref='f_name' defaultValue={this.props.user.f_name} placeholder="First name" />
                    </div>
                    <div className="form-group col-md-6">
                    <label htmlFor="fname" >Last Name</label>
                        <input type="text" className="form-control" ref='l_name' defaultValue={this.props.user.l_name} placeholder="Last name" />
                    </div>

                    <div className="form-group col-md-12">
                    <label htmlFor="inputEmail4" >Email</label>
                        <input type="email" className="form-control" id="inputEmail4" defaultValue={this.props.user.email} ref='email' placeholder="Email" />
                    </div>
                    <div className="form-group col-md-12">
                    <label htmlFor="inputPhone" >Phone Number</label>
                        <input type="Number" className="form-control" id="inputPhone" defaultValue={this.props.user.phone} ref='phone'  placeholder="Phone" />
                    </div>
                    <div className="form-group col-md-12">
                    <label htmlFor="inputAddress" >Address</label>
                        <input type="text" className="form-control" id="inputAddress" defaultValue={this.props.user.s_address} ref='s_address' placeholder="Street Address" />
                    </div>
                    <div className="form-group col-md-12">
                    <label htmlFor="inputCountry" >Country</label>
                        <input type="text" className="form-control" id="inputCountry" defaultValue={this.props.user.country} ref='country' placeholder="Country" />
                    </div>

                    <div className="form-group col-md-6">
                    <label htmlFor="inputCity" >City</label>
                        <input type="text" placeholder="City" className="form-control" defaultValue={this.props.user.city} ref='city' id="inputCity" />
                    </div>

                    <div className="form-group col-md-3">
                    <label htmlFor="inputZip" >Zip Code</label>
                        <input type="text" placeholder="Zip Code" className="form-control" defaultValue={this.props.user.z_code} ref='z_code' id="inputZip" />
                    </div>
                </div>

                
              
            </form>
            <button className="bg-dark btn text-light" onClick={this.updateprofile} >Update Profile</button>
            <Link to='/profile'> <button className="bg-dark text-light btn">Cancel</button></Link>
       
        </div>
    </div>
        );
    }
}

const mapStateToProps = (store) => {
    return {
                        user: store.userReducer
                }
            }
            
export default connect(mapStateToProps) (EditProfile);