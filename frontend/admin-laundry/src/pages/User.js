import React from "react"
import Navbar from "../component/Navbar"
import userImg from '../assets/user.png'
import tambahImg from '../assets/formuliruser.png'
import "./style.css"

// import base_url dari file config.js
import { base_url } from "../config"

// import axios
import axios from "axios"

// import jquery
import $ from "jquery"

// import modal -> untuk versi bootstrap 5
// import { Modal } from "bootstrap"
// note : jika menggunakan bootstrap 4 tidak ush menambahkan script diatas

export default class User extends React.Component{
    constructor(){
        super()
        this.state = {
            token: "",
            action: "",
            user: [],
            id_user: "",
            nama_user: "",
            username: "",
            password: "",
            role: "",
            fillPassword: true            
        }

        /* logika if-else --> untuk mengecek apakah user yg mengakses telah melakukan
           login sebagai admin atau belum
        */
        if (localStorage.getItem("token")) {
            this.state.token = localStorage.getItem("item")
        } else {
            window.location = "/login"
        }
    }

    // header config -> untuk memberikan header berupa 'beare token' sebagai request API
    // sebelum mengakses data
    headerConfig = () => {
        let header = {
            headers: { Authorization: `Bearer ${this.state.token}`}
        }
        return header
    }

    // getUser -> untuk mengakses API get user
    getUser = () => {
        let url = base_url + "/user"
        axios.get(url, this.headerConfig())
        .then(response => {
            this.setState({user: response.data})
        })
        .catch(error => {
            if (error.response) {
                if (error.response.status) {
                    window.alert(error.response.data.message)
                    this.props.history.push("/login")
                }
            } else {
                console.log(error);
            }
        })
    }

    componentDidMount() {
        this.getUser()
    }

    // function add -> untuk memberikan inisialisasi data dan menampilkan modal untuk menambah data
    Add = () => {
        // menampilkan modal versi bootstrap 5
        // let myModal = new Modal (document.getElementById("modal_user"))
        // myModal.show()
        // --------------------
        // Note : versi bootstrap 4
        $("#modal_user").modal("show")
        // ---------------------
        this.setState({
            action: "insert",
            id_user: 0,
            nama_user: "",
            username: "",
            password: "",
            role: "",
            fillPassword: true
        })
    }

    // function edit -> untuk memberikan inisialisasi data dan menampilkan modal untuk mengedit data
    Edit = selectedItem => {
        // menampilkan modal versi bootstrap 5
        // let myModal = new Modal (document.getElementById("modal_user"))
        // myModal.show()
        // --------------------
        // Note : versi bootstrap 4
        $("#modal_user").modal("show")
        // ---------------------
        this.setState({
            action: "update",
            id_user: selectedItem.id_user,
            nama_user: selectedItem.nama_user,
            username: selectedItem.username,
            password: "",
            role: selectedItem.role,
            fillPassword: false
        })
    }

    // function saveUser -> untuk menyimpan data pada db dengan mngakses API
    saveUser = event => {
        event.preventDefault()
        $("#modal_user").modal("hide")
        let form = {
            id_user: this.state.id_user,
            nama_user: this.state.nama_user,
            role: this.state.role,
            username: this.state.username
        }
        
        if (this.state.fillPassword) {
            form.password =  this.state.password
        }

        let url = base_url + "/user"
        if (this.state.action === "insert") {
            axios.post(url, form, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getUser()
            })
            .catch(error => console.log(error))
        } else if(this.state.action === "update") {
            axios.put(url, form, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getUser()
            })
            .catch(error => console.log(error))
        }
    }

    // dropUser -> untuk menghapus data user
    dropUser = selectedItem => {
        if (window.confirm("Yakin mau dihapus ?")) {
            let url = base_url + "/user/" + selectedItem.id_user
            axios.delete(url, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getUser()
            })
            .catch(error => console.log(error))
        }
    }

    render(){
        return(
            <div>
                <Navbar role={JSON.parse(localStorage.getItem("user")).role}/>
                <div className="container">
                    <div className="row mt-5 mb-5">
                    <div className="col-lg-2">
                        <img src={userImg} className="" ></img> 
                    </div>
                    <div className="col-lg-10">
                        <h5 className="text-bold text-info mt-2">
                            Daftar User
                        </h5>
                        <button className="btn btn-success" onClick={() => this.Add()}>
                        Add User
                        </button>
                    </div>       
                    </div>
                   
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nama User</th>
                                <th>Username</th>
                                <th>Role</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.user.map((item, index) => (
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{item.nama_user}</td>
                                    <td>{item.username}</td>
                                    <td>{item.role}</td>
                                    <td>
                                        <button className="btn btn-sm btn-info m-1"
                                        onClick={() => this.Edit(item)}>
                                            Edit
                                        </button>

                                        <button className="btn btn-sm btn-danger m-1"
                                        onClick={() => this.dropUser(item)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                   

                    {/* Modal User */}
                    <div className="modal fade" id="modal_user">
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <div className="modal-header container formulir-member">
                                    <div className="row">
                                        <div className="col-lg-6 useredit">
                                            <img src={tambahImg} ></img>
                                        </div>
                                        <div className="col-lg-6 judul">
                                            <h5 className="text-tambah mt-4">Formulir User</h5>
                                            <hr></hr>
                                        </div>
                                    </div>
                                </div>

                                <div className="modal-body">
                                    <div class="row">
                                            <div class="col-md-6">
                                            <div class="form-group ">
                                                <label for="exampleInputEmail1">Nama User</label>
                                                <input type="text" class="form-control mb-1" value={this.state.nama_user} onChange={ev => this.setState({nama_user: ev.target.value})} name="npm" placeholder="Nama User" required/>
                                            </div>
                                            <div class="form-group">
                                                <label for="exampleInputPassword1">Role</label>
                                                <select id="role" class="form-control" name="role"  onChange={ev => this.setState({role: ev.target.value})} value={this.state.role}>
                                                        <option>Role</option>     
                                                        <option value="admin">
                                                            admin
                                                        </option>
                                                        <option value="Kasir">
                                                            Kasir
                                                        </option>
                                                </select>
                                            </div>
                                            
                                            
                                            
                                            
                                            </div>
                                            <div class="col-md-6">
                                            <div class="form-group">
                                                <label for="exampleInputPassword1">Username</label>
                                                <input type="text" className="form-control mb-2" value={this.state.username} onChange={ev => this.setState({username: ev.target.value})} required  />                                           
                                                            
                                                            
                                                            { this.state.action === "update" && this.state.fillPassword === false ? (
                                                        <button className="btn btn-sm btn-secondary mb-1 btn-block"
                                                        onClick={() => this.setState({fillPassword: true})}>
                                                            Change Password
                                                        </button>
                                                    ) : (
                                                        <div>
                                                            Password
                                                            <input type="password" className="form-control mb-1"
                                                            value={this.state.password}
                                                            onChange={ev => this.setState({password: ev.target.value})}
                                                            required
                                                            />
                                                        </div>
                                                    ) }
                                            </div>
                                            
                                            </div>
                                            </div>                                 
                                </div>




                                <div className="modal-body">
                                    <form onSubmit={ev => this.saveUser(ev)}>
                                        

                                        <button type="submit" className="btn btn-block button-simpan">
                                            Simpan
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}