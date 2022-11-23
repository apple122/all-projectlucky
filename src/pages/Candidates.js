import axios from 'axios'
import React, { useEffect, useState, useRef } from 'react'
import { NumericFormat, NumberFormatBase } from 'react-number-format';
import { Link } from 'react-router-dom'
import url from '../components/API-links/apiurl'
import Spinner from '../components/uitilities/Spinner'
import DataTable from 'react-data-table-component'
import '../assets/css/customPagination.css'
import { height } from '@mui/system'
import EditCandidates from './EditCandidates';

const Candidates = () => {
    const token = localStorage.getItem('myToken')
    const [loading, setLoading] = useState(false)
    if(!token) {
      window.location = "/login"
    }
    const [showCandidates, setshowCandidates] = useState([])
    const [countPage, setCountPage] = useState([])
    const [filterText, setFilterText] = useState("")
    const [currentPage, setCurrentPage] = useState(0)
    const inputRef = useRef(null)
    let totalPage = countPage-1
    let data = showCandidates
    useEffect(() => {
        Candidateslist()
    },[])
    
    const Candidateslist = async() => {
        await axios.get(url.Mainurl + url.getBil).then((res) => {
            setCountPage(res.data.totalPages-1)
            setCurrentPage(res.data.totalPages-1)
            let page = res.data.totalPages
            axios.get(url.Mainurl + url.getBil+`?page=${page-1}`).then((res) => {
                setshowCandidates(res.data.lists)
                setLoading(true)
            })
        })
        
    }

    let sort = showCandidates.sort(function(a, b){
        return b.id-a.id
      })

    function search(event) {
        console.log(filterText)
        setFilterText(event.target.value)
        axios.get(url.Mainurl + url.getBil+`?bil_number=${filterText}`).then((res) => {
            setshowCandidates(res.data.lists)
        })
    }

    function Next() {
        setCurrentPage(currentPage+1)
        axios.get(url.Mainurl + url.getBil+`?page=${currentPage+1}`).then((res) => {
            setshowCandidates(res.data.lists)
        })
    }

    function Back() {
        setCurrentPage(currentPage-1)
        axios.get(url.Mainurl + url.getBil+`?page=${currentPage-1}`).then((res) => {
            setshowCandidates(res.data.lists)
        })
    }

    function FirstPage() {
        setCurrentPage(0)
        axios.get(url.Mainurl + url.getBil + `?page=${0}`).then((res) => {
            setshowCandidates(res.data.lists.reverse())
        })
    }

    function LastPage() {
        setCurrentPage(countPage)
        axios.get(url.Mainurl + url.getBil + `?page=${countPage}`).then((res) => {
            setshowCandidates(res.data.lists.reverse())
        })
    }

    function reset() {
        inputRef.current.value = "";
        axios.get(url.Mainurl + url.getBil).then((res) => {
            setCountPage(res.data.totalPages-1)
            setCurrentPage(res.data.totalPages-1)
            let page = res.data.totalPages
            axios.get(url.Mainurl + url.getBil+`?page=${page-1}`).then((res) => {
                setshowCandidates(res.data.lists)
                setLoading(true)
            })
        })
    }

    let x = 12 * currentPage + 1

    return (
        <div>
        {loading === true ?  <div className="content-wrapper">
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-header">
                                        <Link to="/add-candidate" className="card-title btn btn-success float-right">ເພິ່ມຜູ້ມີສິດສຸ່ມ</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title">ລາຍຊື່ຜູ້ມີສິດສຸ່ມ</h3>
                                    <div className="card-tools">
                                        <div className="input-group input-group-sm" style={{ width: 500 }}>
                                            <NumericFormat ref={inputRef} onChange={search} min={0} name="table_search" className="form-control float-right text" placeholder="ຄົ້ນຫາດ້ວຍເລກບິນ..." />
                                            <div className="input-group-append">
                                                <button onClick={reset} type="submit" className="btn btn-default">
                                                    Reset
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* /.card-header */}
                                
                                <div className="card-body table-responsive p-0">
                                    {/* <DataTable
                                    columns={columns}
                                    data={data}
                                    defaultSortFieldId="name"
                                    striped
                                    pagination
                                    subHeader
                                    /> */}
                                    <table className="table table-hover text-nowrap">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>ຊື່ ແລະ ນາມສະກຸນ</th>
                                                <th>ເລກບິນ</th>
                                                <th>ມູນຄ່າໃບບິນ</th>
                                                <th>ເບີຕິດຕໍ່</th>
                                                <th>ບ້ານ</th>
                                                <th>ເມືອງ</th>
                                                <th>ແຂວງ</th>
                                                <th>ຈັດການ</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {sort.map((item,index) => (
                                                 <tr key={index}>
                                                 <td valign='center'>{x++}</td>
                                                 <td>{item.candidate.fullName}</td>
                                                 <td>{item.bil_number}</td>
                                                 <td>{parseInt(item?.bil_price).toLocaleString()} ກີບ</td>
                                                 <td>{item.candidate.phone}</td>
                                                 <td>{item.candidate.village}</td>
                                                 <td>{item.candidate.district.name}</td>
                                                 <td>{item.candidate.province.name}</td>
                                                 <td>
                                                    <EditCandidates id={item.id}/>&nbsp;

                                                 </td>
                                             </tr>
                                            ))}
                                           
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
        </div> : <Spinner/>}
        </div>
    )
}

export default Candidates