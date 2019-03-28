import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import {storage} from './firebase/index'
import {connect} from 'react-redux'

class PostProduct extends Component {
    
    
    
    constructor(props){
        super(props);
        this.state={
            image:null,
            url:'',
            progress:0,
            brand: ['Select a Catagory First'],
            style:{}

            
        }
        
        this.handleUpload=this.handleUpload.bind(this);
    }
    handleUpload=(e)=>{
        if(e.target.files[0]){
            this.refs.progress.style.display="-webkit-box";
            const image=e.target.files[0];
            this.setState({image});
            this.setState({ url: '' })
            const uploadTask= storage.ref(`images/${image.name}`).put(image)
            uploadTask.on('state_changed', 
            (snapshot)=>{
            // progress funcion
                const progress=Math.round((snapshot.bytesTransferred/snapshot.totalBytes)*100)
                this.setState({progress});
            },
             (error)=>{
            // error funcion
            
                console.log(error);
             }, 
             ()=>{
            // complete funcion
            storage.ref('images').child(image.name).getDownloadURL()
            .then(url=>{
                this.setState({url});
               
            })
            
             }
             )
        }
    }
   
    check = () => {
        var mobile_brands = ['Samsung', 'Nokia', 'Apple','Huawei','Google','Sony','LG','Motorola','OnePlus','Xiaomi','Acer','Vodafone','Qmobile','G-Five']
        var computer_brands = ['HP', 'Dell', 'Acer','Apple','Asus','Google','Lenovo','Microsoft','Samsung','Huawei']
        var vehicle_brands = ['Honda', 'Suzuki','Toyota','Volvo','Mitsubishi','Nissan','Hyundai','Jaguar','Jeep','Ford','BMW','Ferrari','Audi']
        var bike_brands = ['Honda', 'Suzuki', 'Yamaha','Ducati','Kawasaki','Hero','Harley-Davidson','BMW','Bajaj','Royal Enfield' ]
        var watch_brands=['Rolex','Patek Philippe','Omega','Montblance','Piaget','Tag Heuer','Technos','Indiglo']
     
        if (this.refs.catagory.value === "Mobile") {
            this.setState({ brand: mobile_brands })
        }
        else if (this.refs.catagory.value === "Computer") {
            // alert("Computer")
            this.setState({ brand: computer_brands })
        }
        else if (this.refs.catagory.value === "Vehicle") {
            // alert("Computer")
            this.setState({ brand: vehicle_brands })
        }
        else if (this.refs.catagory.value === "Bike") {
            // alert("Computer")
            this.setState({ brand: bike_brands })
        }
        else if(this.refs.catagory.value === "Watch"){
            this.setState({ brand: watch_brands })
        }
        else{
            this.setState({ brand:['Select a Catagory First'] })
        }
     
    }

    post = () => {
        var d = new Date();
        var months = ["January","February","March","April","May",
        "June","July","August","September","October","November","December"];
        var date=d.getDate()+"-"+months[d.getMonth()]+"-"+d.getFullYear();
        var values = {
            catagory: this.refs.catagory.value,
            condition: this.refs.condition.value,
            brand: this.refs.brand.value,
            title: this.refs.title.value,
            price: this.refs.price.value,
            description: this.refs.description.value,
            date:date,
            image:this.state.url,
            userID:this.props.user._id,
            location:this.props.user.city+", "+this.props.user.country

        }
        if(values.catagory==="")
        {
            alert("Please Select a Catagory First");
            this.refs.catagory.focus();       
        }
        else if(values.condition==="")
        {
            alert("Please Select Product Condition First");
            this.refs.condition.focus();       
        }
        else if(values.brand==="" )
        {
            alert("Please Select Product Brand/Company First");
            this.refs.brand.focus();       
        }
        else if(values.title==="")
        {
            alert("Please Set a Title First");
            this.refs.title.focus();       
        }
        else if(values.price==="")
        {
            alert("Please Set a Price First");
            this.refs.price.focus();       
        }
        else if(values.description==="")
        {
            alert("Please Add some Description First");
            this.refs.description.focus();       
        }
        else if(this.state.image===null)
        {
            alert("Please select an Image First")
        }
        else if(this.state.url==="")
        {
            alert("Please Wait Untill Image is Being Upload")
        }
        else
        {
            var options = {
                method: 'POST',
                body: JSON.stringify(values),
                headers: {
                    'Content-Type': 'application/json'
                }
    
            }
            fetch('/adstore', options)
                .then(res => res.json())
                .then(response => {
                    console.log('Success:', JSON.stringify(response))
                    // this.refs.btn.style.display="block"
                    // console.log(this.refs.btn)
                    // this.setState({style:{display:"block"}})
                    this.props.history.push('/userads')
                })
                .catch(error => console.error('Error:', error));
    

        }


        
    }

    render() {


        return (
            <div className='ad-form'>
                <form>
                    <fieldset>
                        <legend>Add Product Details</legend>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlSelect1">Select a Catagory</label>
                            <select className="form-control" onChange={this.check} id="exampleFormControlSelect1" ref='catagory'>
                                <option value="">*Select Catagory</option>
                                <option value="Mobile">Mobile/Tablet</option>
                                <option value="Computer">Computer/Laptop</option>
                                <option value="Vehicle">Vehicle</option>
                                <option value="Bike">Bike</option>
                                <option value="Watch">Watch</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlSelect1">Select Condition</label>
                            <select className="form-control" id="exampleFormControlSelect1" ref='condition'>
                                <option value="">*Select Condition</option>
                                <option value="Used">Used</option>
                                <option value="New" >New</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlSelect1">Select Brand/Company</label>
                            <select className="form-control" id="exampleFormControlSelect1" ref='brand'>
                                <option value="" >*Select Brand/Company</option>
                                {this.state.brand.map((val, ind) => {
                                    return <option key={ind} value={val} >{val}</option>
                                })}
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="title">Add a title</label>
                            <input type="text" className="form-control" id="title" placeholder="Enter product Title here" ref='title' />
                        </div>
                        <div className="form-group">
                            <label htmlFor="price">Set a price</label>
                            <input type="number" style={{width:"100%"}} className="form-control" id="price" placeholder="Enter product price here in PKR" ref='price' />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description" >Add description</label><br />
                            <textarea id='description' style={{ width: '100%', height: '100px' }} ref='description'></textarea>
                        </div>
                        <input type="file" onChange={this.handleUpload} />
                        <img ref='img' src={this.state.url || "https://dummyimage.com/60x60/c7bfc7/0011ff.jpg"} style={{width:'60px',height:'60px'}} alt="Uploaded" />
                       
                        <div className="container">
                            <div ref="progress" className="progress img-upload-progress">
                                
                                <div  className="progress-bar progress-bar-striped" role="progressbar" aria-valuenow={this.state.progress || 0} aria-valuemin="0" aria-valuemax="100" style={{ width: this.state.progress + "%", }}>
                                {"Image Uploaded" + this.state.progress+"%"}
                                </div>
                            </div>
                        </div>
                        <br/>
                        <button type='button' onClick={this.post} className="btn btn-secondary">Post Ad</button>
                    {/* {/* <button  type="button" onClick={this.handleUpload}>Upload</button> */}
                    </fieldset>
                    
                </form> 

                    <div className="msg-posted bg-light" style={this.state.style}>
                                <h3  >Ad Posted Sucessfully</h3>
                                <Link ref="btn" to="/"  ><button className="btn-123 btn btn-dark btn-lg">OKAY</button></Link>
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
            
export default connect(mapStateToProps) (PostProduct);