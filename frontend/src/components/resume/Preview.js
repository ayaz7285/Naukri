import React, { Component } from 'react'
import ReactToPrint from 'react-to-print';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import LanguageIcon from '@material-ui/icons/Language';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';   
import InstagramIcon from '@material-ui/icons/Instagram';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

export class Preview extends Component {

    render() {
        const {values} = this.props;
        return (
            <div style={{minWidth:"1000px"}}>
                <div style={{height:"25vh",backgroundColor:"black",color:"white",width:"90%",margin:"auto",border:"2px solid black"}}>
                    <div style={{fontSize:"70px"}} > {values.firstname}  </div>
                    <div style={{fontSize:"30px",margin:"20px"}} > {values.role}  </div>
                </div>
                <div style={{display:"flex",width:"90%",margin:"auto",height:"fit-content",border:"2px solid black"}}>
                    <div style={{width:"35%",color:"white",backgroundColor:"black",textAlign:"justify",padding:"40px"}}>
                        <div>
                            <div style={{padding:"5px"}}> <EmailIcon color="white" /> <span style={{fontSize:"20px"}}> Email : {values.email} </span>  </div>
                            <div style={{padding:"5px"}}><PhoneIcon color="white"/> <span style={{fontSize:"20px"}}> Contact : {values.phone}  </span> </div>
                            <div style={{padding:"5px"}}><LanguageIcon color="white"/><span style={{fontSize:"20px"}}> Website : {values.website} </span></div>
                            <div style={{padding:"5px"}}><GitHubIcon color="white"/> <span style={{fontSize:"20px"}}>Github : {values.github}</span> </div>
                            <div style={{padding:"5px"}}><LinkedInIcon color="white"/> <span style={{fontSize:"20px"}}>LinkedIn : {values.linkedin}</span> </div>
                            <div style={{padding:"5px"}}><TwitterIcon color="white"/> <span style={{fontSize:"20px"}}>Twitter : {values.twitter}</span> </div>
                            <div style={{padding:"5px"}}><FacebookIcon color="white"/> <span style={{fontSize:"20px"}}>FaceBook : {values.facebook} </span></div>
                            <div style={{padding:"5px"}}><InstagramIcon color="white"/> <span style={{fontSize:"20px"}}>InstaGram : {values.instagram}</span> </div>
                        </div>
                        <br/>
                        <hr></hr>
                        <div style={{margin:"10px"}}>
                            <h2>Skills</h2>
                            <div style={{padding:"5px"}}> {values.skill1} </div>
                            <div style={{padding:"5px"}}> {values.skill2} </div>
                            <div style={{padding:"5px"}}> {values.skill3} </div>
                            <div style={{padding:"5px"}}> {values.skill4} </div>
                            <div style={{padding:"5px"}}> {values.skill5} </div>
                            <div style={{padding:"5px"}}> {values.skill6} </div>
                        </div>
                        <br/>
                        <hr></hr>
                        <div style={{margin:"10px"}}>
                            <h2>Interests</h2>
                            <div style={{padding:"5px"}}> {values.interest1} </div>
                            <div style={{padding:"5px"}}> {values.interest2} </div>
                            <div style={{padding:"5px"}}> {values.interest3} </div>
                            <div style={{padding:"5px"}}> {values.interest4} </div>
                            <div style={{padding:"5px"}}> {values.interest5} </div>
                            <div style={{padding:"5px"}}> {values.interest6} </div>
                        </div>
                    </div>
                        {/* ////////////////////////////////////////////////////////////////////////////////////// */}
                    <div style={{textAlign:"justify",padding:"40px",width:"65%"}}>
                        <div style={{fontSize:"30px",fontWeight:"bold",margin:"5px"}} >Education</div>
                        <div style={{padding:"5px",fontSize:"20px"}}> <b>College: </b>  {values.college} </div>
                        <div style={{padding:"5px",fontSize:"20px"}}> <b>Degree:</b>  {values.qualification1} ( {values.fromyear1} - {values.toyear1} ) </div>
                        <div style={{padding:"5px",fontSize:"20px",wordWrap:"break-word"}}> <b> Description:</b> {values.description1} </div>
                        <br/>
                        <div style={{padding:"5px",fontSize:"20px"}}> <b>School: </b> School:  {values.school} </div>
                        <div style={{padding:"5px",fontSize:"20px"}}> <b> Degree: </b> {values.qualification2} ( {values.fromyear2} - {values.toyear2} ) </div>
                        <div style={{padding:"5px",fontSize:"20px",wordWrap:"break-word"}}> <b>Description: </b>{values.description2} </div>
                        <hr style={{width:"100%"}}/>
                        <div style={{fontSize:"30px",fontWeight:"bold",margin:"5px"}} >Work Experience </div>
                        <div style={{padding:"5px",fontSize:"20px"}}> <b>Company: </b>  {values.institute1} </div>
                        <div style={{padding:"5px",fontSize:"20px"}}> <b>Position:</b>  {values.position1}</div>
                        <div style={{padding:"5px",fontSize:"20px"}}> <b>Duration:</b>  {values.duration1}</div>
                        <div style={{padding:"5px",fontSize:"20px",wordWrap:"break-word"}}> <b> Description:</b> {values.experienceDescription1} </div>
                        <br/>
                        { 
                            values.institute2 !="" ? <div style={{padding:"5px",fontSize:"20px"}}> <b>Company: </b>  {values.institute2} </div> : <div></div>
                        }
                        { 
                            values.position2 !="" ? <div style={{padding:"5px",fontSize:"20px"}}> <b>Position: </b>  {values.position2} </div> : <div></div>
                        }
                        { 
                            values.duration2 !="" ? <div style={{padding:"5px",fontSize:"20px"}}> <b>Duration: </b>  {values.duration2} </div> : <div></div>
                        }
                        { 
                            values.experienceDescription2 !="" ? <div style={{padding:"5px",fontSize:"20px",wordWrap:"break-word"}}> <b>Description: </b>  {values.experienceDescription2} </div> : <div></div>
                        }
                        <hr style={{width:"100%"}}/>
                        <div style={{fontSize:"30px",fontWeight:"bold",margin:"5px"}} >Projects </div>
                        <div style={{padding:"5px",fontSize:"20px"}}> <b>Title: </b> <a href={values.link1} style={{textDecoration:"none",color:"black"}}> {values.title1} </a> </div>
                        <div style={{padding:"5px",fontSize:"20px",wordWrap:"break-word"}}> <b> Description:</b> {values.projectDescription1} </div>
                        <br/>
                        { 
                            values.title2 !="" ? <div style={{padding:"5px",fontSize:"20px"}}> <b>Title: </b>  <a href={values.link1} style={{textDecoration:"none",color:"black"}}> {values.title2} </a> </div> : <div></div>
                        }
                        { 
                            values.projectDescription2 !="" ? <div style={{padding:"5px",fontSize:"20px",wordWrap:"break-word"}}> <b>Description: </b>  {values.projectDescription2} </div> : <div></div>
                        }
                        <br/>
                        { 
                            values.title3 !="" ? <div style={{padding:"5px",fontSize:"20px"}}> <b>Title: </b>  <a href={values.link3} style={{textDecoration:"none",color:"black"}}> {values.title3} </a> </div> : <div></div>
                        }
                        { 
                            values.projectDescription3 !="" ? <div style={{padding:"5px",fontSize:"20px",wordWrap:"break-word"}}> <b>Description: </b>  {values.projectDescription3} </div> : <div></div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default Preview
