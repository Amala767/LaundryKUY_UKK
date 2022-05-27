// import { extend } from "jquery";
import React from "react";
import "./style.css"


export default class PaketList extends React.Component {
    render() {
        return (
            <div className="col-lg-3 col-sm-12 p-2 paket">
                <div className="card">
                    <div className="card-body row">
                        

                        {/* menampilkan deskripsi */}
                        <div className="col-7">
                            <h5 className="text-info">
                                {this.props.jenis_paket}
                            </h5>
                            <h6 className="text-danger">
                                Harga: {this.props.harga}
                            </h6>

                            {/* button untuk mengedit */}
                            <button className="btn btn-sm btn-primary m-1"
                            onClick={this.props.onEdit}>
                                Edit
                            </button>

                            {/* button untuk menghapus */}
                            <button className="btn btn-sm btn-danger m-1"
                            onClick={this.props.onDrop}>
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}