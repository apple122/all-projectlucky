import axios from "axios";
import React, { useEffect, useState, createContext, useRef } from "react";
import { Link } from "react-router-dom";
import url from "../components/API-links/apiurl";
import { EditPrizeModal } from "./EditPrizeModal";
import Spinner from "../components/uitilities/Spinner";
import Swal from "sweetalert2";
import ReactPaginate from "react-paginate";

const Prizes = () => {
  const token = localStorage.getItem("myToken");
  const [loading, setLoading] = useState(false);
  if (!token) {
    window.location = "/login";
  }

  const [ getPrizeKey, setgetPrizeKey ] = useState([])
  useEffect(() => {
    axios.get(url.Mainurl + url.getPrizeKey, {headers: {"Authorization" : `Bearer ${token}`}}).then((res) => {
      setgetPrizeKey(res.data)
    })
  }, [])
  

  

  return (
    <div>
        <div className="content-wrapper">
          <div className="content-header">
            <div className="container-fluid">
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card-header">
                    <div id="app"></div>
                      <Link
                        to="/add-prize"
                        className="card-title btn btn-success float-right"
                      >
                        ເພິ່ມລາງວັນ
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="card">
                    <div className="card-header">
                      <h3 className="card-title">ຂໍ້ມູນລາງວັນ</h3>
                      <div className="card-tools">
                        <div
                          className="input-group input-group-sm"
                          style={{ width: 500 }}
                        >
                          <input
                            // onChange={(e) => setFilterText(e.target.value)}
                            type="text"
                            name="table_search"
                            className="form-control float-right"
                            placeholder="ຄົ້ນຫາ..."
                          />
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
                            <th className="col-md-1">ID</th>
                            <th>ຊື່ລາງວັນ</th>
                            <th>ມູນຄ່າລາງວັນ</th>
                            <th>ຈຳນວນ</th>
                            <th className="text-center">ຈັດການ</th>
                          </tr>
                        </thead>
                        <tbody>
                        {getPrizeKey.map((item) => (
                          <tr>
                            <td className="col-md-1">{item.id}</td>
                            <td>{item.title}</td>
                            <td>{item.description}</td>
                            <td>{item.quantity}</td>
                            <td className="text-center">
                              <a className="btn btn-sm btn-info">Click</a>  
                            </td>
                          </tr>
                        ))}
                        </tbody>
                      </table>
                      <div className="mt-4 mb-5 p-1">
                        
                      </div>
                    </div>
                    {/* /.card-body */}
                  </div>
                  {/* /.card */}
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
};

export default Prizes;
