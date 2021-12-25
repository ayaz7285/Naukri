import './App.css';
import Test from './Test';
import ResumeBuilder from './components/resume/ResumeBuilder' 
import {Routes,Route} from 'react-router-dom'
import Home from './components/Home'
import Posts from './components/Posts'
import Header from './components/Header'
import Footer from './components/Footer'
import Userposts from './components/user/Userposts'
import Addpost from './components/user/Addpost'
import Profile from './components/user/Profile'
import Login from './components/user/Login'
import Logout from './components/user/Logout'
import Register from './components/user/Register'
import Userinfo from './components/user/Userinfo';  
import Profileposts from './components/user/Profileposts';  
import CompanyLogin from './components/job/CompanyLogin';
import CompanyDashBoard from './components/job/CompanyDashBoard';
import CompanyLogout from './components/job/CompanyLogout';
import Addjob from './components/job/Addjob';
import CompanyRegister from './components/job/CompanyRegister';
import CompanyJobs from './components/job/CompanyJobs';
import Jobs from './components/job/Jobs'
import Roles from './components/job/Roles'
import CompanyProfile from './components/job/CompanyProfile';
import CompanyProfileJobs from './components/job/CompanyProfileJobs';

function App() {
  return (
    <div className="App">
     <Header/>
     {/* <CompanyLogin/> */}
     <Routes>
       <Route exact path="/" element={<Home/>}/>
       <Route exact path="/posts" element={<Posts/>}/>
       <Route exact path="/login" element={<Login/>}/>
       <Route exact path="/logout" element={<Logout/>}/>
       <Route exact path="/register" element={<Register/>}/>
       <Route exact path="/userinfo" element={<Userinfo/>}/>
       <Route exact path="/userposts" element={<Userposts/>}/>
       <Route exact path="/addpost" element={<Addpost/>}/>
       <Route exact path="/profile/:name" element={<Profile/>}/>
       <Route exact path="/resume" element={<ResumeBuilder/>}/>
       <Route exact path="/profileposts/:name" element={<Profileposts/>}/>
       <Route exact path="/companylogin" element={<CompanyLogin/>}/>
       <Route exact path="/companyregister" element={<CompanyRegister/>}/>
       <Route exact path="/dashboard" element={<CompanyDashBoard/>}/>
       <Route exact path="/companylogout" element={<CompanyLogout/>}/>
       <Route exact path="/companyjobs" element={<CompanyJobs/>}/>
       <Route exact path="/addjob" element={<Addjob/>}/>
       <Route exact path="/jobs" element={<Jobs/>}/>
       <Route exact path="/jobs/:role" element={<Roles/>}/>
       <Route exact path="/companyjobs/:name" element={<CompanyProfileJobs/>}/>
       <Route exact path="/company/:name" element={<CompanyProfile/>}/>
     </Routes>
     <Footer/>
    </div>
  );
}

export default App;
