import React, {useEffect,useState} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import {Link} from 'react-router-dom'
import Avatar from '@mui/material/Avatar';
import { TextField } from '@mui/material'


function Roles() {
    const { role } = useParams()
    const [user, setUser] = useState({})
    const [search, setSearch] = useState("")
    const [list,setList] = useState([])
    useEffect(()=>{
        getData()
    },{})
    const getData = ()=>
    {
        const name = localStorage.getItem("token")
        axios.get(`http://localhost:8080/profile/${name}`) 
        .then(res=>{
            console.log("user data",res.data);
            const data = res.data
            setUser(data)
        })
        .catch(error=>{
            console.log(error);
        })

        axios.get(`http://localhost:8080/searchjobs/${role}`) 
        .then(res=>{
            console.log("job roles data",res.data);
            const data = res.data
            setList(data)
        })
        .catch(error=>{
            console.log(error);
        })
    }

    const enterRole = (event) =>{
        setSearch(event.target.value)
    }


    const setId = (id,event) => {
        console.log(id)
        const name = localStorage.getItem("token")
        const JSON = {
            id:id,
            name:user.name,
            image:user.image,
            resume:user.resume
        };
        if(name)
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



    return (
        <div>
            <div style={{width:"40%",margin:"30px auto",border:"1px solid black",padding:"20px"}}>
                   <h1>Search Jobs Based on Roles</h1> 
                   <TextField
                    id="outlined"
                    label="Enter Role"
                    style={{width:"90%"}}
                    value={search} 
                    onChange= {enterRole}
                    />
                    <Button variant="outlined" sx={{width:"90%",margin:"15px"}}> <Link to={`/jobs/${search}`}>  Search </Link> </Button>
            </div>
            <h1> {role} Jobs </h1>
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
                                 <Button variant="outlined" style={{border:"none",margin:"5px",cursor:"pointer"}} onClick={(event)=> setId(post._id,event)} > Apply Now </Button> 
                            </Paper>
                        )
                    }
               </div>
        </div>
    )
}

export default Roles
