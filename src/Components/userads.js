import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { withRouter } from "react-router-dom";
import { insertads } from '../actions/action'





class UserAds extends Component {

    state = {
        ad: []
    }


    componentDidMount() {
        if (this.props.user !== null) {
            fetch('/getUserAds?id=' + this.props.user._id)
                .then((res) => res.text())
                .then((data) => {

                    console.log(JSON.parse(data))
                    this.props.dispatch(insertads(JSON.parse(data)))
                })
        }

    }


    delete = (id) => {
        fetch('/deleteAd?id=' + id)
            .then((res) => res.text())
            .then((data) => {
                console.log(JSON.parse(data))
                data = JSON.parse(data)
                if (data.deleted) {
                    fetch('/getUserAds?id=' + this.props.user._id)
                        .then((res) => res.text())
                        .then((data) => {

                            console.log(JSON.parse(data))
                            this.props.dispatch(insertads(JSON.parse(data)))
                        })
                        .then((err)=>console.log(err))
                }
              
            })
    }
    edit = (id) => {
        this.props.history.push('/updatead/' + id)
    }


    render() {


        return (
            <div>

                <div className="products row">

                    {
                        this.props.ads.length !== 0 ?

                            this.props.ads.map((val, ind) => {

                                return <div key={ind} className="card pcard" style={{ width: "18rem" }}>
                                    <Link to={"ad-details/" + val._id + '/' + val.userID} >
                                    <div className="product-img">
                                            <img className="card-img-top c-img" src={val.image || require('./images/product.jpg')} alt={"Card Image " + ind} />
                                        </div>
                                
                                        <hr />
                                        <div className="card-body cbody">
                                            <h5 className="card-title">{"RS:" + val.price}</h5>
                                            <p>{val.title}</p>
                                            <p>{val.location}</p>
                                        </div>

                                    </Link>
                                    <div className="card-btn-div">
                                        <button onClick={() => {
                                            this.edit(val._id)
                                        }} className='btn1 btn btn-dark' >Edit</button>
                                        <button onClick={() => {
                                            this.delete(val._id)
                                        }} className='btn1 btn btn-dark' >Delete</button>
                                    </div>
                                </div>

                            })
                            :
                            <h3>You have Not Posted any ad</h3>

                    }
                </div>
            </div>
        );

    }
}
const mapStateToProps = (store) => {
    return {
        user: store.userReducer,
        search: store.searchReducer,
        ads: store.adsReducer
    }
}
export default connect(mapStateToProps)(withRouter(UserAds));