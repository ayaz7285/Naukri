import axios from 'axios'
import React, { Component } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {Link,Navigate} from 'react-router-dom'
import Button from '@mui/material/Button'

export class CompanyLogin extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             username:"",
             email:"",
             password:"",
             loggedIn:false,
             successmessage: "",
             errorMessage: ""
        }
    }
    enterUsername = (event) =>{
        this.setState({
            username:event.target.value
        })
    }
    enterEmail = (event) =>{
        this.setState({
            email:event.target.value
        })
    }
    enterPassword = (event) =>{
        this.setState({
            password:event.target.value
        })
    }
    addUser = () => {
        var formJSON = {
            name: this.state.username,
            email: this.state.email,
            password: this.state.password
        };
        console.log(formJSON)
        axios
        .post('http://localhost:8080/company/login', formJSON)
        .then(response => {
            this.setState({successmessage: response.data.message, errorMessage: ""})
            if(response.data.message=="login success")
            {
                localStorage.setItem("company",this.state.username)
                this.setState({loggedIn:true})
            }
            console.log("Data from backend", response.data);
        }).catch(error => {
            if(error.response){
                this.setState({successmessage: "", errorMessage: error.response.data.message})
            }else{
                this.setState({successmessage: "", errorMessage: error.message})
            }
        })
    }

    render() {
        if(this.state.loggedIn==true)
        {
            return <Navigate to="/dashboard"></Navigate>
        }
        return (
        <Box
        component="form"
        sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
        style={{marginBottom:"10%"}}
        >
        <form style={{borderRadius:"4px",width:"40%",height:"fit-content",padding:"20px",margin:"auto",marginTop:"50px", border:"2px solid black"}}>
            <h2 style={{marginTop:"15px",marginBottom:"15px"}}>Login as Recruiter</h2>
            <div style={{marginTop:"10px",marginBottom:"10px"}}>
                <TextField
                required
                id="outlined-required"
                label="Name"
                style={{width:"90%"}}
                name="username"
                value={this.state.username} 
                onChange= {this.enterUsername}
                />
            </div>
            <div style={{marginTop:"10px",marginBottom:"10px"}}>
                <TextField
                required
                id="outlined-email-required"
                label="Email"
                type="email"
                style={{width:"90%"}}
                value={this.state.email} 
                onChange= {this.enterEmail}
                />
            </div>
            <div style={{marginTop:"10px",marginBottom:"10px"}}>
                <TextField
                required
                id="outlined-password-required"
                label="Password"
                type="password"
                style={{width:"90%"}}
                value={this.state.password} 
                onChange= {this.enterPassword}
                />
            </div>
            <div style={{marginTop:"13px",marginBottom:"13px"}}>
                <Button variant="outlined" style={{width:"90%"}} onClick= {this.addUser}>Login</Button>
            </div>
            <p>{this.state.successmessage}</p>
            <div style={{marginTop:"10px",marginBottom:"20px"}}>
            <Link to="/companyregister" style={{textDecoration:"none"}}>Or Create a new Account</Link>
            </div>
        </form>
    </Box>
        )
    }
}

export default CompanyLogin