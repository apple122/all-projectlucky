import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import url from '../components/API-links/apiurl'
import Swal from 'sweetalert2'
import Select from 'react-select'
import Spinner from './uitilities/Spinner'
import { NumberFormatBase } from 'react-number-format'

function CreateBil() {
   
    // const [candidate, setCandidate] = useState([])
    const [checkCandidate, getCheckCandidate] = useState([])
    const [image, setImage] = useState()
    const [bil, setBil] = useState()
    const [amount, setAmount] = useState()
    const [loading, setLoading] = useState(false)


    let convertAmount = parseInt(amount);
    let totalPage = null;
    let candidate;
    let sliceData;

    const fullName = localStorage.getItem('fullName')
    const province_id = localStorage.getItem('Province_id')
    const district_id = localStorage.getItem('district_id')
    const village_name = localStorage.getItem('village')
    const phone_number = localStorage.getItem('phone')
    const checkInput = localStorage.getItem('checkInput')
    // console.log('fullName', fullName)
    //     console.log('province_id', province_id)
    //     console.log('district_id', district_id)
    //     console.log('village', village_name)
    //     console.log('phone',  phone_number)
    //     console.log('input', checkInput)
    

    useEffect(() => {
        axios.get(url.Mainurl + url.getCandidate + `?phone=${phone_number}`).then(res => {
            getCheckCandidate(res.data.lists)
            setLoading(true)
            axios.post(url.Mainurl + url.postCandidate, {
                fullName: fullName,
                province_id: province_id,
                district_id: district_id,
                village: village_name,
                phone: phone_number
            }).then(res => {
                setLoading(true)
            }).catch((err) => {
                setLoading(true)
                console.log(err.message)
            })
            // console.log('checkCandidate', res.data.lists)
        })

        // axios.get(url.Mainurl + url.getCandidate).then((res) => {
        //     totalPage = res.data.totalPages
        //     console.log('page', totalPage)
        //     axios.get(url.Mainurl + url.getCandidate + `?page=${totalPage - 1}`).then((res2) => {
        //         setCandidate(res2.data.lists)
        //     }).catch((err) => {
        //         console.log(err)
        //     })
        // })
    }, [])

    let navigate = useNavigate()
    if (!checkInput) {
        return navigate("/candidates")
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(false)
        if (checkCandidate.length === 0) {
            const secondProcess =  () => {
                axios.get(url.Mainurl + url.getCandidate).then((res) => {
                    totalPage = res.data.totalPages-1
                    // console.log('page', totalPage)
                }).then(() => {
                    axios.get(url.Mainurl + url.getCandidate + `?page=${totalPage}`).then((res2) => {
                        candidate = res2.data.lists.reverse()
                        let candidateOne = candidate.sort(function (a, b) {
                            return b.id - a.id
                        })
                        sliceData = candidateOne.slice(0, 1)
        
                        axios.post(url.Mainurl + url.postBil, {
                            'bil_number': bil,
                            'bil_price': convertAmount,
                            'bil_pic': image,
                            'candidate_id': candidate[0].id,
                        }).then(res => {
                            // console.log(res)
                            setLoading(true)
                            Swal.fire({
                                icon: 'success',
                                title: 'ເພິ່ມບິນແລະຜູ້ມີສິດສຸ່ມສຳເລັດ!',
                                showCancelButton: true,
                                confirmButtonColor: '#3085d6',
                                cancelButtonColor: '#d33',
                                confirmButtonText: 'ເພິ່ມບິນອີກ',
                                cancelButtonText: 'ອອກ',
                                showCloseButton: true,
        
                            }).then((result) => {
                                if(result.isConfirmed) {
                                    return navigate("/add-bil")
                                } else if (result.isDismissed) {
                                    localStorage.removeItem('fullName')
                                    localStorage.removeItem('Province_id')
                                    localStorage.removeItem('district_id')
                                    localStorage.removeItem('village')
                                    localStorage.removeItem('phone')
                                    localStorage.removeItem('checkInput')
        
                                    return navigate("/candidates")
                                }
        
                            })
                        }).catch(() => {
                            Swal.fire({
                                icon: 'error',
                                title: 'ເກີດຂໍ້ຜິດພາດ',
                                cancelButtonText: 'close',
                                timer: 2000
                            })
                        })
                    }).catch((err) => {
                        console.log(err)
                    })
                })
               
            }
            
            // const thirdProcess = async () => {
            //     await 
               
            // }

            secondProcess()
            // thirdProcess()
        } else if (checkCandidate.length > 0){
            setLoading(false)
            axios.post(url.Mainurl + url.postBil, {
                'bil_number': bil,
                'bil_price': convertAmount,
                'bil_pic': image,
                'candidate_id': checkCandidate[0].id,
            }).then(res => {
                // console.log(res)
                setLoading(true)
                Swal.fire({
                    icon: 'success',
                    title: 'ເພິ່ມບິນສຳເລັດ!',
                    showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'ເພິ່ມບິນອີກ',
                        cancelButtonText: 'ອອກ',
                        showCloseButton: true,
                        timer: 2000
                }).then((result) => {
                    if(result.isDismissed) {
                        localStorage.removeItem('fullName')
                        localStorage.removeItem('Province_id')
                        localStorage.removeItem('district_id')
                        localStorage.removeItem('village')
                        localStorage.removeItem('phone')
                        localStorage.removeItem('checkInput')
    
                        return navigate("/candidates")
                    } else if (result.isConfirmed) {
                        return navigate("/add-bil")
                    }
                })
            }).catch(() => {
                Swal.fire({
                    icon: 'error',
                    title: 'something went wrong',
                    cancelButtonText: 'close',
                    timer: 2000
                })
            })
        }
        // setFormValue(formValue)


    }

    return (
        <div>
        {loading === true ? <div className="content-wrapper">
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row">
                        {/* left column */}
                        <div className="col-md-12">
                            {/* general form elements */}
                            <div className="card card-primary">
                                <div className="card-header">
                                    <h3 className="card-title">ເພິ່ມບິນ</h3>
                                </div>
                                {/* /.card-header */}
                                {/* form start */}
                                <form onSubmit={handleSubmit} method="POST" encType='multipart/form-data'>
                                    <div className="card-body">
                                        <div className="row">

                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1">ເລກບິນ</label>
                                                    <NumberFormatBase onChange={e => setBil(e.target.value)} min={0} className="form-control" placeholder="Enter bill price" required/>
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1">ຈຳນວນມູນຄ່າບິນ</label>
                                                    <NumberFormatBase onChange={e => setAmount(e.target.value)} className="form-control" placeholder="Enter bill price" min={10000} required/>
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputFile">ຣູບໃບບິນ</label>
                                                    <div className="input-group">
                                                        <div className="custom-file">
                                                            <input onChange={e => setImage(e.target.value)} type="file" className="form-control" id="exampleInputFile" />
                                                        </div>
                                                        {/* <div className="input-group-append">
                                                    <span className="input-group-text">Upload</span>
                                                </div> */}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1">ຊື່ຜູ້ມີສິດສຸ່ມ</label>
                                                    <input value={checkInput ? fullName : ""} className='form-control' disabled />
                                                    {/* <select className="form-control" name='province_id' onChange={e => getDistrict(e.target.value)} >
                                                <option>--ກະລຸນາເລືອກຜູ້ມີສິດສຸ່ມ--</option>
                                                {province.map((e) => 
                                                <option key={e.id} value={e.id}>{e.name}</option>
                                                )}
                                            </select> */}
                                                    {/* <input type="text" className="form-control" placeholder="Enter Province" /> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* /.card-body */}
                                    <div className="card-footer">
                                        <button type="submit" className="btn btn-success float-right">ເພິ່ມຂໍ້ມູນ</button>
                                        <Link to="/add-candidate" className="btn btn-danger">ຍ້ອນກັບ</Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div> : <Spinner/>} 
        </div>
    )
}

export default CreateBil