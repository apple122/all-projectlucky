/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react'
import '../App.css'

const Event = () => {
    const token = localStorage.getItem('myToken')
    if(!token) {
      window.location = "/login"
    }
    return (
        <div className="content-wrapper">
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="card">

                            </div>
                        </div>
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title">ຫນ້າຫລັກ</h3>

                                </div>
                                {/* /.card-header */}


                               <h1 className='my-5 text-center'>Welcome to SBS Admin Random Web</h1>


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

export default Event