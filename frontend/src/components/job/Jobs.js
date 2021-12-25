import React, { Component } from 'react'
import axios from 'axios'
import Paper from '@mui/material/Paper'
import Avatar from '@mui/material/Avatar';
import {Link} from 'react-router-dom'
import Button from '@mui/material/Button'
import { TextField } from '@mui/material';

export class Jobs extends Component {
    constructor(props) {
        super(props)
        let token = localStorage.getItem("token")
        this.state = {
             list:[],
             user:{},
             role:"",
             name:token
        }
    }
    
    componentDidMount()
    {
        axios.get(`http://localhost:8080/jobs`) 
        .then(res=>{
            console.log("response data",res.data);
            this.setState({list: res.data});
        })
        .catch(error=>{
            console.log(error);
        })
        axios.get(`http://localhost:8080/profile/${this.state.name}`) 
        .then(res=>{
            console.log("response data",res.data);
            this.setState({user: res.data});
        })
        .catch(error=>{
            console.log(error);
        })
    }

    enterRole = (event)=>{
        this.setState({role:event.target.value})
    }

    setId(id,event){
        console.log(id)
        const JSON = {
            id:id,
            name:this.state.name,
            image:this.state.user.image,
            resume:this.state.user.resume
        };
        if(this.state.name)
        {
            axios
            .post('http://localhost:8080/apply', JSON)
            .then(response => {
                console.log("Data from backend", response.data);
            })
        }else{
            alert("Login To Apply for Jobs")
        }
    }


    render() {
        const {list} = this.state
        return (
            <div>

               <div style={{width:"40%",margin:"30px auto",border:"1px solid black",padding:"20px"}}>
                   <h1>Search Jobs Based on Roles</h1> 
                   <TextField
                    id="outlined"
                    label="Enter Role"
                    style={{width:"90%"}}
                    value={this.state.role} 
                    onChange= {this.enterRole}
                    />
                    <Button variant="outlined" sx={{width:"90%",margin:"15px"}}> <Link to={`/jobs/${this.state.role}`}>  Search </Link> </Button>
               </div>

               <h1 style={{padding:"25px"}}>Jobs</h1>
               <div>
                    {
                        list.map(post=>
                            <Paper elevation={5} sx={{width:"70%",margin:"10px auto",textAlign:"justify",padding:"10px"}}>
                                <div style={{display:"flex"}}><Avatar src={post.image} style={{margin:"5px 10px"}} /><div style={{paddingTop:"7px",paddingLeft:"7px",fontWeight:"bold"}}> <Link to={`/company/${post.name}`}>  {post.name.toUpperCase()} </Link>  <div style={{fontWeight:"normal"}} >{post.date}</div>  </div></div>
                                <Paper elevation={3} style={{padding:"10px 10px",margin:"5px"}}>
                                    <div> <b>Role: </b> {post.role} </div>
                                    <div> <b>Job Description:</b> {post.jd} </div>
                                    <div> <b>Salary: </b>{post.salary} </div>
                                    <div> <b>Posted by: </b>{post.hr} </div>
                                    <div> <b>Contact Us: </b>{post.contact}  </div>
                                    <div> <b>Mail Us: </b>{post.email}  </div> 
                                    <div> <b>Applicants: </b> {post.applicants.length} </div>
                                </Paper>
                                <Button variant="outlined" style={{border:"none",margin:"5px",cursor:"pointer"}} onClick={(event)=> this.setId(post._id,event)} > Apply Now </Button>
                            </Paper>
                        )
                    }
               </div>
            </div>
        )
    }
}

export default Jobs