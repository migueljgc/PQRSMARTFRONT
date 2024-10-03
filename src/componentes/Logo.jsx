import logo from '/src/images/logo-foot.png';
import './Logo.css'

function Logo() {
    return (
        <div className="logo">
            <img src={logo} alt="Logo" className="logo-img" />
        </div>
    );
}

export default Logo;