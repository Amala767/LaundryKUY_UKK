import React from "react";
import axios from "axios";
import moment from "moment";
import { base_url, formatNumber } from "../config";
import Navbar from "../component/Navbar"
// import react to pdf
import domToPdf from "dom-to-pdf";

export default class Generate extends React.Component {
    constructor() {
        super();
        this.state = {
          transaksi: [],
          role: "",
          visible: true,
        };
        
        if (localStorage.getItem("token")) {
          this.state.token = localStorage.getItem("token");
          this.state.role = JSON.parse(localStorage.getItem("user")).role;
        } else {
          window.location = "/login";
        }
      }
    
      headerConfig = () => {
        let header = {
            headers: { Authorization: `Bearer ${this.state.token}`}
        }
        return header
      }
    
      getData() {
        let endpoint = base_url + "/transaksi";
        axios
          .get(endpoint, this.headerConfig())
          .then((response) => {
            let dataTransaksi = response.data;
            for (let i = 0; i < dataTransaksi.length; i++) {
              let total = 0;
              for (let j = 0; j < dataTransaksi[i].detail_transaksi.length; j++) {
                let harga = dataTransaksi[i].detail_transaksi[j].paket.harga;
                let qty = dataTransaksi[i].detail_transaksi[j].qty;
    
                total += harga * qty;
              }
    
              dataTransaksi[i].total = total;
            }
            this.setState({ transaksi: dataTransaksi });
          })
          .catch((error) => console.log(error));
      }

      // untuk menampilkan status paket
    displayStatus = (status) => {
        if (status === 1) {
            return (
                <div className="badge badge-primary">Transaksi Baru</div>
            )
        } else if (status === 2) {
            return (
                <div className="badge badge-warning">Sedang Proses</div>
            )
        } else if (status === 3) {
            return (
                <div className="badge badge-success">Siap Diambil</div>
            )
        } else if (status === 4) {
            return (
                <div className="badge badge-info">Telah Diambil</div>
            )
        }
    }

    // untuk menampilkan status bayar
    displayBayar = (bayar) => {
        if (bayar === 0) {
            return (
                <div className="badge badge-danger">Belum Bayar</div>
            )
        } else if (bayar === 1) {
            return (
                <div className="badge badge-success">Sudah Bayar</div>
            )
        }
    }

    convertStatus(id_transaksi, status, dibayar){
        if(status === 1 && dibayar === 0) {
            return(
                <>
                <div>
                    transaksi baru
                </div>
                <br/>
                <div className="text-danger">
                    belum dibayar
                </div>
                </>
            )
        } else if(status === 2 && dibayar === 0){
            return(
               <>
                <div>
                    sedang diproses
                </div>
                <br/>
                <div className="text-danger">
                    belum dibayar 
                </div>
               </>
            )
        } else if(status === 3 && dibayar === 0){
            return(
                <>
                <div>
                    siap diambil
                </div>
                <br/>
                <div className="text-danger">
                    belum dibayar
                </div>
                </>
            )
        } else if(status === 4 || dibayar === 1){
            return(
                <>
                <div>telah diambil</div>
                <br/>
                <div className="text-success">
                    sudah dibayar
                </div>
                </>
            )
        }
      }
    
      convertPdf() {
        //ambil elemen yang akan di convert
        let element = document.getElementById(`topdf`);
        let options = {
          filename: "laporan.pdf",
        };
        domToPdf(element, options, () => {
          window.alert("File akan segera di Download");
        });
      }
    
      componentDidMount() {
        this.getData();
      }

    render() {
        const target = React.createRef();
        return (
            <>
            <Navbar role={this.state.role} />
            <div ref={target} id="topdf" className="container">
                <h3 className="py-3 text-center" >
                    Laporan Transaksi <br></br>
                    <h5 className="text-center">
                    Berisi laporan transaksi secara keseluruhan
                    </h5> 
                </h3>
                
                <button style={{backgroundColor: "#4596AA"}} 
                    className="btn text-white mt-2 btn-sm mx-2"
                    onClick={() => this.convertPdf()}
                    >
                        Unduh
                </button>
                
                
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card p-4 bg-light border-0 my-4">
                        <table className="table text-center mb-1">
                            <thead style={{ backgroundColor: "#2A4965", color: "white" }}>
                            <tr>
                                <th>#</th>
                                <th>Nama Member</th>
                                <th>Alamat</th>
                                <th>Tanggal Transaksi</th>
                                <th>Batas Waktu</th>
                                <th>Status</th>
                                <th>Total</th>
                            </tr>
                            </thead>
                            <tbody style={{ fontFamily: "Poppins" }}>
                            {this.state.transaksi.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.member.nama_member}</td>
                                    <td>{item.member.alamat}</td>
                                    <td>{moment(item.tgl).format('L')}</td>
                                    <td>{moment(item.batas_waktu).format('L')}</td>
                                    <td>{this.convertStatus(item.id_transaksi,item.status, item.dibayar)}</td>
                                    <td>Rp {formatNumber(item.total)}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        </div>
                    </div>
                </div>
            </div>
            </>
        )
    }
}