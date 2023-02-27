import './Sidebar.css'
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import Groups2RoundedIcon from '@mui/icons-material/Groups2Rounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded';
import ChatRoundedIcon from '@mui/icons-material/ChatRounded';
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';
import { useNavigate } from 'react-router-dom';
import logo from './img/logo.jpg'

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
                  <DashboardRoundedIcon fontSize='small' />
                  <p>Dashboard</p>
                  <Groups2RoundedIcon fontSize='small' />
                  <p>Team</p>
                  <PersonRoundedIcon fontSize='small' />
                  <p>Individual</p>
                  <MenuBookRoundedIcon fontSize='small' />
                  <p>Resources</p>
                  <ChatRoundedIcon fontSize='small' />
                  <p>Chat</p>
              </div>
          </div>
          <div className="sidebar__footer">
            <ExitToAppRoundedIcon fontSize='small' />
            <button onClick={handleLogout}>Logout</button>
          </div>
      </div>  
  );
}


