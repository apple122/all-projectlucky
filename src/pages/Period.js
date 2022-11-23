import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import axios from 'axios'


const url = "http://localhost:8080/api/v1/times"

const Period = () => {
    const token = localStorage.getItem('myToken')
    if(!token) {
      window.location = "/login"
    }

    const [periodValue, setperiodValue] = useState([])

const listPeriod = () => {
    axios.get(url).then((res) => {
        // console.log(res.data)
        setperiodValue(res.data.reverse())
    }).catch((err) => {
        console.log(err)
    })
}

useEffect (() => {
    listPeriod()
}, [])

    return (
        <div className="content-wrapper">
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header">
                                    <Link to="/add-period" className="card-title btn btn-success float-right">create new period</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title">Table Slider List</h3>
                                    <div className="card-tools">
                                        <div className="input-group input-group-sm" style={{ width: 500 }}>
                                            <input type="text" name="table_search" className="form-control float-right" placeholder="Search" />
                                            <div className="input-group-append">
                                                <button type="submit" className="btn btn-default">
                                                    <i className="fas fa-search" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* /.card-header */}
                                <div className="card-body table-responsive p-0">
                                    <table className="table table-hover text-nowrap">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>period name</th>
                                                <th>Start date</th>
                                                <th>End Date</th>
                                                
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {periodValue.map((item) => (
                                                 <tr>
                                                 <td>{item.id}</td>
                                                 <td>{item.name}</td>
                                                 <td>{item.startDate}</td>
                                                 <td>{item.endDate}</td>
                                                
                                             </tr>
                                            ))}
                                        
                                        </tbody>
                                    </table>
                                </div>
                                {/* /.card-body */}
                            </div>
                            {/* /.card */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Period