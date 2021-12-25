import React, { Component } from 'react'
import {Navigate,Link} from 'react-router-dom'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import axios from 'axios'

export class Userinfo extends Component {
    constructor(props) {
        super(props)
        const token = localStorage.getItem("token")
        console.log("token",token)
        let loggedIn = true
        let name = token
        if(token === null)
        {
            alert("Login to see your profile")
            loggedIn=false
        }
        this.state = {
             loggedIn,
             name,
             user:{},
             pp:"http://localhost:8080/user.png",
             image:null,
             resume:null,
             friends:[]
        }
    }
    
    setImage = (event)=>{
        this.setState({image:event.target.files[0]})
        console.log(event.target.files[0])
    }

    setResume = (event)=>{
        this.setState({resume:event.target.files[0]})
        console.log(event.target.files[0])
    }

    uploadResume = ()=>{
        var fd = new FormData()
        fd.append("name",this.state.name)
        fd.append("resume",this.state.resume)
        axios.post("http://localhost:8080/uploadResume",fd)
        .then(res=>console.log(res.data))
    }

    upload = ()=>{
        var fd = new FormData()
        fd.append("name",this.state.name)
        fd.append("pp",this.state.image)
        axios.post("http://localhost:8080/uploadImage",fd)
        .then(res=>console.log(res.data))
    }

    componentDidMount()
    {
        axios.get(`http://localhost:8080/profile/${this.state.name}`) 
        .then(res=>{
            console.log("response data",res.data);
            this.setState({user: res.data});
            this.setState({friends: res.data.friends});
            this.setState({pp:res.data.image})
            console.log("friends",this.state.friends)
        })
        .catch(error=>{
            console.log(error);
        })
    }

    render() {
        if(this.state.loggedIn == false){
            return <Navigate to = "/login"></Navigate>
        }
        const {user} = this.state
        const {friends} = this.state
        return (
            <div style={{padding:"10px"}}>
                <Paper elevation={5} sx={{width:"80%",margin:"auto",padding:"20px"}}>
                <img src={this.state.pp} style={{height:"30%",width:"30%",borderRadius:"50%"}}/>
                {/* <PersonOutlineIcon style={{height:"30%",width:"30%"}}/> */}
                {/* <h1>Hello {this.state.name}</h1> */}
                <div style={{width:"fit-content",height:"fit-content",margin:"auto",padding:"4px",border:"1px solid gray",display:"flex"}}>
                    <input type="file" id="image" style={{marginTop:"3px",display:"none"}} onChange={this.setImage}/> 
                    <Button style={{marginRight:"10px"}}><label for="image"> Select Profile Pic </label></Button> 
                    <Button variant="outlined" onClick={this.upload} >Upload</Button>
                </div>
                <h1 style={{fontFamily:'Pacifico',margin:"5px"}}>Your Profile</h1>
                <Paper elevation={4} sx={{width:"60%",textAlign:"justify",margin:"auto",padding:"15px"}}>
                <div><b>Email: </b>{user.email}</div>
                <div><b>Contact No.: </b>{user.contact}</div>
                <div><b>Bio: </b>{user.bio}</div>
                <div><b>Education: </b>{user.education}</div>
                <div><b>Experience: </b>{user.experience}</div>
                <div><b>Skills: </b>{user.skills}</div>
                <div style={{display:"flex"}}>
                    <div><b>Connections:  </b> {friends.length} </div>
                    {/* {friends.map((friend) => {
                        return (<div style={{marginLeft:"4px"}}>{friend.name}</div>); 
                    })} */}
                </div>
                </Paper>
                <h2>Posts</h2>
                <Button variant="outlined" style={{width:"20%",margin:"20px"}}><Link to = "/userposts">Your Posts</Link> </Button>
                <Button variant="outlined" style={{width:"20%",margin:"20px"}}><Link to = "/addpost">Create New Post</Link> </Button>
                <hr></hr>
                <h2>Resume</h2>
                <Button variant="outlined" style={{width:"20%",margin:"20px"}}><a href={user.resume} target="_blank" >Your Resume</a> </Button>
                <Button variant="outlined" style={{width:"20%",margin:"20px"}}><Link to = "/resume">Resume Builder</Link> </Button>
                <div style={{display:"flex",width:"fit-content",border:"1px solid blue",margin:"10px auto",padding:"5px"}}>
                    <input type="file" id="resume" style={{display:"none"}} onChange={this.setResume}/>
                    <Button style={{marginRight:"5px"}}><label for="resume">Select Resume</label></Button> 
                    <Button variant="outlined" onClick={this.uploadResume} >Upload</Button>
                </div>
                </Paper>
            </div>
        )
    }
}

export default Userinfo