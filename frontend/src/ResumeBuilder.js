import React, { Component } from 'react'
import ReactToPrint from 'react-to-print';
import Button from '@material-ui/core/Button'
import Resume from './components/Resume'

export class ResumeBuilder extends Component {
    render() {
        return (
            <div>
                <Resume ref={el => (this.componentRef = el)}/>    
                <ReactToPrint
                trigger={() => {
                    
                    return <a href="#" style={{textDecoration:"none"}}> <Button variant="outlined" style={{margin:"20px"}}> Print this out! </Button> </a>;
                }}
                content={() => this.componentRef}
                />
            </div>
        )
    }
}

export default ResumeBuilder
