import { FaTwitter, FaInstagram, FaGithub } from 'react-icons/fa'

import './Footer.css'

function Footer() {
    return (
        <div className="containerFooter">
        <footer className="footer">
            <ul className="social_list">
              <a href="https://twitter.com/f3nix__" target="_blank"><li><FaTwitter /></li></a>
              <a href="https://instagram.com/pedro_otavio.nog" target="_blank"><li><FaInstagram /></li></a>
              <a href="https://github.com/OtavioNog" target="_blank"><li><FaGithub /></li></a>
            </ul>
            <p className="copyright">Pedro Otavio &copy; Since <span>2021</span></p>
        </footer>
        </div>
    )
}

export default Footer