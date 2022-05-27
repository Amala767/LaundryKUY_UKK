import React from "react"
import {Link} from "react-router-dom"
import "./style.css"



class Navbar extends React.Component{
    Logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        window.location = "/login"
    }
    render(){
        return(
            


            <div className="navbar navbar-expand-lg  navbar-dark">
                <label className="navbar-brand logo">
                    Laundry.kuy
                </label>

                {/* show and hide menu */}
                <button className="navbar-toggler" data-toggle="collapse"
                data-target="#menu">
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* menu */}
                <div id="menu" className="navbar-collapse collpase">
                    <ul className="navbar-nav mr-2">
                        <li className="nav-item">
                            <a>
                            <Link to="/" className="nav-link ">
                                Home
                            </Link></a>
                        </li>
                        <li className="nav-item">
                            <a>
                            <Link to="/member" className="nav-link ">
                                Member
                            </Link></a>
                        </li> 
                        {this.props.role === "admin" ? (
                        <li className="nav-item">
                            <a>
                            <Link to="/user" className="nav-link ">
                                User
                            </Link></a>
                        </li>
                        ) : null}
                        {this.props.role === "admin" ? (
                        <li className="nav-item">
                            <a>
                            <Link to="/paket" className="nav-link ">
                                Paket
                            </Link></a>
                        </li>
                        ) : null}
                        
                        <li className="nav-item">
                            <a>
                            <Link to="/transaksi" className="nav-link ">
                                Transaksi
                            </Link></a>
                        </li>
                        <li className="nav-item">
                            <a>
                            <Link className="nav-link " onClick={() => this.Logout()}>
                                Logout
                            </Link></a>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}
export default Navbar;
