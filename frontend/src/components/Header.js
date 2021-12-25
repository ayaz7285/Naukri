import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import {Link} from 'react-router-dom'
import Login from '@mui/icons-material/Login';

export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: "center",justifyContent:"space-between",textAlign: 'center' ,backgroundColor:"#5e60ce",height:"8vh"}} className="container-fluid">
        <div>
        <span style={{margin:"10px",fontSize:"30px"}}><Link to="/" style={{color:"white",textDecoration:"none",fontWeight:"bold",fontFamily:"sans-serif"}}>Naukri</Link></span>
        <span style={{margin:"10px",fontSize:"20px"}}><Link to="/posts" style={{color:"white",textDecoration:"none",fontFamily:"sans-serif"}}>Posts</Link></span>
        <span style={{margin:"10px",fontSize:"20px"}}><Link to="/jobs" style={{color:"white",textDecoration:"none",fontFamily:"sans-serif"}}>Jobs</Link></span>
        <span style={{margin:"10px",fontSize:"20px"}}><Link to="/dashboard" style={{color:"white",textDecoration:"none",fontFamily:"sans-serif"}}>Recruit</Link></span>
        </div>
        
        <Tooltip title="Account settings" style={{padding:"5px"}}>
          <IconButton onClick={handleClick} size="small" sx={{ ml: 2 ,marginRight:"10px"}}>
            <Avatar sx={{ width: 32, height: 32 }}></Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>
          <Avatar /> <Link to={`/userinfo`} style={{textDecoration:"none",color:"black"}}>Your Account</Link>
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <Login fontSize="small" />
          </ListItemIcon>
          <Link to={`/login`} style={{textDecoration:"none",color:"black"}}>Login</Link>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          <Link to={`/logout`} style={{textDecoration:"none",color:"black"}}>Logout</Link>
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}