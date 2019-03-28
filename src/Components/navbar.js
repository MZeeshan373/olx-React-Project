import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { insertads, newSearch, addUser} from '../actions/action'
import { withRouter } from "react-router-dom";


class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTitle: "",
            location: ""
        };
        this.handleSearch = this.handleSearch.bind(this);
        this.handleSearchReq = this.handleSearchReq.bind(this);
    }

    handleSearchReq = (e) => {
        this.setState({ searchTitle: e.target.value });
    }
    handleSearchLocation = (e) => {
        this.setState({ location: e.target.value });

    }


    search = () => {


        var obj = {
            title: this.state.searchTitle,
            location: this.state.location,
            catagory: this.props.search.catagory,
            brand: this.props.search.brand,
            pricefrom: this.props.search.pricefrom,
            priceto: this.props.search.priceto
        }
        this.props.dispatch(newSearch(obj))

        fetch("/search?title=" + obj.title + "&location=" + obj.location + "&catagory=" + obj.catagory + "&brand=" + obj.brand + "&pricefrom=" + obj.pricefrom + "&priceto=" + obj.priceto)
            .then((res) => res.text())
            .then((data) => {
                this.props.dispatch(insertads(JSON.parse(data)))
            })
            .catch((err) => console.log(err))

        this.props.history.push('/search')



    }

    handleSearch(e) {
        if (e.keyCode === 13) {

            var obj = {
                title: this.state.searchTitle,
                location: this.state.location,
                catagory: this.props.search.catagory,
                brand: this.props.search.brand,
                pricefrom: this.props.search.pricefrom,
                priceto: this.props.search.priceto
            }
            this.props.dispatch(newSearch(obj))


            fetch("/search?title=" + obj.title + "&location=" + obj.location + "&catagory=" + obj.catagory + "&brand=" + obj.brand + "&pricefrom=" + obj.pricefrom + "&priceto=" + obj.priceto)
                .then((res) => res.text())
                .then((data) => {
                    this.props.dispatch(insertads(JSON.parse(data)))
                })
                .catch((err) => console.log(err))

             this.props.history.push('/search')

        }
    }

logout=()=>{
    fetch("/logout")
    .then(res=>res.text())
    .then((response)=>{
        this.props.dispatch(addUser(null))
    })
    .catch((err)=>{
        console.log(err)
    })
}
    render() {

        return (

            <div className="nav-bar bg-dark">
                <div className="container-fluid">
                    <div className="row" >
                        <div className="col-lg-3 col-md-3 col-sm-12">
                            <Link className="navbar-brand" to="/home">Buy &amp; Sell</Link>
                        </div>
                        <div className="headernav col-lg-5 col-md-5 col-sm-12">

                            <form className=" form-inline my-2 my-lg-0">
                                <input className="form-control mr-sm-2" type="search" placeholder="Location" aria-label="Search"
                                    onKeyUp={this.handleSearch} onChange={this.handleSearchLocation} />
                                <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"
                                    onKeyUp={this.handleSearch} onChange={this.handleSearchReq} />
                                <button className="btn btn-secondary  my-2 my-sm-0" onClick={this.search} type="button">Search</button>
                            </form>


                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-12">

                            <div className="sign-links" >

                                {
                                    this.props.user === null ?

                                        <ul>
                                            <li className="nav-item">
                                                <Link className="nav-link" to="/login">Login</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link className="nav-link" to="/signup">Sign Up</Link>
                                            </li>
                                        </ul>
                                        :
                                        <ul >
                                            <li className="nav-item">
                                                <Link className="nav-link" to="/sell">Sell </Link>
                                            </li>

                                            <li className="nav-item">
                                                <Link className="nav-link" to="/userads">My Ads </Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link className="nav-link" to="/profile">My Profile</Link>
                                            </li>
                                            <li className="nav-item"  onClick={this.logout}>
                                                <span className="text-light logout">Logout</span> 
                                            </li>
                                        </ul>
                                }
                            </div>

                        </div>
                    </div>
                </div>












            </div>
        );
    }
}


const mapStateToProps = (store) => {
    return {
        user: store.userReducer,
        search: store.searchReducer
    }
}
export default connect(mapStateToProps)(withRouter(Nav));