import React, {useEffect,useState} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import {Link} from 'react-router-dom'

function CompanyProfile() {
    const { name } = useParams()
    const [company, setCompany] = useState({})
    useEffect(()=>{
        getData()
    },{})
    const getData = ()=>
    {
        axios.get(`http://localhost:8080/company/profile/${name}`) 
        .then(res=>{
            console.log("response data",res.data);
            const data = res.data
            setCompany(data)
        })
        .catch(error=>{
            console.log(error);
        })
    }

    return (
        <div style={{padding:"10px"}}>
        <Paper elevation={5} sx={{width:"80%",margin:"auto",padding:"20px"}}>
        <img src={company.image} style={{height:"30%",width:"30%",borderRadius:"50%"}}/>
        <h1 style={{fontFamily:'Pacifico',margin:"10px"}}> {company.name} </h1>
        <Paper elevation={4} sx={{width:"60%",textAlign:"justify",margin:"auto",padding:"15px"}}>
        <div><b>Email: </b>{company.email}</div>
        <div><b>Contact No.: </b>{company.contact}</div>
        <div><b>Bio: </b>{company.bio}</div>
        <div><b>Naukri Approved: </b>{company.approved}</div>
        </Paper>
        <Button variant="outlined" style={{width:"20%",margin:"20px"}}><Link to = {`/companyjobs/${company.name}`}>View Jobs</Link> </Button>
        </Paper>
    </div>
    )
}

export default CompanyProfile