import * as React from 'react';
import axios from 'axios'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
import { Component } from 'react'
import {Navigate} from 'react-router-dom'

class Addjob extends Component {
    constructor(props) {
        super(props)
        
        const token = localStorage.getItem("company")
        let loggedIn = false
        if(token) loggedIn = true
        else{
            alert("Login as Recruiter to post a job")
        }
        this.state = {
            name:token,
            image:"",
            email:"",
            contact:"",
            role:"",
            jd:"",
            salary:"",
            hr:"",
            successmessage: "",
            errorMessage: "",
            loggedIn
        }
    }
    
    componentDidMount()
    {
        axios.get(`http://localhost:8080/company/profile/${this.state.name}`)
            .then(response=> {
                console.log("company info",response.data)
                this.setState({image:response.data.image})
            })
    }


    enterEmail = (event) =>{
        this.setState({
            email:event.target.value
        })
    }
    enterContact = (event) =>{
        this.setState({
            contact:event.target.value
        })
    }
    enterRole = (event) =>{
        this.setState({
            role:event.target.value
        })
    }
    enterJD = (event) =>{
        this.setState({
            jd:event.target.value
        })
    }
    enterSalary = (event) =>{
        this.setState({
            salary:event.target.value
        })
    }
    enterHR = (event) =>{
        this.setState({
            hr:event.target.value
        })
    }
    addJob = () => {
        let d = new Date()
        let date = d.toDateString()
        var formJSON = {
            name: this.state.name,
            image:this.state.image,
            email:this.state.email,
            contact:this.state.contact,
            role:this.state.role,
            jd:this.state.jd,
            salary:this.state.salary,
            hr:this.state.hr,
            date:date
        };
        console.log(formJSON)
        axios
        .post('http://localhost:8080/addjob', formJSON)
        .then(response => {
            this.setState({successmessage: response.data.message, errorMessage: ""})
            console.log("Data from backend", response.data);
        }).catch(error => {
            if(error.response){
                this.setState({successmessage: "", errorMessage: error.response.data.message})
            }else{
                this.setState({successmessage: "", errorMessage: error.message})
            }
        })
    }
    handleSubmit=(event)=>{
                // alert(`form submitted by ${this.state.username}`)
                console.log("username",this.state.username)
                event.preventDefault()
            }


    render() {
        if(this.state.loggedIn == false){
            return <Navigate to = "/companylogin"></Navigate>
        }
        return (
            <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
            style={{margin:"5vh"}}
            >
            <form style={{border:"2px solid black",borderRadius:"4px",width:"70%",height:"fit-content" ,margin:"auto",backgroundColor:"white"}} onSubmit = {this.handleSubmit}>
                <h2 style={{marginTop:"15px",marginBottom:"15px"}}>Create New Job</h2>
                <TextField
                required
                id="outlined-required"
                label="Name of HR"
                style={{width:"90%"}}
                value={this.state.hr} 
                onChange= {this.enterHR}
                />
                <TextField
                required
                id="outlined-required"
                label="Email"
                style={{width:"90%"}}
                value={this.state.email} 
                onChange= {this.enterEmail}
                />
                <TextField
                required
                id="outlined-required"
                label="Contact"
                style={{width:"90%"}}
                value={this.state.contact} 
                onChange= {this.enterContact}
                />
                <TextField
                required
                id="outlined-required"
                label="Role"
                style={{width:"90%"}}
                value={this.state.role} 
                onChange= {this.enterRole}
                />
                <TextField
                required
                id="outlined-required"
                label="Salary"
                style={{width:"90%"}}
                value={this.state.salary} 
                onChange= {this.enterSalary}
                />
                <TextField
                id="outlined-multiline-static"
                label="Enter Job Description"
                multiline
                rows={7}
                style={{width:"90%"}}
                value={this.state.jd} 
                onChange= {this.enterJD}
                />

                <div style={{marginTop:"13px",marginBottom:"13px"}}>
                    <Button variant="outlined" type="submit" style={{width:"90%"}} onClick= {this.addJob}>Create Job</Button>
                </div>
                <p>{this.state.successmessage}</p>
                <p>{this.state.errorMessage}</p>
            </form>
            </Box>
        )
    }
}

export default Addjob