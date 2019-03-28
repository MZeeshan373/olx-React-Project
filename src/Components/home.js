import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { insertads } from '../actions/action'




class Home extends Component {

    componentDidMount() {
        fetch('/getAllads')
            .then((res) => res.text())
            .then((data) => {
                this.props.dispatch(insertads(JSON.parse(data)))
            })
            .catch((err) => console.log(err))
    }



    render() {

        return (
            <div>




                <div className="slider">
                    <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
                        <div className="carousel-inner">
                            <div className="carousel-item active slide">
                                <img className=" d-block w-100 slid" src={require(`./images/product${1}.jpg`)} alt="First slide" />
                                <div className="captions carousel-caption d-none d-md-block">
                                    <h1>Buy</h1>
                                    <p>Buy New and Used Things</p>
                                    <h3>&amp;</h3>
                                    <h1>Sell </h1>
                                    <p>Sell your New and Used Goods</p>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <img className="d-block w-100" src={require("./images/product2.jpg")} alt="Second slide" />
                                <div className="captions carousel-caption d-none d-md-block">
                                    <h1>Buy</h1>
                                    <p>Buy New and Used Things</p>
                                    <h3>&amp;</h3>
                                    <h1>Sell </h1>
                                    <p>Sell your New and Used Goods</p>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <img className="d-block w-100" src={require("./images/product3.jpg")} alt="Third slide" />
                                <div className="captions carousel-caption d-none d-md-block">
                                    <h1>Buy &amp; Sell</h1>
                                
                                </div>
                            </div>
                        </div>
                        <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="sr-only">Previous</span>
                        </a>
                        <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="sr-only">Next</span>
                        </a>
                    </div>
                </div>





                <div className="products row">








                    {this.props.ads.length !== 0 ?
                        this.props.ads.map((val, ind) => {

                            return <div key={ind} className="card pcard " style={{ width: "18rem" }}>
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
                            </div>

                        })
                        :
                        <h3>There is No ad in Database</h3>
                    }
                </div>

            </div>
        );
    }
}
var mapStateTpProps = (store) => {
    return {
        ads: store.adsReducer
    }
}
export default connect(mapStateTpProps)(Home);