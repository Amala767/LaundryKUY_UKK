import React from "react"
import {Link} from "react-router-dom"
import "./style.css"



class Navbar extends React.Component{
    Logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("admin")
        window.location = "/login"
    }
    render(){
        return(
            
            <div id="navbar navbar-expand-lg  navbar-dark">
                <a className="navbar-brand text-dark">
                    Moklet Laundry
                </a>

                {/* show and hide menu */}
                <button className="navbar-toggler" data-toggle="collapse"
                data-target="#menu">
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* menu */}
                <div id="menu" className="navbar-collapse collpase">
                    <ul className="navbar-nav mr-2">
                        <li className="nav-item">
                            <Link to="/" className="nav-link text-dark">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/Member" className="nav-link text-dark">
                                Member
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/User" className="nav-link text-dark">
                                User
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/Paket" className="nav-link text-dark">
                                Paket
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/Transaksi" className="nav-link text-dark">
                                Transaksi
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-dark" onClick={() => this.Logout()}>
                                Logout
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}
export default Navbar;
