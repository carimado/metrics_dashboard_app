import './Header.css';
import banner from './img/banner.jpg'

export default function Header() {
    return (
        <div className="header-container">
            {/* <div className="header-banner">
                <img src={banner} alt="" />
            </div> */}
            <div className="header-contents">
                <h1>CX Dashboard</h1>
            </div>
        </div>
    )
}