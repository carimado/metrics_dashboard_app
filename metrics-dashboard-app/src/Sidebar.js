import './Sidebar.css'
import logo from './img/logo.jpg'
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import Groups2RoundedIcon from '@mui/icons-material/Groups2Rounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded';
import ChatRoundedIcon from '@mui/icons-material/ChatRounded';
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';
import { Typography } from '@mui/material';

import { useNavigate } from 'react-router-dom';

export default function Sidebar() {
  let navigate = useNavigate()
  const handleLogout = () => {
    sessionStorage.removeItem('Auth Token')
    navigate('/signin')
  }
  return (
      <div className="sidebar">
          <div className="sidebar__header">
              <img src={logo} alt="" />
              <p>Welcome back, <br></br><span className='username'>Clarence! </span><span className="wave">👋</span></p>
          </div>
          <div className="sidebar__body">
              <div className="sidebar__body__item">
                <Typography sx={{ display: 'flex', alignItems: 'center'}}>
                  <DashboardRoundedIcon fontSize='small'/>
                  <p>Dashboard</p>
                </Typography>
                <Typography sx={{ display: 'flex', alignItems: 'center'}}>
                  <Groups2RoundedIcon fontSize='small' />
                  <p>Team</p>
                </Typography>
                <Typography sx={{ display: 'flex', alignItems: 'center'}}>
                  <PersonRoundedIcon fontSize='small' />
                  <p>Individual</p>
                </Typography>
                <Typography sx={{ display: 'flex', alignItems: 'center'}}>
                  <MenuBookRoundedIcon fontSize='small' />
                  <p>Resources</p>
                </Typography>
                <Typography sx={{ display: 'flex', alignItems: 'center'}}>
                  <ChatRoundedIcon fontSize='small' />
                  <p>Chat</p>
                </Typography>
              </div>
          </div>
          <div className="sidebar__footer">
            <Typography sx={{ display: 'flex', alignItems: 'center'}}>
              <ExitToAppRoundedIcon fontSize='small' />
              <button onClick={handleLogout}>Log out</button>
            </Typography>
          </div>
      </div>  
  );
}


