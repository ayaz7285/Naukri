import * as React from 'react';
import axios from 'axios'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { Component } from 'react';
import {Navigate} from 'react-router-dom'

class CompanyRegister extends Component {
    constructor(props) {
        super(props)
        let loggedIn = false;
        let token = localStorage.getItem("company");
        if(token) loggedIn=true;
        this.state = {
            contact:"",
            errorContactNo:false,
            errorContactNoMessage:"",
            password:"", 
            error:false,
            errorMessage:"",
            username:"",
            email:"",
            bio:"",
            successmessage: "",
            errorMessage: "",
            loggedIn
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
    enterbio = (event) =>{
        this.setState({
            bio:event.target.value
        })
    }
    validatePassword = (event)=>{
        const password = event.target.value;
        var error = this.state.error;
        var errorMessage = this.state.errorMessage;
        this.setState({password:password});
        let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$#!%*?&])[A-Za-z\d@$!%#*?&]{8,}$/;
        let valid = regex.test(password);
        if(valid==false)
        {
            error=true;
            errorMessage="enter correct password";
        }
        else
        {
            error=false;
            errorMessage="";
        }
        this.setState({password:password})
        this.setState({error:error});
        this.setState({errorMessage:errorMessage});
    }

    validateContactNo = (event)=>{
        const contactNo = event.target.value;
        var errorContactNo = this.state.error;
        var errorContactNoMessage = this.state.errorContactNoMessage;
        this.setState({contactNo:contactNo});
        if(contactNo.length!=10)
        {
            errorContactNo=true;
            errorContactNoMessage="enter correct contact no.";
        }
        else
        {
            errorContactNo=false;
            errorContactNoMessage="";
        }
        this.setState({contact:contactNo})
        this.setState({errorContactNo:errorContactNo});
        this.setState({errorContactNoMessage:errorContactNoMessage});
    }

    addUser = () => {
        var formJSON = {
            name: this.state.username,
            email: this.state.email,
            password: this.state.password,
            contact: this.state.contact,
            bio:this.state.bio
        };
        console.log(formJSON)
        axios
        .post('http://localhost:8080/company/register', formJSON)
        .then(response => {
            if(response.data.message === "register success")
            {
                localStorage.setItem("company",this.state.username)
            }
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
            style={{margin:"5vh"}}
            >
            <form style={{border:"2px solid black",borderRadius:"4px",width:"40%",height:"fit-content" ,margin:"auto",backgroundColor:"white"}}>
                <h2 style={{marginTop:"15px",marginBottom:"15px"}}>Register as Recruiter</h2>
                <div style={{marginTop:"10px",marginBottom:"10px"}}>
                    <TextField
                    required
                    id="outlined-required"
                    label="Company Name"
                    style={{width:"90%"}}
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
                    error={this.state.error}
                    helperText={this.state.errorMessage}
                    id="outlined-password-required"
                    label="Password"
                    type="password"
                    style={{width:"90%"}}
                    value={this.state.password}
                    onChange={this.validatePassword}
                    />
                </div>
                <div style={{marginTop:"10px",marginBottom:"10px"}}>
                    <TextField
                    required
                    error={this.state.errorContactNo}
                    helperText={this.state.errorContactNoMessage}
                    id="outlined-required"
                    label="Contact No."
                    style={{width:"90%"}}
                    value={this.state.contact}
                    onChange={this.validateContactNo}
                    />
                </div>
                <div style={{marginTop:"10px",marginBottom:"10px"}}>
                    <TextField
                    id="outlined-multiline-static"
                    label="Bio"
                    multiline
                    rows={3}
                    style={{width:"90%"}}
                    value={this.state.bio} 
                    onChange= {this.enterbio}
                    />
                </div>
                
                <div style={{marginTop:"13px",marginBottom:"13px"}}>
                    <Button variant="outlined" style={{width:"90%"}} onClick= {this.addUser}>Register</Button>
                </div>
                <p>{this.state.successmessage}</p>
                <p>{this.state.errorMessage}</p>
            </form>
            
            </Box>
        )
    }
}

export default CompanyRegister