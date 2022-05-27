import React from "react"
import axios from "axios"

// import base_url dari file config.js
import { base_url } from "../config.js";

import './login.css';
import loginPic from '../assets/login.png'

{/* <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/material-design-iconic-font/2.2.0/css/material-design-iconic-font.min.css" integrity="sha256-3sPp8BkKUE7QyPSl6VfBByBroQbKxKG7tsusY2mhbVY=" crossorigin="anonymous" /> */}

export default class Home extends React.Component{
    constructor(){
        super()
        this.state = {
            username: "",
            password: "",
            role: "",
            message: "",
            logged: true
        }
    }
    // arrow function -> untuk menjalankan fungsi login
    Login = event => {
        event.preventDefault()
        let sendData = {
            username: this.state.username,
            password: this.state.password,
            role: this.state.role
        }

        let url = base_url + "/auth"

        axios.post(url, sendData)
        .then(res => {
            this.setState({logged: res.data.logged})
            if (this.state.logged) {
                let user = res.data.data
                let token = res.data.token
                localStorage.setItem("user", JSON.stringify(user))
                localStorage.setItem("token", token)
                this.props.history.push("/")
            } else {
                this.setState({message: res.data.message})
            }
        })
        .catch(error => console.log(error))
    }

    render(){
        return(

            // <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
            //     <container>
            //         <row className="justify-content-center">
            //             <col md={8}>
            //                 <cardGroup>
            //                     <card className="p-4">
            //                         <cardBody>
            //                             <form>
            //                                 <h1>Login</h1>
            //                                 <p className="text-medium-empshasis">Sign In To your account</p>
            //                             </form>
            //                         </cardBody>
            //                     </card>
            //                 </cardGroup>
            //             </col>
            //         </row>
            //     </container>
            // </div>


            // <div className="container card mt-5" class="login sticky-bottom" >
            //     <div className="row mt-5">
            //     <div className="col-8 ">
            //         <div class= "picture">
            //         <img src={loginPic} /></div>     
            //     </div>
            //     <div className="col-4 " class="">
            //         <div class="mb-5 text-center">
            //             <h1 class="heading">Login Account</h1>
            //         <div class="mt-5">
            //             { !this.state.logged ? 
            //             (
            //                 <div className="alert alert-danger mt-1">
            //                     { this.state.message }
            //                 </div>
            //             ) : null }
            //             <form onSubmit={ev => this.Login(ev)}>
            //                 {/* username */}
            //                 <input type="text" className="form-control mb-3" class="form mb-5" value={this.state.username}
            //                 onChange={ev => this.setState({username: ev.target.value})} />

            //                 {/* password */}
            //                 <input type="password" className="form-control mb-3" class="form mb-5" value={this.state.password}
            //                 onChange={ev => this.setState({password: ev.target.value})}
            //                 autoComplete="false" />
            //                 <button className="btn btn-primary mb-3" type="submit">
            //                     Sign In
            //                 </button>
            //             </form>
            //         </div></div>
            //     </div>
                
            //     </div>
                

            // </div>




            //batas fix
            <div className="login-form">
            <div class="container pt-5 ">
            <div class="row">
                <div class="col-md-11 mt-60 mx-md-auto">
                    <div class="login-box bg-white pl-lg-5 pl-0">
                            <div class="col-md-6 ">
                                <div class="form-wrap ">
                                    <h4 class="btm-sep pb-3 mb-5 text-white">Login</h4>
                                    { !this.state.logged ? 
                                         (
                                        < div className="alert alert-danger mt-1">
                                        { this.state.message }
                                        </div>
                                        ) : null }
                                    <form onSubmit={ev => this.Login(ev)} class="form" >
                                        <div class="row">
                                            <div class="col-12">
                                                <div class="form-group position-relative">
                                                <input type="text"  class="form-control" placeholder="username" value={this.state.username}  onChange={ev => this.setState({username: ev.target.value})} />
                                                </div>
                                            </div>
                                            <div class="col-12">
                                                <div class="form-group position-relative">
                                                    <span class="zmdi zmdi-email"></span>
                                                    <input type="password" class="form-control" placeholder="password" value={this.state.password} onChange={ev => this.setState({password: ev.target.value})} autoComplete="false" />
                                                </div>
                                            </div>
                                            <div class="col-12 mb-3">
                                                <select
                                                    className="custom-select mr-sm-2 mt-2"
                                                    id="inlineFormCustomSelect"
                                                    onChange={(ev) =>
                                                    this.setState({ role: ev.target.value })
                                                    }
                                                    value={this.state.role}
                                                >
                                                    <option selected>Choose...</option>
                                                    <option value="admin">Admin</option>
                                                    <option value="kasir">Kasir</option>
                                                </select>
                                            </div>
                                            <div class="col-12 mt-30">
                                                <button type="submit" id="submit" class="btn btn-lg btn-custom btn-light btn-block">Sign In
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            
                    </div>
                </div>
            </div>
        </div></div>
            
        )
    }

}
