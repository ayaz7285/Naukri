const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const cors = require('cors')
const mongoose = require('mongoose')
app.use(express.json());
app.use(cors());
app.use(express.urlencoded());
app.use(fileUpload());

app.use(express.static('public'))

mongoose.connect("mongodb://127.0.0.1:27017/naukri",{
    useNewURLParser:true,
    useUnifiedTopology:true
},()=>{console.log("connected to db")});

/////////////////////////////////////////////////////   User APIs///////////////////////////////////////////////////////////
const userSchema = new mongoose.Schema({
  name:String,
  email:String,
  password:String,
  contact:String,
  bio:String,
  image:String,
  education:String,
  experience:String,
  skills:String,
  resume:String,
  friends:[
      {
          name:String,
          image:String
      }
  ]
})

const User = mongoose.model("User",userSchema);


app.post("/login",(req,res)=>{
  const {email,password} = req.body
  console.log("data entered",req.body)
  User.findOne({email:email},(err,user)=>{
      if(user){
          if(password==user.password){
              res.send({message:"login sucees",user:user})
          }else{
              res.send({message:"Wrong credentials"})
          }
      }else{
          res.send({message:"User not registered"})
      }
  })
})

app.post("/register",(req,res)=>{
  const {name,email,password,contact,bio,education,experience,skills} = req.body
  const image = "http://localhost:8080/user.png";
  const resume = "http://localhost:8080/dummy.html"
  console.log("data entered",req.body)
  User.findOne({email:email},(err,user)=>{
      if(user){
          res.send({message:"user already exists"})
      }else{
          let friends=[]
          const user = new User({name,email,password,contact,bio,image,education,experience,skills,resume,friends})
          user.save(err=>{
              if(err){
                  res.send(err)
              }else{
                  res.send({message:"register success",user:user})
              }
          })
      }
  })
})


//get user profile info
app.get("/profile/:name",(req,res)=>{
  const name = req.params.name
  User.findOne({name:name},(err,profile)=>{
      if(profile){
          res.send(profile)
      }else{
          res.send(err)
      }
  })
})


//add friend to friend list
app.post("/addfriend",(req,res)=>{
  const {name,friendName,friendImage} = req.body
  const friend = {
      name:friendName,
      image:friendImage
  }
  console.log("add to friendList",req.body)
  User.findOne({name:name},(err,user)=>{
      if(user){
          user.friends.push(friend)
          user.save(err=>{
              if(err){
                  res.send(err)
              }else{
                  res.send({message:`${friendName} added to your friendList`,user:user})
              }
          })
      }else{
          res.send("user not found, unable to add friend")
      }
  })
})


//Uploading Profile Pic
app.post("/uploadImage",(req,res)=>{
  const image = req.files.pp
  console.log("user",req.body.name)
  const name = req.body.name;
  image.mv('public/'+image.name, function(err) {
  if (err)
    return res.status(500).send(err);

  console.log("image successfully uploaded",image)

  User.findOne({name:name},(err,user)=>{
      if(user){
          user.image = "http://localhost:8080/" + image.name
          user.save(err=>{
                  res.send({message:"profile pic updated",user:user})
          })
      }else{
          res.send("user not found, unable to upload profile pic")
      }
      })

  });


})

//Uploading Resume
app.post("/uploadResume",(req,res)=>{
  const resume = req.files.resume
  console.log("user",req.body.name)
  const name = req.body.name;
  resume.mv('public/'+resume.name, function(err) {
  if (err)
    return res.status(500).send(err);

  console.log("image successfully uploaded",resume)

  User.findOne({name:name},(err,user)=>{
      if(user){
          user.resume = "http://localhost:8080/" + resume.name
          user.save(err=>{
                  res.send({message:"resume uploaded",user:user})
          })
      }else{
          res.send("user not found, unable to upload resume")
      }
      })

  });


})

////////////////////////////////////////////////////////////   Posts APIs   ////////////////////////////////////////////////////
const postSchema = new mongoose.Schema({
  name:String,
  image:String,
  likes:Number,
  dislikes:Number,
  info:String,
  date:String,
  comments:[
      {
          name:String,
          image:String,
          date:String,
          comment:String
      }
  ]
})

const Post = mongoose.model("Post",postSchema);

//add post
app.post("/addpost",(req,res)=>{
  const {name,image,info,date} = req.body;
  console.log("add post",req.body)
  let likes=0
  let dislikes=0
  let comments=[]
  const newPost = new Post({name,image,likes,dislikes,info,date,comments})
  newPost.save(err=>{
      if(err){
          res.send(err)
      }else{
          res.send({message:"post added",post:newPost})
      }
  })
})

//add comment to a certain post
app.post("/addcomment",(req,res)=>{
  const {id,name,image,info,date} = req.body;
  console.log("add comment",req.body)
  const comment = {
      name:name,
      image:image,
      date:date,
      comment:info
  }
  Post.findOne({_id:id},(err,post)=>{
      if(post){
          post.comments.push(comment)
          post.save(err=>{
              if(err){
                  res.send(err)
              }else{
                  res.send({message:`comment added`,post:post})
              }
          })
      }else{
          res.send("post not found, unable to add comment")
      }
  })
})


//update like dislike
app.post("/like_dislike",(req,res)=>{
  const {id,name,likes,dislikes} = req.body
  console.log("likes/dislikes",req.body)
  Post.findOne({_id:id},(err,post)=>{
      if(post && name !==post.name ){     //the second conditon ensures that the user who posted, doesnot likes/dislikes his own post. That means a user can only like others posts not his own.
          post.likes+=Number(likes)
          post.dislikes+=Number(dislikes)
          post.save(err=>{
              if(err){
                  res.send(err)
              }else{
                  res.send({message:`likes dislikes added`,post:post})
              }
          })
      }else{
          res.send("post not found, unable to update likes/dislikes")
      }
  })
})

//get all posts present in DB
app.get("/posts",(req,res)=>{
  Post.find({},(err,post)=>{
      if(post)
      {
          res.send(post)
      }else{
          res.send(err)
      }
  })
})

//get all posts of a particular user
app.get("/posts/:name",(req,res)=>{
  const name = req.params.name
  Post.find({name:name},(err,post)=>{
      if(post)
      {
          res.send(post)
      }else{
          res.send(err)
      }
  })
})

//deleting post
app.post("/deletePost",(req,res)=>{
  const {id} = req.body
  console.log(req.body)
  Post.findOne({_id:id},(err,post)=>{
      if(post)
      {
          post.delete()
          res.send("Post deleted")
      }else{
          res.send("Post not found")
      }
  })
})

/////////////////////////////////////////////////// Company APIs  ////////////////////////////////////////////////////////////
const companySchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    contact:String,
    bio:String,
    image:String,
    approved:String
  })
  
  const Company = mongoose.model("Company",companySchema);

  // Company Login
  app.post("/company/login",(req,res)=>{
    const {email,password} = req.body
    console.log("company login data",req.body)
    Company.findOne({email:email},(err,company)=>{
        if(company){
            if(password==company.password){
                res.send({message:"login success",company:company})
            }else{
                res.send({message:"Wrong credentials"})
            }
        }else{
            res.send({message:"Company not registered"})
        }
    })
  })
  
  // Register as a new company
  app.post("/company/register",(req,res)=>{
    const {name,email,password,contact,bio} = req.body
    const image = "http://localhost:8080/company.png";
    const approved = "false"
    console.log("company register data",req.body)
    Company.findOne({email:email},(err,company)=>{
        if(company){
            res.send({message:"Company already exists"})
        }else{
            const company = new Company({name,email,password,contact,bio,image,approved})
            company.save(err=>{
                if(err){
                    res.send(err)
                }else{
                    res.send({message:"register success",company:company})
                }
            })
        }
    })
  })

  //Update profile image of company
  app.post("/company/uploadImage",(req,res)=>{
    const image = req.files.image
    console.log("company",req.body.name)
    const name = req.body.name;
    image.mv('public/'+image.name, function(err) {
    if (err)
      return res.status(500).send(err);
  
    console.log("image successfully uploaded",image)
  
    Company.findOne({name:name},(err,company)=>{
        if(company){
            company.image = "http://localhost:8080/" + image.name
            company.save(err=>{
                    res.send({message:"profile pic updated",company:company})
            })
        }else{
            res.send("Company not found, unable to upload profile pic")
        }
        })
  
    });
  })

  // Get the profile of a particular company
  app.get("/company/profile/:name",(req,res)=>{
    const name = req.params.name
    Company.findOne({name:name},(err,profile)=>{
        if(profile){
            res.send(profile)
        }else{
            res.send(err)
        }
    })
  })
  
//////////////////////////////////////////////////////////  Jobs APIs  /////////////////////////////////////////////////////////

const jobSchema = new mongoose.Schema({
    name:String,
    image:String,
    email:String,
    contact:String,
    role:String,
    jd:String,
    salary:String,
    hr:String,
    date:String,
    applicants:[
        {
            name:String,
            image:String,
            resume:String
        }
    ]
  })
  
  const Job = mongoose.model("Job",jobSchema);

  // Create new Job
  app.post("/addjob",(req,res)=>{
    const {name,image,email,contact,role,jd,salary,hr,date} = req.body;
    console.log("add job",req.body)
    let applicants=[]
    const newJob = new Job({name,image,email,contact,role,jd,salary,hr,date,applicants})
    newJob.save(err=>{
        if(err){
            res.send(err)
        }else{
            res.send({message:"job added",job:newJob})
        }
    })
  })

  //Apply for a job
  app.post("/apply",(req,res)=>{
    const {id,name,image,resume} = req.body;
    console.log("apply for job",req.body)
    const applicant = {
        name:name,
        image:image,
        resume:resume
    }
    Job.findOne({_id:id},(err,job)=>{
        if(job){
            job.applicants.push(applicant)
            job.save(err=>{
                if(err){
                    res.send(err)
                }else{
                    res.send({message:"applied for job successfully",job:job})
                }
            })
        }else{
            res.send("job not found, unable to apply for job")
        }
    })
  })
// get all jobs
  app.get("/jobs",(req,res)=>{
    Job.find({},(err,job)=>{
        if(job)
        {
            res.send(job)
        }else{
            res.send(err)
        }
    })
  })
  
  //get all jobs of a particular user
  app.get("/jobs/:name",(req,res)=>{
    const name = req.params.name
    Job.find({name:name},(err,job)=>{
        if(job)
        {
            res.send(job)
        }else{
            res.send(err)
        }
    })
  })
  
  //get all jobs of a particular role
  app.get("/searchjobs/:role",(req,res)=>{
    const role = req.params.role
    Job.find({role:role},(err,job)=>{
        if(job)
        {
            res.send(job)
        }else{
            res.send(err)
        }
    })
  })

  //delete Job
  app.post("/deleteJob",(req,res)=>{
    const {id} = req.body
    console.log("deleting job",req.body)
    Job.findOne({_id:id},(err,job)=>{
        if(job)
        {
            job.delete()
            res.send("Job deleted")
        }else{
            res.send("Job not found")
        }
    })
  })


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.listen(8080);
console.log('server running on port 8080');


// app.post("/upload",(req,res)=>{
//   const image = req.files.image
//   console.log("user",req.body.user)
//   image.mv('public/'+image.name, function(err) {
//   if (err)
//     return res.status(500).send(err);

//   res.send('File uploaded!');
// });

//  console.log(image)
// })
