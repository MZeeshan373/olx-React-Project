import React, { Component } from 'react';
import { Link } from 'react-router-dom'
// import {connect} from 'react-redux';
// import add from '../action';

class Footer extends Component {

    render() {
        return (
            <div className="footer container-fluid bg-dark text-light">
                <div className=" row footer-inner">

                    <div className="footer-inner">
                        <Link to='/'><h5 className="font-weight-bold text-uppercase mt-3 mb-4 booking-footer">Buy &amp; Sell</h5></Link>
                        <h5 className="text-primary">Contact Details</h5>
                        <div><a rel="noopener noreferrer" target="_blank" href="https://www.google.com/maps/place/D+Ground+People's+Colony+No+1,+Faisalabad,+Punjab/@31.4050614,73.0993962,15z/data=!3m1!4b1!4m5!3m4!1s0x3922680a54c1915d:0x963e48f49ba43c49!8m2!3d31.4063632!4d73.1069298"><i className="fas fa-location-arrow booking-footer"></i><span className="booking-footer">D-Ground Faisalabad</span></a></div>
                        <div><a href="tel:+923025026376"><i className="fas fa-tty booking-footer"></i><span className="booking-footer">+92302-5026376</span></a></div>
                        <div><a href="mailto:mzprogrammer@outlook.com"><i className="fas fa-envelope"></i><span className="booking-footer">mzprogrammer@outlook.com</span></a></div>
                        
                    </div>
                </div>
            </div>
        );
    }
}

export default Footer