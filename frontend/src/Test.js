// import React, { Component } from 'react'
// import axios from 'axios'
// class Test extends Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//              image:null,
//              user:false
//         }
//     }
//     enterImage = (event)=>{
//         this.setState({image:event.target.files[0]})
//         console.log(event.target.files[0])
//     }

//     upload = ()=>
//     {
//         var fd = new FormData()
//         fd.append("image",this.state.image)
//         fd.append("name","Ayaz")
//         axios
//         .post('http://localhost:8080/uploadImage', fd)
//         .then(res=>console.log(res.data))
//     }

//     render() {
//         const url = "http://localhost:8080/img4.jpg"
//         if(url)
//         return (
//             <div style={{margin:"50px",width:"80%",border:"2px solid black"}}>
//                 <img src = {url} style={{height:"500px",width:"500px",borderRadius:"50%"}}/>
//                 <input type = "file" id="file" onChange = {this.enterImage} style={{display:"none"}}/>
//                 <label for="file"><img src = {url} style={{height:"500px",width:"500px",borderRadius:"50%"}}/></label>
//                 <button onClick = {this.upload}>Upload</button>
//             </div>
//         )
//     }
// }

// export default Test


import React, { Component } from 'react'
import axios from 'axios'
class Test extends Component {
    constructor(props) {
        super(props)
        this.state = {
             resume:null,
             user:false
        }
    }
    enterResume = (event)=>{
        this.setState({resume:event.target.files[0]})
        console.log(event.target.files[0])
    }

    upload = ()=>
    {
        var fd = new FormData()
        fd.append("resume",this.state.resume)
        fd.append("name","ayaz")
        axios
        .post('http://localhost:8080/uploadResume', fd)
        .then(res=>console.log(res.data))
    }

    render() {
        return (
            <div style={{margin:"50px",width:"80%",border:"2px solid black"}}>
                <input type = "file" id="file" onChange = {this.enterResume}/>
                <button onClick = {this.upload}>Upload</button>
            </div>
        )
    }
}

export default Test

