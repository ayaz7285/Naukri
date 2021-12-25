import React, {useEffect,useState} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Paper from '@mui/material/Paper'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Avatar from '@mui/material/Avatar';
import Like from '@mui/icons-material/ThumbUpAltOutlined';
import Dislike from '@mui/icons-material/ThumbDownAltOutlined';

function Profileposts() {
    const { name } = useParams()
    const [posts,setPosts] = useState([])
    useEffect(()=>{
        getData()
    },[])

    const getData = ()=>
    {
        axios.get(`http://localhost:8080/posts/${name}`) 
        .then(res=>{
            console.log("response data",res.data);
            setPosts(res.data)
            // console.log("after setPosts",posts);
        })
        .catch(error=>{
            console.log(error);
        })
    }

    return(
        <div>
           <h1 style={{padding:"30px"}}> {`Posts by ${name.toUpperCase()}`} </h1>
           <div>
                {
                    posts.map(post=>
                        <Paper elevation={5} sx={{width:"70%",margin:"10px auto",textAlign:"justify",padding:"10px"}}>
                            <div style={{display:"flex"}}><Avatar src={post.image} style={{margin:"10px 10px"}} /><div style={{paddingTop:"7px",paddingLeft:"7px",fontWeight:"bold"}}>{post.name.toUpperCase()}  <div style={{fontSize:"15px",fontWeight:"normal"}}> {post.date} </div>  </div></div>
                            <Paper elevation={3} style={{padding:"10px 10px",margin:"5px"}}>{post.info}</Paper>
                            <Accordion>
                            <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            >
                            <Typography>Comments</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                            <Typography>
                                {
                                    post.comments.map(x=>
                                        <Paper elevation={4} sx={{margin:"5px",padding:"5px"}}>
                                        <div style={{display:"flex"}}><Avatar src={x.image} sx={{margin:"10px"}}/><div style={{paddingTop:"10px",fontWeight:"bold"}}>{x.name.toUpperCase()}  <div style={{fontSize:"15px",fontWeight:"normal"}}> {x.date} </div>  </div></div>             
                                        <div style={{paddingTop:"5px",fontsize:"10px"}}>{x.comment}</div>
                                        </Paper>
                                    )
                                }
                            </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <div style={{display:"flex"}}>
                            <Like style={{margin:"5px"}}/>
                            <div style={{width:"10px",margin:"5px"}}>{post.likes}</div>
                            <Dislike style={{margin:"5px"}}/>
                            <div style={{width:"10px",margin:"5px"}}>{post.dislikes}</div>
                        </div>
                        </Paper>
                    )
                }
           </div>
        </div>
    )
}

export default Profileposts