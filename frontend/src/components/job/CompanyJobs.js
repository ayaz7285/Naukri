import React, { Component } from 'react'
import axios from 'axios'
import Paper from '@mui/material/Paper'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Avatar from '@mui/material/Avatar';
import {Link} from 'react-router-dom'
import Delete from '@mui/icons-material/DeleteOutlineOutlined';
import Button from '@mui/material/Button'

export class CompanyJobs extends Component {
    constructor(props) {
        super(props)
        let token = localStorage.getItem("company")
        this.state = {
             list:[],
             name:token
        }
    }
    
    componentDidMount()
    {
        axios.get(`http://localhost:8080/jobs/${this.state.name}`) 
        .then(res=>{
            console.log("response data",res.data);
            this.setState({list: res.data});
        })
        .catch(error=>{
            console.log(error);
        })
    }

    setId(id,event){
        console.log(id)
        const JSON = {
            id:id
        };
        axios
        .post('http://localhost:8080/deleteJob', JSON)
        .then(response => {
            console.log("Data from backend", response.data);
        })
    }


    render() {
        const {list} = this.state
        return (
            <div>
               <h1 style={{padding:"30px"}}>Jobs You Created</h1>
               <div>
                    {
                        list.map(post=>
                            <Paper elevation={5} sx={{width:"70%",margin:"10px auto",textAlign:"justify",padding:"10px"}}>
                                <div style={{display:"flex"}}><Avatar src={post.image} style={{margin:"5px 10px"}} /><div style={{paddingTop:"7px",paddingLeft:"7px",fontWeight:"bold"}}>{post.name.toUpperCase()}  <div style={{fontWeight:"normal"}} >{post.date}</div>  </div></div>
                                <Paper elevation={3} style={{padding:"10px 10px",margin:"5px"}}>
                                    <div> <b>Role: </b> {post.role} </div>
                                    <div> <b>Job Description:</b> {post.jd} </div>
                                    <div> <b>Salary: </b>{post.salary} </div>
                                    <div> <b>Posted by: </b>{post.hr} </div>
                                    <div> <b>Contact Us: </b>{post.contact}  </div>
                                    <div> <b>Mail Us: </b>{post.email}  </div> 
                                </Paper>
                                <Accordion>
                                <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                >
                                <Typography>Applicants: {post.applicants.length} </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                <Typography>
                                    {
                                        post.applicants.map(x=>
                                            <Paper elevation={4} sx={{margin:"5px",padding:"5px"}}>
                                            <div style={{display:"flex"}}>
                                                <Avatar src={x.image} sx={{margin:"10px 10px"}}/>
                                                <div style={{paddingTop:"15px",fontWeight:"bold"}}><Link to={`/profile/${x.name}`} style={{color:"black",textDecoration:"none"}}>  {x.name.toUpperCase()}  </Link></div> 
                                                <div style={{marginTop:"10px",marginLeft:"10px",fontsize:"10px"}}> <Button variant="outlined"> <a href={x.resume} target="_blank"> Resume </a> </Button> </div>
                                            </div>             
                                            
                                            </Paper>
                                        )
                                    }
                                </Typography>
                                </AccordionDetails>
                            </Accordion>
                            <div style={{display:"flex"}}>
                                <span style={{marginTop:"10px"}}> Delete Job </span>
                                <button style={{border:"none",margin:"5px",cursor:"pointer"}} onClick={(event)=> this.setId(post._id,event)} > <Delete style={{margin:"5px"}}/> </button>
                            </div>
                            </Paper>
                        )
                    }
               </div>
            </div>
        )
    }
}

export default CompanyJobs