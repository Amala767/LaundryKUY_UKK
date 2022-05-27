import React from "react"
import Navbar from "../component/Navbar"
import memberImg from '../assets/member.png'
import tambahImg from '../assets/edit2.png'
import "./style.css"


// import base_url dari file config.js
import { base_url } from "../config"

// import axios
import axios from "axios"

// import jquery
import $ from "jquery"

import MemberList from "../component/MemberList"

// import modal -> untuk versi bootstrap 5
// import { Modal } from "bootstrap"
// note : jika menggunakan bootstrap 4 tidak ush menambahkan script diatas

export default class Member extends React.Component{
    constructor(){
        super()
        // siapkan state --> untuk pembuatan halaman customer
        this.state = {
            member: [],
            token: "",
            action: "",
            nama_member: "",
            tlp: "",
            alamat: "",
            jenis_kelamin: "",
            id_member: ""
        }

        /* logika if-else --> untuk mengecek apakah user yg mengakses telah melakukan
           login sebagai admin atau belum
        */
        if (localStorage.getItem("token")) {
            this.state.token = localStorage.getItem("token")
            this.state.role = JSON.parse(localStorage.getItem("user")).role
        } else {
            window.location = "/login"
        }
        this.headerConfig.bind(this)
    }

    // header config -> untuk memberikan header berupa 'beare token' sebagai request API
    // sebelum mengakses data
    headerConfig = () => {
        let header = {
            headers: { Authorization: `Bearer ${this.state.token}` }
        }
        return header
    }

    // getMember -> untuk mengakses API get member
    getMember = () => {
        let url = base_url + "/member"
        axios.get(url, this.headerConfig())
        .then(response => {
            this.setState({member: response.data})
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
        this.getMember()
    }

    // function add -> untuk memberikan inisialisasi data dan menampilkan modal untuk menambah data
    Add = () => {
        // menampilkan modal versi bootstrap 5
        // let myModal = new Modal (document.getElementById("modal_member"))
        // myModal.show()
        // --------------------
        // Note : versi bootstrap 4
        $("#modal_member").modal("show")
        // ---------------------
        this.setState({
            action: "insert",
            id_member: 0,
            nama_member: "",
            alamat: "",
            jenis_kelamin: "",
            tlp: ""
        })
    }

    // function edit -> untuk memberikan inisialisasi data dan menampilkan modal untuk mengedit data
    Edit = selectedItem => {
        // menampilkan modal versi bootstrap 5
        // let myModal = new Modal (document.getElementById("modal_member"))
        // myModal.show()
        // --------------------
        // Note : versi bootstrap 4
        $("#modal_member").modal("show")
        // ---------------------
        this.setState({
            action: "update",
            id_member: selectedItem.id_member,
            nama_member: selectedItem.nama_member,
            alamat: selectedItem.alamat,
            jenis_kelamin: selectedItem.jenis_kelamin,
            tlp: selectedItem.tlp
        })
    }

    // function saveMember -> untuk menyimpan data pada db dengan mngakses API
    saveMember = event => {
        event.preventDefault()
        // let myModal = new Modal (document.getElementById("modal_member"))
        // myModal.hide()
        $("#modal_member").modal("hide")
        let form = {
            id_member: this.state.id_member,
            nama_member: this.state.nama_member,
            alamat: this.state.alamat,
            jenis_kelamin: this.state.jenis_kelamin,
            tlp: this.state.tlp
        }

        let url = base_url + "/member"
        if(this.state.action === "insert") {
            axios.post(url, form, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getMember()
            })
            .catch(error => console.log(error))
        } else if (this.state.action === "update") {
            axios.put(url, form, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getMember()
            })
            .catch(error => console.log(error))
        }
    }

    // function dropMember -> untuk menghapus data member
    dropMember = selectedItem => {
        if (window.confirm("Yakin mau menghapus member ini ?")) {
            let url = base_url + "/member/" + selectedItem.id_member
            axios.delete(url, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getMember()
            })
            .catch(error => console.log(error))
        }
    }

    render(){
        return(
            <div>
                <Navbar role={this.state.role}/>
                <div className="container member-pages">
                    <div className="row mt-5 mb-5">
                    <div className="col-lg-2">
                        <img src={memberImg} className="" ></img> 
                    </div>
                    <div className="col-lg-10 ">
                        <h5 className="text-bold text-dark mt-2">
                            Daftar Member
                        </h5>
                        <button className="btn btn-success" onClick={() => this.Add()}>
                            Add Member
                        </button>
                    </div>       
                    </div>

                   
                    <div className="row">
                        { this.state.member.map(item => (
                            <MemberList
                                key = {item.id_member}
                                nama_member = {item.nama_member}
                                tlp = {item.tlp}
                                alamat = {item.alamat}
                                onEdit = {() => this.Edit(item)}
                                onDrop = {() => this.dropMember(item)}
                            />
                        )) }
                    </div>
                    
                </div>

                {/* modal member */}
                <div className="modal fade" id="modal_member">
                    <div className="modal-dialog modal-xl">
                        <div className="modal-content">
                            <div className="container modal-header formulir-member">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <img src={tambahImg} ></img>
                                    </div>
                                    <div className="col-lg-6 judul">
                                        <h5 className="text-tambah mt-4">Formulir Member</h5>
                                        <hr></hr>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={ev => this.saveMember(ev)}>
                                    {/* Member Name
                                    <input type="text" className="form-control mb-1"
                                    value={this.state.nama_member}
                                    onChange={ev => this.setState({nama_member: ev.target.value})}
                                    required
                                    /> */}
                                    

                                    <div class="form-group row">
                                        <label for="inputNama" class="col-sm-2 col-form-label">Nama Member</label>
                                        <div class="col-sm-10">
                                            <input type="text" className="form-control mb-1"
                                                    value={this.state.nama_member}
                                                    onChange={ev => this.setState({nama_member: ev.target.value})}
                                                    required/>
                                        </div>
                                    </div>

                                    <div class="form-group row">
                                        <label for="inputNama" class="col-sm-2 col-form-label">Alamat Member</label>
                                        <div class="col-sm-10">
                                            <input type="text" className="form-control mb-1"
                                                    value={this.state.alamat}
                                                    onChange={ev => this.setState({alamat: ev.target.value})}
                                                    required/>
                                        </div>
                                    </div>

                                    <div className="from-group row">
                                        <label for="jenis_kelamin" className="col-sm-2 col-form-label">Jenis Kelamin</label>
                                        <div className="col-sm-10 mb-3">
                                        <select name="jenis_kelamin" id="jenis_kelamin" className=" form-control"
                                        onChange={ev => this.setState({jenis_kelamin: ev.target.value})}
                                         value={this.state.jenis_kelamin}>
                                            <option>--- Pilih ---</option>     
                                            <option value="Laki-Laki">
                                                Laki-Laki
                                            </option>
                                            <option value="Perempuan">
                                                Perempuan
                                            </option>
                                        </select>
                                        </div>
                                    </div>
                                    
                                    <div class="form-group row">
                                        <label for="inputNama" class="col-sm-2 col-form-label">Nomor Telephone</label>
                                        <div class="col-sm-10">
                                                <input type="text" className="form-control mb-1"
                                            value={this.state.tlp}
                                            onChange={ev => this.setState({tlp: ev.target.value})}
                                            required
                                            />
                                        </div>
                                    </div>


                                    <button type="submit" className="btn btn-block button-simpan">
                                        Simpan
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}