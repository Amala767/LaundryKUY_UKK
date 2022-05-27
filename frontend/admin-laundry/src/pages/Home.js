import React from "react"
import Navbar from "../component/Navbar"
import axios from "axios"
import { base_url } from "../config.js"
import "./Home.css"
import HomeImg from '../assets/home2.png'
import memberImg from '../assets/member.png'
import userImg from '../assets/user.png'
import paketImg from '../assets/paket.png'
import transaksiImg from '../assets/transaksi.png'

export default class Home extends React.Component{
    constructor(){
    super()
    this.state = {
        token: "",
        adminName: null,
        memberCount: 0,
        userCount: 0,
        paketCount: 0,
        transaksiCount: 0
    }

    if (localStorage.getItem("token")) {
        this.state.token = localStorage.getItem("token")
        this.state.role = JSON.parse(localStorage.getItem("user")).role
    } else {
        window.location = "/login"
    }
}

headerConfig = () => {
    let header = {
        headers: { Authorization: `Bearer ${this.state.token}` }
    }
    return header
}

getPaket = () => {
    let url = base_url + "/paket"
    axios.get(url, this.headerConfig())
    .then(res => {
        this.setState({paketCount: res.data.length})
    })
    .catch(error => {
        if (error.res) {
            if (error.res.status) {
                window.alert(error.res.data.message)
                this.props.history.push("/login")
            }
        } else {
            console.log(error);
        }
    })
}
getMember = () => {
    let url = base_url + "/member"
    axios.get(url, this.headerConfig())
    .then(res => {
        this.setState({memberCount: res.data.length})
    })
    .catch(error => {
        if(error.res) {
            if(error.res.status) {
                window.alert(error.res.data.message)
                this.props.history.push("/login")
            }
        } else {
            console.log(error);
        }
    });
}
getUser = () => {
    let url = base_url + "/user"
    axios.get(url, this.headerConfig())
    .then(res => {
        this.setState({userCount: res.data.length})
    })
    .catch(error => {
        if (error.res) {
            if (error.res.status) {
                window.alert(error.res.data.message)
                this.props.history.push("/login")
            }
        } else {
            console.log(error);
        }
    });
}
getTransaksi = () => {
    let url = base_url + "/transaksi"
    axios.get(url, this.headerConfig())
    .then(res => {
        this.setState({transaksiCount: res.data.length})
    })
    .catch(error => {
        if (error.res) {
            if (error.res.status) {
                window.alert(error.res.data.message)
                this.props.history.push("/login")
            }
        } else {
            console.log(error);
        }
    });
}
getUsers = () => {
    let user = JSON.parse(localStorage.getItem('user'))
    this.setState({adminName: user.nama_user});
}

componentDidMount() {
    this.getMember()
    this.getUser()
    this.getPaket()
    this.getTransaksi()
    this.getUsers()
}

    render(){

       
        return(
   <div>
     <Navbar role={this.state.role}/>
        <div className="container mt-2 home-pages">
           <div className="row">
                <div className="col-lg-4 gambar-rumah">
                    <img src={HomeImg} className="mr-2 "></img> 
                </div>
                <div className="col-lg-8 mt-5 home">
                    <strong className="judul">Selamat Datang <strong className="nama-login">{this.state.adminName}</strong>
                    <br></br> di <strong className="logo"> Laundry.kuy</strong></strong>
                    <br></br>
                    <strong className="setelah-judul">Siap Bekerja untuk melayani dengan segenap hati</strong>
                    <br></br>
                    
                </div>       
            </div>


        <div className="row mb-5">
            {/* member count */}
            <div className="col-lg-3 col-md-6 col-sm-12 mt-5 dash">
                <div className="card member-count" >
                    <div className="card-body ">
                        <div className="row">
                        <div className="col-lg-4 text-center">
                            <img src={memberImg}></img>
                        </div>
                        <div className="col-lg-8">
                        <strong className="text-dark text-center">
                            <strong>Member Count</strong>
                        </strong>
                        <h1 className="text-dark text-center">
                        <strong>{this.state.memberCount}</strong>
                        </h1></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* user count */}
            <div className="col-lg-3 col-md-6 col-sm-12 mt-5 dash">
                <div className="card user-count ">
                    <div className="card-body">
                        <div className="row">
                        <div className="col-lg-4 text-center">
                            <img src={userImg}></img>
                        </div>
                        <div className="col-lg-8">
                        <strong className="text-dark text-center">
                            <strong>User Count</strong>
                        </strong>
                        <h1 className="text-dark text-center">
                          <strong>{this.state.userCount}</strong>
                        </h1></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* paket count */}
            <div className="col-lg-3 col-md-6 col-sm-12 mt-5 dash">
                <div className="card paket-count">
                    <div className="card-body ">
                        <div className="row">
                        <div className="col-lg-4 text-center">
                            <img src={paketImg}></img>
                        </div>
                        <div className="col-lg-8">
                        <strong className="text-dark text-center">
                            <strong>Paket Count</strong>
                        </strong>
                        <h1 className="text-dark text-center">
                         <strong>{this.state.paketCount}</strong>
                        </h1></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* transaksi count */}
            <div className="col-lg-3 col-md-6 col-sm-12 mt-5 dash">
                <div className="card transaksi-count">
                    <div className="card-body ">
                        <div className="row">
                        <div className="col-lg-4 text-center">
                            <img src={transaksiImg}></img>
                        </div>
                        <div className="col-lg-8">
                        <strong className="text-dark text-center">
                            <strong>Transaksi Count</strong>
                        </strong>
                        <h1 className="text-dark text-center">
                        <strong>{this.state.transaksiCount}</strong>
                        </h1></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</div>
    )
    }
}