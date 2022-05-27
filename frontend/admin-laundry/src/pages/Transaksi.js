import React from "react";
import axios from "axios";
import moment from "moment";
import { base_url, formatNumber } from "../config";
import { Link } from "react-router-dom";
import Navbar from "../component/Navbar";
import domToPdf from "dom-to-pdf";
import * as FaIcons from "react-icons/fa"
import * as BsIcons from "react-icons/bs"
import transaksiImg from '../assets/transaksi.png'
import baruImg from '../assets/baru.png'
import prosesImg from '../assets/sedangdiproses.png'
import siapImg from '../assets/siapdiambil.png'
import selesaiImg from '../assets/sudahdiambil.png'

import "./style.css"


class Transaksi extends React.Component {
  constructor() {
    super();
    this.state = {
      transaksi: [],
      role: "",
      visible: true,
      masterTransaksi: [],
      newTrans: 0,

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
      headers: { Authorization: `Bearer ${this.state.token}` }
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
        this.setState({ masterTransaksi: dataTransaksi })
        this.setState({ newTrans: response.data.filter(it => it.status === 1).length })
        this.setState({ onProses: response.data.filter(it => it.status === 2).length })
        this.setState({ ready: response.data.filter(it => it.status === 3).length })
        this.setState({ done: response.data.filter(it => it.status === 4).length })
      })
      .catch((error) => console.log(error));
  }

  hapusTransaksi(id_transaksi) {
    if (window.confirm("Apakah anda yakin menghapus data ini?")) {
      let endpoint = `${base_url}/transaksi/${id_transaksi}`;

      axios
        .delete(endpoint, this.headerConfig())
        .then((response) => {
          window.alert(response.data.message);
          this.getData();
        })
        .catch((error) => console.log(error));
    }
  }

  convertStatus(id_transaksi, status, dibayar) {
    if (status === 1 && dibayar === 0) {
      return (
        <>
          <div className="badge bg-info">
            Transaksi Baru
            <FaIcons.FaAngleDoubleRight onClick={() => this.changeStatus(id_transaksi, 2)} />
          </div>
          <div className="badge bg-danger">
            Belum dibayar
          </div>
        </>
      )
    } else if (status === 2 && dibayar === 0) {
      return (
        <>
          <div className="badge bg-warning">
            Sedang diproses
            <FaIcons.FaAngleDoubleRight onClick={() => this.changeStatus(id_transaksi, 3)} />
          </div>
          <div className="badge bg-danger">
            Belum dibayar
          </div>
        </>
      )
    } else if (status === 3 && dibayar === 0) {
      return (
        <>
          <div className="badge bg-secondary">
            Siap diambil
            <FaIcons.FaAngleDoubleRight onClick={() => this.changeStatus(id_transaksi, 4)} />
          </div>
          <div className="badge bg-danger">
            Belum dibayar
          </div>
        </>
      )
    } else if (status === 4 || dibayar === 1) {
      return (
        <>
          <div className="badge bg-success">Telah diambil</div>
          <div className="badge bg-success">
            Sudah dibayar
          </div>
        </>
      )
    }
  }

  changeStatus(id, status) {
    if (window.confirm(`Apakah anda yakin mengubah status data ini ?`)) {
      let endpoint = `${base_url}/transaksi/status/${id}`;
      let data = {
        status: status,
      };
      axios
        .post(endpoint, data, this.headerConfig())
        .then((response) => {
          window.alert(`Status transaksi telah diubah`);
          this.getData();
        })
        .catch((error) => console.log(error));
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
  cetakStruk(id) {
    var element = document.getElementById(`struk${id}`);
    var options = {
      filename: `entri-${id}.pdf`
    }
    domToPdf(element, options, function (pdf) {
      window.alert(`Struk akan segera terunduh`)
    })
  }
  componentDidMount() {
    this.getData();
  }

  render() {
    const target = React.createRef();
    // const target2 = React.createRef();
    // const optionPdf = {
    //   orientation: `landscape`,
    //   unit: `cm`,
    //   format: [21, 29.7],
    // };
    return (
      <>
        <Navbar role={this.state.role} />
        <div className="transaction-pages">
          <div className="main-content">
              <div className="container">
                    <div className="row mt-5 mb-5">
                        <div className="col-lg-2 tangantransaksi">
                            <img src={transaksiImg} className="" ></img> 
                        </div>
                        <div className="col-lg-5 ">
                            <h2 className="mb-3"><span>Halaman Transaksi</span></h2>
                              <Link style={{ "textDecoration": "none" }} to="/formTransaksi" className="text-white btn btn-primary mx-3 ">
                                Tambah Transaksi
                              </Link>

                              <button className="btn btn-success">
                                <Link
                                  to="/generatePdf" style={{ "textDecoration": "none"}} className="text-white">
                                  Generate PDF
                                </Link>
                              </button>
                        </div>
                        {/* <div className="col-lg-5">
                            <h6 className="card-title">Transaksi Baru: <h4>{this.state.newTrans}</h4></h6>
                      
                        </div>        */}
                    </div>
              </div>

            <div className="main-data">
              <div ref={target} id="topdf" className="container transaksi">

                      <div className="row mb-5">

                    <div className="col-lg-3 col-md-6 col-sm-12 mt-2 ">
                        <div className="card member-count" >
                            <div className="card-body dash">
                                <div className="row">
                                <div className="col-lg-4 text-center">
                                    <img src={baruImg}></img>
                                </div>
                                <div className="col-lg-8">
                                <strong className="text-dark text-center">
                                    <strong>Transaksi Baru</strong>
                                </strong><br></br>
                                <strong className="text-dark text-center">
                                <strong>{this.state.newTrans}</strong>
                                </strong></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-6 col-sm-12 mt-2 ">
                        <div className="card user-count ">
                            <div className="card-body dash">
                                <div className="row">
                                <div className="col-lg-4 text-center">
                                    <img src={prosesImg}></img>
                                </div>
                                <div className="col-lg-8">
                                <strong className="text-dark text-center">
                                    <strong>Sedang diproses</strong>
                                </strong><br></br>
                                <strong className="text-dark text-center">
                                  <strong>{this.state.onProses}</strong>
                                </strong></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-6 col-sm-12 mt-2 ">
                        <div className="card paket-count">
                            <div className="card-body dash">
                                <div className="row">
                                <div className="col-lg-4 text-center">
                                    <img src={siapImg}></img>
                                </div>
                                <div className="col-lg-8">
                                <strong className="text-dark text-center">
                                    <strong>Siap diambil</strong>
                                </strong><br></br>
                                <strong className="text-dark text-center">
                                <strong>{this.state.ready}</strong>
                                </strong></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-6 col-sm-12 mt-2 ">
                        <div className="card transaksi-count">
                            <div className="card-body dash">
                                <div className="row">
                                <div className="col-lg-4 text-center">
                                    <img src={selesaiImg}></img>
                                </div>
                                <div className="col-lg-8">
                                <strong className="text-dark text-center">
                                    <strong>Sudah diambil</strong>
                                </strong><br></br>
                                <strong className="text-dark text-center">
                                <strong>{this.state.done}</strong>
                                </strong></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                

                <ul className="list-group ">
                  {this.state.transaksi.map((trans) => (
                    <li className="list-group-item tabel-transaksi mt-3 card">
                      <div className="row">
                        {/* Member Area */}
                        <div className="col-lg-1 px-0">
                          <small>
                            <b>{moment(trans.tgl).format("L")}</b>
                          </small>
                        </div>
                        <div className="col-lg-3 px-4">
                          <small>{trans.member.nama_member}</small> <br />
                          <small className="text-secondary">
                            {trans.member.alamat}
                          </small>
                        </div>
                        <div className="col-lg-2">
                          <h6 className="text-secondary">Batas Waktu</h6>
                          <small>{moment(trans.batas_waktu).format("L")}</small>
                        </div>
                        <div className="col-lg-2">
                          <h6 className="text-secondary">Tanggal Bayar</h6>
                          <small>{moment(trans.tgl_bayar).format("L")}</small>
                        </div>
                        <div className="col-lg-2">
                          {this.convertStatus(trans.id_transaksi, trans.status, trans.dibayar)}
                          {" "}
                        </div>
                        <div className="col-lg-2">
                          <b className="text-secondary">Total : </b>
                          <small> Rp {formatNumber(trans.total)}</small> <br />
                          <button
                            className="btn btn-danger mt-2 btn-sm mx-2 me-md-2"
                          >
                            <FaIcons.FaTrashAlt onClick={() => this.hapusTransaksi(trans.id_transaksi)} />
                          </button>
                          <button className="btn btn-primary mt-2 btn-sm mx-2" onClick={() => this.cetakStruk(trans.id_transaksi)}>
                            {/* <i class="fa-solid fa-file-arrow-down"></i> */}
                            <FaIcons.FaFileDownload />
                          </button>
                        </div>
                        <div style={{ display: `none` }} className="struk-transaksi">
                          <div className="col-lg-12 " id={`struk${trans.id_transaksi}`} style={{ padding: `100px`, fontSize: `24px` }}>
                            <div className="text-center" style={{ marginBottom: `100px` }}>
                              <h1 style={{ fontSize: `56px`, fontWeight: `900`, color: `#191970` }}>Laundry.kuy</h1>
                              <h5>Siap Bekerja untuk melayani dengan segenap hati</h5>
                              <h5>Jln. Pelangi Agung No.4, Gondang legi | 65173</h5>
                              <h5>085848988378</h5>
                            </div>
                            <div className="row text-dark">
                              <div className="col-lg-8">
                                <div><strong>Member:</strong> {trans.member.nama_member}</div>
                                <div className="mt-3"><strong>Kasir:</strong>{trans.user.nama_user}</div>
                              </div>
                              <div className="col-lg-4">
                                <div><strong>Tanggal Transaksi:</strong> {moment(trans.tgl).format('L')}</div>
                                <div className="my-3"><strong>Batas pembayaran:</strong> {moment(trans.batas_waktu).format('L')}</div>
                                <div><strong>Tanggal pembayaran:</strong> {moment(trans.tgl_bayar).format('L')}</div>
                              </div>
                            </div>
                            <hr />
                            <div className="row" style={{ fontWeight: `bold`, fontSize: `24px` }}>
                              <div className="col-4">Jenis Paket</div>
                              <div className="col-2">Qty</div>
                              <div className="col-3">Harga Satuan</div>
                              <div className="col-3">Total Satuan</div>
                            </div>
                            <hr />
                            {trans.detail_transaksi.map(item => (
                              <div className="row my-4">
                                <div className="col-4">{item.paket.jenis_paket}</div>
                                <div className="col-2">{item.qty}</div>
                                <div className="col-3">{item.paket.harga}</div>
                                <div className="col-3">Rp.{formatNumber(item.paket.harga * item.qty)}</div>
                              </div>
                            ))}
                            <div className="row mt-5">
                              <div className="col-lg-7"></div>
                              <div className="col-lg-2"><b>Total Belanja</b></div>
                              <div className="col-lg-3">
                                Rp.{formatNumber(trans.total)}
                              </div>
                            </div>
                            <div className="text-center" style={{ marginTop: `200px` }}><i>Terima kasih atas kepercayaan anda menggunakan layanan kami</i></div>
                            <div className="text-center" ><i>Jangan Lupa Datang Kembali</i></div>
                          </div>
                        </div>
                      </div>

                      {/* Detail Transaksi */}
                      <h6 className="text-primary mt-3">Detail Transaksi</h6>
                      {trans.detail_transaksi.map((detail) => (
                        <div className="row">
                          {/* Jenis Paket */}
                          <div className="col-lg-3">
                            {detail.paket.jenis_paket}
                          </div>
                          {/* Quantiti */}
                          <div className="col-lg-2">{detail.qty}</div>
                          {/* Harga Paket */}
                          <div className="col-lg-3">
                            Rp {formatNumber(detail.paket.harga)}
                          </div>
                          {/* Total */}
                          <div className="col-lg-4">
                            Rp {formatNumber(detail.paket.harga * detail.qty)}
                          </div>
                        </div>
                      ))}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Transaksi;