import logo from '../../../public/covidLogo.png';
import './Navbar.css';

import {Link} from 'react-router-dom'

function Navbar() {
    return (
        <nav className="navbar">
            <div>
                <Link to={"/"}>
                <img src={logo} alt="Logo" />
                </Link>
            </div>
        </nav>
    )
}

export default Navbar