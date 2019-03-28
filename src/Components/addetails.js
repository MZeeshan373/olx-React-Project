import React, { Component } from 'react';
// import { Link } from 'react-router-dom'

class Addetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: null,
            ad:{},
            url: '',
            user:{},
            progress: 0,
            brand: ['Select a Catagory First']

        }
    }
    componentDidMount(){
        fetch('/getUser?_id='+this.props.match.params.userID)
        .then((res)=>   res.text() )
        .then((data)=>{
            this.setState({user: JSON.parse(data)})
        })
        .catch((err)=>{console.log(err)})
        fetch('/getDetail?_id='+this.props.match.params.id)
        .then((res)=>   res.text() )
        .then((data)=>{
            console.log(JSON.parse(data))
            this.setState({ad:JSON.parse(data)})
        })
        .catch((err)=>{console.log(err)})
    }
   
    render() {
        return (
            <div className='ad-details-main row'>
                <div className="col-md-7 col-lg-7">
                    <div className="p-img">
                        <img src={ this.state.ad.image || "https://dummyimage.com/200x200/c7bfc7/0011ff.jpg" } alt="Img" />
                    </div>
                    <div className="p-details">
                        <h6>Details</h6>
                       <div>
                       <span><p>Brand </p><p>{this.state.ad.brand}</p></span>
                       <span><p>Condition </p><p>{this.state.ad.condition}</p></span>
                       </div>
                       <br/>
                       <hr/>
                       <h6>Description</h6>
                       <p>{this.state.ad.description} </p>
                    </div>
                    
                </div>



                <div className="col-md-5 col-lg-5">
                    <div className="product-price">
                        <h4>{"Rs:"+this.state.ad.price}</h4>
                        <p className="product-title">{this.state.ad.title}</p>
                        <span className="Location">
                            <p className="P-Location" >{this.state.ad.location}</p>
                            <p className="ad-date">{this.state.ad.date}</p>
                        </span>
                    </div>
                    <div className="seller-desc">
                        <h4>Seller Description</h4>
                        <span className="d-profile-pic">
                            <img src={ this.state.user.image || require('./images/avatar.svg') || "https://dummyimage.com/60x60/c7bfc7/0011ff.jpg"} alt="img" />
                            <p className="profile-name">{this.state.user.f_name+" "+this.state.user.l_name}</p>
                        </span>
                        <a className='d-telephone bg-secondary color-light' href={"tel:"+this.state.user.phone}>{this.state.user.phone}</a>
                    </div>
                </div>
            </div>
        );
    }
}
export default Addetails;