import React, { Component } from 'react';
import EditProfile from './editprofile'
import ProfilePicture from './profilepicture'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom';



class Profile extends Component {


    render() {
        return (
            <div>
                <div className="Profile container">
                    <div className="Profile-Content ">
                        <div className="profile-image">
                            <img src={this.props.user.image || require('./images/avatar.svg') } alt="User-Profile" />
                        </div>
                        {
                            this.props.user !== null ?
                                <h5>{this.props.user.f_name + " " + this.props.user.l_name}</h5>
                                :
                                <div>
                                    <h5>Please Login First</h5>
                                    <Link><button className="btn btn-dark" >Login</button></Link>
                                </div>
                        }
                        <div className='btn-div2' >
                            <Link to="/profile/editprofilepic"><button className='btn btn-dark' >Change Profile Picture</button></Link>
                        </div>
                        <div className='btn-div' >
                            <Link to="/userads"><button className='btn btn-dark' >My Ads</button></Link>
                        </div>

                        <div className='btn-div1' >
                            <Link to={'/profile/editprofile/' + this.props.user._id}> <button className='btn btn-dark' >Edit Profile</button></Link>
                        </div>
                    </div>
                </div>

                <Route path='/profile/editprofilepic' component={ProfilePicture} />
                <Route path='/profile/editprofile/:id' component={EditProfile} />

            </div>
        );
    }
}
const mapStateToProps = (store) => {
    return {
        user: store.userReducer
    }
}

export default connect(mapStateToProps)(Profile);
