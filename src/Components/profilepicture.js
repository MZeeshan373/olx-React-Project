import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { storage } from './firebase/index'
import { connect } from 'react-redux'


class ProfilePicture extends Component {


    constructor(props) {
        super(props);
        this.state = {
            image: null,
            url: '',
            progress: 0
        }
        this.handleUpload = this.handleUpload.bind(this);
    }
    handleUpload = (e) => {
        if (e.target.files[0]) {
            this.refs.progress.style.display = "-webkit-box";
            const image = e.target.files[0];
            this.setState({ image });
            this.setState({ url: '' })
            const uploadTask = storage.ref(`images/${image.name}`).put(image)
            uploadTask.on('state_changed',
                (snapshot) => {
                    // progress funcion
                    const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                    this.setState({ progress });
                },
                (error) => {
                    // error funcion

                    console.log(error);
                },
                () => {
                    // complete funcion
                    storage.ref('images').child(image.name).getDownloadURL()
                        .then(url => {
                            this.setState({ url });
                            console.log(url)
                        })

                }
            )
        }
    }
    updateprofilepic = () => {

        var values = {
            id: this.props.user._id,
            image: this.state.url
        }

        if (this.state.image === null) {
            alert("Please select an Image First")
        }
        else if (this.state.url === "") {
            alert("Please Wait Untill Image is Being Upload")
        }
        else {
            var options = {
                method: 'POST',
                body: JSON.stringify(values),
                headers: {
                    'Content-Type': 'application/json'
                }

            }
            fetch('/updateprofilepic', options)
                .then(res => res.json())
                .then(response => {
                    
                    fetch('/getUser?_id='+this.props.user._id)
                    .then((res)=>   res.text() )
                    .then((data)=>{
                        console.log(JSON.parse(data))
                        this.props.dispatch({type:'addUser', payload:JSON.parse(data)})
                        this.props.history.push('/profile')
                    })
                    
                })
                .catch(error => console.error('Error:', error));


        }



    }


    render() {
        return (
            <div class="main-profile-update-container">


                <div className='main-profile-update'>
                    <form>
                        <div className="pedit row">
                            <div className="container">
                                <input type="file" onChange={this.handleUpload} />
                                <img ref='img' src={this.state.url || "https://dummyimage.com/60x60/c7bfc7/0011ff.jpg"} style={{ width: '60px', height: '60px' }} alt="Uploaded" />
                                <div ref="progress" className="progress img-upload-progress">

                                    <div className="progress-bar progress-bar-striped" role="progressbar" aria-valuenow={this.state.progress || 0} aria-valuemin="0" aria-valuemax="100" style={{ width: this.state.progress + "%", }}>
                                        {"Image Uploaded" + this.state.progress + "%"}
                                    </div>
                                </div>
                            </div>

                        </div>



                    </form>
                    <button className="bg-primary btn" onClick={this.updateprofilepic} >Save</button>
                    <Link to='/profile'> <button className="bg-primary btn">Cancel</button></Link>
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

export default connect(mapStateToProps)(ProfilePicture);