import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { insertads, newSearch } from '../actions/action'

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            brand: [],
            catagory: "",
            selectedbrand: "",
            pricefrom: "",
            priceto: ""

        };
        this.handleSearch = this.handleSearch.bind(this);
        this.handlePriceFrom = this.handlePriceFrom.bind(this);
        this.handlePriceTo = this.handlePriceTo.bind(this);
        this.handleBrand = this.handleBrand.bind(this);
    }

    handlePriceFrom = (e) => {
        this.setState({ pricefrom: e.target.value });
    }
    handlePriceTo = (e) => {
        this.setState({ priceto: e.target.value });
    }
    handleBrand = (e) => {
        this.setState({ selectedbrand: e.target.value });
    }
    handleSearch(e) {
        if (e.keyCode === 13) {

            var obj = {
                title: this.props.search.searchTitle,
                location: this.props.search.location,
                catagory: this.state.catagory,
                brand: this.state.selectedbrand,
                pricefrom: this.state.pricefrom,
                priceto: this.state.priceto
            }
            this.props.dispatch(newSearch(obj))
            fetch("/search?title=" + obj.title + "&location=" + obj.location + "&catagory=" + obj.catagory + "&brand=" + obj.brand + "&pricefrom=" + obj.pricefrom + "&priceto=" + obj.priceto)
                .then((res) => res.text())
                .then((data) => {
              
                    this.props.dispatch(insertads(JSON.parse(data)))
                })
                .catch((err) => console.log(err))
        }
    }

    search = () => {
        var obj = {
            title: this.props.search.title,
            location: this.props.search.location,
            catagory: this.state.catagory,
            brand: this.state.selectedbrand,
            pricefrom: this.state.pricefrom,
            priceto: this.state.priceto
        }
        this.props.dispatch(newSearch(obj))
        fetch("/search?title=" + obj.title + "&location=" + obj.location + "&catagory=" + obj.catagory + "&brand=" + obj.brand + "&pricefrom=" + obj.pricefrom + "&priceto=" + obj.priceto)
            .then((res) => res.text())
            .then((data) => {
                this.props.dispatch(insertads(JSON.parse(data)))
            })
            .catch((err) => console.log(err))
    }

    componentDidMount() {



        var obj = {
            title: this.props.search.title,
            location: this.props.search.location,
            catagory: this.state.catagory,
            brand: this.state.selectedbrand,
            pricefrom: this.state.pricefrom,
            priceto: this.state.priceto
        }
        // this.props.dispatch(newSearch(obj))
        fetch("/search?title=" + obj.title + "&location=" + obj.location + "&catagory=" + obj.catagory + "&brand=" + obj.brand + "&pricefrom=" + obj.pricefrom + "&priceto=" + obj.priceto)
            .then((res) => res.text())
            .then((data) => {
                console.log(data)
                this.props.dispatch(insertads(JSON.parse(data)))
            })
            .catch((err) => console.log(err))



    }

    check = () => {
        var mobile_brands = ['Samsung', 'Nokia', 'Apple', 'Huawei', 'Google', 'Sony', 'LG', 'Motorola', 'OnePlus', 'Xiaomi', 'Acer', 'Vodafone', 'Qmobile', 'G-Five']
        var computer_brands = ['HP', 'Dell', 'Acer', 'Apple', 'Asus', 'Google', 'Lenovo', 'Microsoft', 'Samsung', 'Huawei']
        var vehicle_brands = ['Honda', 'Suzuki', 'Toyota', 'Volvo', 'Mitsubishi', 'Nissan', 'Hyundai', 'Jaguar', 'Jeep', 'Ford', 'BMW', 'Ferrari', 'Audi']
        var bike_brands = ['Honda', 'Suzuki', 'Yamaha', 'Ducati', 'Kawasaki', 'Hero', 'Harley-Davidson', 'BMW', 'Bajaj', 'Royal Enfield']
        var watch_brands = ['Rolex', 'Patek Philippe', 'Omega', 'Montblance', 'Piaget', 'Tag Heuer', 'Technos', 'Indiglo']
        if (this.refs.catagory.value === "Mobile") {
            this.setState({ catagory: "Mobile" })
            this.setState({ brand: mobile_brands })
        }
        else if (this.refs.catagory.value === "Computer") {
            this.setState({ catagory: "Computer" })
            this.setState({ brand: computer_brands })
        }
        else if (this.refs.catagory.value === "Vehicle") {
            this.setState({ catagory: "Vehicle" })
            this.setState({ brand: vehicle_brands })
        }
        else if (this.refs.catagory.value === "Bike") {
            this.setState({ catagory: "Bike" })
            this.setState({ brand: bike_brands })
        }
        else if (this.refs.catagory.value === "Watch") {
            this.setState({ catagory: "Watch" })
            this.setState({ brand: watch_brands })
        }
        else {
            this.setState({ catagory: "" })
            this.setState({ brand: [] })
        }

    }


    render() {

        return (
            <div className="main-search-div">
                <div className="filter ">
                    <nav className="nbar navbar navbar-expand-lg navbar-dark bg-dark row">



                        <div className="form-inline filter-ddown first-nav-div ">
                            <h5 className="navbar-brand" to="#">Filter</h5>
                            <select className="form-control" onChange={this.check} id="exampleFormControlSelect1" ref='catagory'>
                                <option value="">*Select Catagory</option>
                                <option value="Mobile">Mobiles/Tablets</option>
                                <option value="Computer">Computers/Laptops</option>
                                <option value="Vehicle">Vehicles</option>
                                <option value="Bike">Bikes</option>
                                <option value="Watch">Watches</option>

                            </select>
                            <select className="form-control" onChange={this.handleBrand} style={{ margin: '0 8px' }} id="exampleFormControlSelect1" ref='brand'>
                                <option value="" >*Select Brand</option>
                                {this.state.brand.map((val, ind) => {
                                    return <option key={ind} value={val} >{val}</option>
                                })}
                            </select>


                        </div>
                        <div className="form-inline ">
                            <label htmlFor="price" className='text-light'>Price Rnge</label>
                            <input className="form-control mr-sm-1" id="price" type="number"
                                onChange={this.handlePriceFrom} placeholder="From" aria-label="Search" />
                            <input className="form-control mr-sm-1" type="number"
                                onChange={this.handlePriceTo} placeholder="To" aria-label="Search" />
                            <button type="button" className="btn btn-secondary" onClick={this.search} >Filter </button>
                        </div>


                    </nav>
                </div>



                <div className="products row">

                    {
                        this.props.ads.length !== 0 ?
                            this.props.ads.map((val, ind) => {

                                return <div key={ind} className="card pcard" style={{ width: "18rem" }}>
                                    <Link to={"ad-details/" + val._id + '/' + val.userID} >
                                        <div className="product-img">
                                            <img className="card-img-top c-img" src={val.image || require('./images/product.jpg')} alt={"Card Image " + ind} />
                                        </div>
                                        {/* <img className="card-img-top c-img" src={val.image || require('./images/product.jpg')} alt={"Card Image " + ind} /> */}
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
                            <h3>No Result Found</h3>
                    }
                </div>

            </div>




        );
    }

}

var mapStateTpProps = (store) => {
    return {
        ads: store.adsReducer,
        search: store.searchReducer
    }
}
export default connect(mapStateTpProps)(Search);