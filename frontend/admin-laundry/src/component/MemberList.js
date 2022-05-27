import React from "react"
import "./style.css"


export default class MemberList extends React.Component{
    render() {
        return(
            <div className="container member">
                <div className="card col-sm-12 my-1">
                    <div className="card-body row">
                        <div className="col-lg-10 col-sm-12">
                        <   h5 className="text-info">
                                Member Name: {this.props.nama_member}
                            </h5>
                            <h6>Member Phone: {this.props.tlp}</h6>
                            <h6>Member Address: {this.props.alamat}</h6>
                        </div>
                        <div className="col-lg-2 col-sm-12 ">
                            <button className="btn btn-sm btn-primary m-1"
                            onClick={this.props.onEdit}>
                                Edit
                            </button>

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