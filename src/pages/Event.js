/* eslint-disable jsx-a11y/alt-text */
import axios from 'axios'
import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import '../App.css'
import Spinner from '../components/uitilities/Spinner'
import { EditEventModal } from './EditEventModal'
import Swal from 'sweetalert2'
import url from '../components/API-links/apiurl'
import '../assets/css/customPagination.css'
import EditImageEventModal from './EditImageEventModal';
import '../../src/assets/css/table.css'
import CountdownTimer from '../components/CountdownTimer'

const Event = () => {
  const token = localStorage.getItem('myToken')
  if (!token) {
    window.location = "/login"
  }
  const [query, setQuery] = useState("")
  const [loading, setLoading] = useState(false)
  const [showEvent, setshowEvent] = useState([])
  const [showModal, setshowModal] = useState(false)
  const [countPage, setCountPage] = useState([])
  const [filterText, setFilterText] = useState("")
  const [currentPage, setCurrentPage] = useState(0)
  const inputRef = useRef(null)
  let totalPage = countPage - 1

  useEffect(() => {
    const listEvent = async () => {
      const data = await axios.get(url.Mainurl + url.getEvent).then((res) => {
        setshowEvent(res.data.lists)
        setCountPage(res.data.totalPages)
        setLoading(true)
      }).catch((err) => {
        console.log(err)
      })
    }
    listEvent()
  }, [])

  const deleteEvent = (id) => {
    Swal.fire({
      title: 'ທ່ານຈະລົບຂໍ້ມູນແທ້ຫລືບໍ່?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ລົບຂໍ້ມູນ',
      cancelButtonText: 'ຍົກເລີກ'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(url.Mainurl + url.deleteEvent + id).then(() => {
          setshowEvent(showEvent.filter((val) => {
            Swal.fire(
              'ລົບສຳເລັດ!',
              'success'
            )
            return val.id !== id

          }))
        }).catch(() => {
          alert('ເກີດຂໍ້ຜິດພາດ')
        })
      }
    })
  }

  function search(event) {

    setFilterText(event.target.value)
    axios.get(url.Mainurl + url.getEvent + `?title=${filterText}`).then((res) => {
      setshowEvent(res.data.lists)
    })
  }

  function Next() {
    setCurrentPage(currentPage + 1)
    axios.get(url.Mainurl + url.getEvent + `?page=${currentPage + 1}`).then((res) => {
      setshowEvent(res.data.lists)
    })
  }

  function Back() {
    setCurrentPage(currentPage - 1)
    axios.get(url.Mainurl + url.getEvent + `?page=${currentPage - 1}`).then((res) => {
      setshowEvent(res.data.lists)
    })
  }

  function reset() {
    inputRef.current.value = "";
    axios.get(url.Mainurl + url.getEvent).then((res) => {
      setshowEvent(res.data.lists)
      setCountPage(res.data.totalPages)
      setLoading(true)
      setCurrentPage(0)
    })
  }

  return (
    <div>
      {loading === true ? <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <Link to="/add-event" className="card-title btn btn-success float-right">ເພິ່ມກິດຈະກຳ</Link>
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">ຂໍ້ມູນກິດຈະກຳທັງຫມົດ</h3>
                    <div className="card-tools">
                      <div className="input-group input-group-sm" style={{ width: 500 }}>

                        <input ref={inputRef} onChange={search} type="text" name="table_search" className="form-control float-right" placeholder="ຄົ້ນຫາດ້ວຍຫົວຂໍ້ຫລັກ..." />
                        <div className="input-group-append">
                          <button onClick={reset} type="submit" className="btn btn-default">
                            Reset
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* /.card-header */}
                  <div className='d-none'>
                  <CountdownTimer/>

                  </div>
                  <div className="card-body table-responsive p-0">
                    <table className="table table-hover text-nowrap">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>ຫົວຂໍ້ຫລັກ</th>
                          <th>ຫົວຂໍ້ຍ່ອຍ</th>
                          <th>ຣູບພາບ</th>
                          <th>ລາຍລະອຽດ</th>
                          <th>ວັນເລີ່ມກິດຈະກຳ</th>
                          <th>ວັນສິ້ນສຸດກິດຈະກຳ</th>
                          <th>ເວລາເລີ່ມກິດຈະກຳ</th>
                          <th>ສະຖານທີ່ຈັດກິດຈະກຳ</th>
                          <th>ຕິດຕໍ່</th>
                          <th className="text-center">Action</th>
                        </tr>
                      </thead>

                      <tbody>
                        {showEvent.filter((item) => item.title.toLowerCase().includes(query)).map((item, index) => (
                          <tr key={index.id}>
                            <td valign='center'>{index + 1}</td>
                            <td align='center'>{item.title}</td>
                            <td valign='centercenter'>{item.sub_title}</td>
                            <td valign='middle'><img width={150} height={150} src={url.photoEvent + item.image}></img></td>
                            <td valign='middle' className='text-overflow first ps-2'><span>{item.description}</span></td>
                            <td valign='middle'>{item.start_date}</td>
                            <td valign='middle'>{item.end_date}</td>
                            <td valign='middle'>{item.time}</td>
                            <td valign='middle'>{item.address}</td>
                            <td valign='middle'>{item.phone}</td>
                            <td valign='middle' class="text-center py-0 align-middle">
                              <div class="btn-group btn-group-sm">
                                <EditEventModal id={item.id} showModal={showModal} setshowModal={setshowModal} />
                                {/* <EditImageEventModal id={item.id} showModal={showModal} setshowModal={setshowModal} /> */}
                                <button class="btn btn-danger" onClick={() => deleteEvent(item.id)}><i class="fas fa-trash"></i></button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className='customPagination d-flex py-2'>
                      <button onClick={Back} className={`mx-2 px-2 btn btn-primary`} disabled={currentPage === 0 ? true : false}>Back</button>
                      <span className='mt-2'>{currentPage + 1}</span>
                      <button onClick={Next} className={`mx-2 px-2 btn btn-primary`} disabled={currentPage === totalPage ? true : false}>Next</button>
                    </div>
                  </div>


                  {/* /.card-body */}
                </div>
                {/* /.card */}
              </div>
            </div>
          </div>
        </div>
      </div> : <Spinner />}
    </div>
  )
}

export default Event