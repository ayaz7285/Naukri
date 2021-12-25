import React, { Component } from 'react'
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';

class Home extends Component {
    render() {
        return (
            <div className="footer" style={{backgroundColor:"#caf0f8",bottom:"0",width:"100%",height:"fit-content"}}>
              <div className="container">
                <div className="contact us" style={{margin:"3px"}}>Contact Us : 8374104891</div>
                <div className="email" style={{margin:"3px"}}>Mail Us : ayaz.sarwar@gmail.com</div>
                <div className="follow" style={{margin:"3px"}}>Follow us on : 
                  <a href="https://www.instagram.com/" target="_blank" style={{textDecoration:"none",margin:"2px"}}><LinkedInIcon fontSize="small"/></a>
                  <a href="https://www.facebook.com/" target="_blank" style={{textDecoration:"none",margin:"2px"}}> <FacebookIcon fontSize="small"/></a>
                  <a href="https://www.linkedin.com/in/ayaz-sarwar-68397a1b4/" target="_blank" style={{textDecoration:"none",margin:"2px"}}> <InstagramIcon fontSize="small"/> </a>
                </div>
              </div>
            </div>
        )
    }
}

export default Home