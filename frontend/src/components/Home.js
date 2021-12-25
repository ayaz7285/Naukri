import React from 'react'
import { Button,Paper } from '@mui/material'
import {Link} from 'react-router-dom'

function Home() {
    return (
        <div>
            <div style={{display:"flex",width:"90%",height:"500px",margin:" 70px auto"}}>
                <div style={{width:"40%",height:"100%",fontSize:"50px",paddingTop:"150px",fontFamily:"Ubuntu"}}>
                    <div>Welcome to your</div>
                    <div>professional community.</div>
                </div>
                <div style={{width:"60%",height:"100%"}}>
                    <img src="image1.png" style={{width:"97%",height:"100%",marginLeft:"20px",borderRadius:"10px"}}/>
                </div>
            </div>
            <Paper elevation={5} style={{display:"flex",width:"90%",height:"250px",margin:"30px auto"}}>
                <div style={{width:"70%",fontSize:"40px",marginTop:"60px",fontFamily:"Ubuntu"}}>
                    <div> Explore topics you </div>
                    <div> are interested in </div>
                </div>
                <Button variant='outlined' style={{height:"fit-content",marginTop:"100px"}}> <Link to="/posts"> Explore More </Link> </Button>
            </Paper>
            <Paper elevation={5} style={{display:"flex",width:"90%",height:"250px",margin:"30px auto"}}>
                <div style={{width:"70%",fontSize:"40px",marginTop:"60px",fontFamily:"Ubuntu"}}>
                    <div> Find the right job or </div>
                    <div> internship for you </div>
                </div>
                <Button variant='outlined' style={{height:"fit-content",marginTop:"100px"}}> <Link to="/jobs"> Find Jobs </Link> </Button>
            </Paper>
            <Paper elevation={5} style={{display:"flex",width:"90%",height:"250px",margin:"30px auto"}}>
                <div style={{width:"70%",fontSize:"40px",marginTop:"60px",fontFamily:"Ubuntu"}}>
                    <div> Update your profile and </div>
                    <div> show case your skills </div>
                </div>
                <Button variant='outlined' style={{height:"fit-content",marginTop:"100px"}}> <Link to="/userinfo"> Your Profile </Link> </Button>
            </Paper>
            <Paper elevation={5} style={{display:"flex",width:"90%",height:"250px",margin:"30px auto"}}>
                <div style={{width:"70%",fontSize:"40px",marginTop:"60px",fontFamily:"Ubuntu"}}>
                    <div> Build a professional resume </div>
                    <div> to stand out from the rest </div>
                </div>
                <Button variant='outlined' style={{height:"fit-content",marginTop:"100px"}}> <Link to="/resume"> Build Resume </Link> </Button>
            </Paper>
            <Paper elevation={5} style={{display:"flex",width:"90%",height:"250px",margin:"30px auto"}}>
                <div style={{width:"70%",fontSize:"40px",marginTop:"60px",fontFamily:"Ubuntu"}}>
                    <div> Post your job for </div>
                    <div> millions of people to </div>
                    <div> see </div>
                </div>
                <Button variant='outlined' style={{height:"fit-content",marginTop:"100px"}}> <Link to="/addjob"> Post Job </Link> </Button>
            </Paper>
        </div>
    )
}

export default Home
