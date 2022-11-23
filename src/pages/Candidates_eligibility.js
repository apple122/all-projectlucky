import axios from 'axios'
import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import url from '../components/API-links/apiurl'
import Spinner from '../components/uitilities/Spinner'
import { NumericFormat, NumberFormatBase } from 'react-number-format';
import DataTable from 'react-data-table-component'
import '../assets/css/customPagination.css'
import { height } from '@mui/system'
import Swal from 'sweetalert2'
import EditCandidates_eligibility from './EditCandidates_eligibility'

const Candidates_eligibility = () => {

    const [loading, setLoading] = useState(false)
    const token = localStorage.getItem('myToken')
    if (!token) {
        window.location = "/login"
    }

    const [getCandidate, setgetCandidate] = useState([])
    const [currentPage, setCurrentPage] = useState(0)
    const [showCandidates, setshowCandidates] = useState([])
    const [countPage, setCountPage] = useState([])
    const inputRef = useRef(null)
    const [filterText, setFilterText] = useState("")
    const [test, setTest] = useState("")

    useEffect(() => {
        axios.get(url.Mainurl + url.getCandidate).then((res) => {
            setCountPage(res.data.totalPages - 1)
            setshowCandidates(res.data.totalItems)
            axios.get(url.Mainurl + url.getCandidate + `?page=${currentPage}`).then((res) => {
                setgetCandidate(res.data.lists)
                setLoading(true)
            })

        })
    }, [])

    function Next() {
        setCurrentPage(currentPage + 1)
        axios.get(url.Mainurl + url.getCandidate + `?page=${currentPage + 1}`).then((res) => {
            setgetCandidate(res.data.lists.reverse())
        })
    }

    function Back() {
        setCurrentPage(currentPage - 1)
        axios.get(url.Mainurl + url.getCandidate + `?page=${currentPage - 1}`).then((res) => {
            setgetCandidate(res.data.lists.reverse())
        })
    }

    function FirstPage() {
        setCurrentPage(0)
        axios.get(url.Mainurl + url.getCandidate + `?page=${0}`).then((res) => {
            setgetCandidate(res.data.lists.reverse())
        })
    }

    function LastPage() {
        setCurrentPage(countPage)
        axios.get(url.Mainurl + url.getCandidate + `?page=${countPage}`).then((res) => {
            setgetCandidate(res.data.lists.reverse())
        })
    }

    let x = 12 * currentPage + 1

    function search(event) {
        setFilterText(event.target.value)
        axios.get(url.Mainurl + url.getCandidate + `?phone=${filterText}`).then((res) => {
            setgetCandidate(res.data.lists.reverse())
        })
    }

    function searchVillge(event) {
        setTest(event.target.value)
    }

    function Delete(id) {
        Swal.fire({
            title: 'ລົບຂໍ້ມູນຜູ້ມີສິດສຸມ?',
            text: "ທ່ານຈະບໍ່ສາມາດນຳກັບຄືນມາໄດ້!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'ລົບຂໍ້ມູນ!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(url.Mainurl + url.candidates + id).then(() => {
                    Swal.fire(
                        'ລົບຂໍ້ມູນສຳເລັດ!',
                        'ໄຟລ໌ຂອງທ່ານໄດ້ຖືກລຶບແລ້ວ.',
                        'success'
                    )
                })
            }
        })
    }

    // function reset() {
    //     inputRef.current.value = "";
    //     axios.get(url.Mainurl + url.getBil).then((res) => {
    //         setCountPage(res.data.totalPages-1)
    //         setCurrentPage(res.data.totalPages-1)
    //         let page = res.data.totalPages
    //         axios.get(url.Mainurl + url.getBil+`?page=${page-1}`).then((res) => {
    //             setgetCandidate(res.data.lists)
    //             // setLoading(true)
    //         })
    //     })
    // }

    return (
        <div>
            {loading === true ? <div className="content-wrapper">
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-header">
                                            <h4><strong>ຂໍ້ມູນຜູ້ມີສິດສຸ່ມ</strong></h4>
                                        </div>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-header">
                                        <div className='row'>
                                            <div className='col-md-4'>
                                                <h3 className="card-title">ລາຍຊື່ຜູ້ມີສິດສຸ່ມລວມ ( <strong className='text-danger'>{showCandidates}</strong> )</h3>
                                            </div>
                                            <div className="col-md-4 form-group input-group-sm">
                                                <NumericFormat ref={inputRef} onChange={search} min={0} name="table_search" className="form-control text" placeholder="ຄົ້ນຫາດ້ວຍເລກເບີຕິດຕໍ່..." />
                                            </div>
                                            <div className="col-md-4 form-group input-group-sm">
                                               <div className='input-group input-group-sm'>
                                                    <input ref={inputRef} onChange={searchVillge} min={0} type="text" name="table_search" className="form-control  text" placeholder="ຄົ້ນຫາດ້ວຍບ້ານ..." />
                                                    <button type="submit" className="btn btn-default btn-outline-dark input-group-text ml-2">Reset</button>
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
                                                    <th>ຊື່ ແລະ ນາມສະກຸນ</th>
                                                    <th>ເບີຕິດຕໍ່</th>
                                                    <th>ບ້ານ</th>
                                                    <th>ເມືອງ</th>
                                                    <th>ແຂວງ</th>
                                                    <th>ຈັດການ</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {getCandidate.filter(items => items.village.toLowerCase().includes(test)).map((item) =>
                                                    <tr>
                                                        <td>{x++}</td>
                                                        <td>{item.fullName}</td>
                                                        <td>{item.phone}</td>
                                                        <td>{item.village}</td>
                                                        <td>{item.province.name}</td>
                                                        <td>{item.district.name}</td>
                                                        <td className='col-1'>
                                                            <EditCandidates_eligibility id={item.id}/>&nbsp;
                                                            <a className='btn btn-sm btn-danger' onClick={(e) => Delete(item.id)}><i class="bi bi-trash3"></i></a>
                                                        </td>
                                                    </tr>

                                                )}
                                                {/* {getCandidate.map((item) => (
                                               
                                            ))} */}
                                            </tbody>

                                        </table>
                                        <div className='customPagination d-flex py-2'>
                                            <button onClick={Back} className={`mx-2 px-2 btn btn-primary`} disabled={currentPage === 0 ? true : false}>Back</button>
                                            <span onClick={FirstPage} className='mt-2 btn btn-sm btn-outline-light text-dark'> <i class="bi bi-chevron-double-left"></i> 1</span>
                                            <span className='mt-2 btn btn-sm'>ຫນ້າທີ {currentPage + 1}</span>
                                            <span onClick={LastPage} className='mt-2 btn btn-sm btn-outline-light text-dark'> {countPage + 1} <i class="bi bi-chevron-double-right"></i></span>
                                            <button onClick={Next} className={`mx-2 px-2 btn btn-sm btn-primary`} disabled={currentPage === countPage ? true : false}>Next</button>
                                        </div>

                                    </div>

                                    {/* /.card-body */}
                                </div>
                                {/* /.card */}
                            </div>
                        </div>

                    </div>
                </div>
            </div>: <Spinner/>}
        </div>
    )
}

export default Candidates_eligibility