import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import url from '../components/API-links/apiurl'
import Swal from 'sweetalert2'
import { NumberFormatBase } from 'react-number-format'
import { useNavigate } from 'react-router-dom'

const CreateCandidate = () => {
    const fullName = localStorage.getItem('fullName')
    const province_id = localStorage.getItem('Province_id')
    const district_id = localStorage.getItem('district_id')
    const village_name = localStorage.getItem('village')
    const phone_number = localStorage.getItem('phone')
    const checkInput = localStorage.getItem('checkInput')
    const [candidate, setCandidate] = useState([])
    const [province, setProvince] = useState([])
    const [district, setDistrict] = useState([])
    const [name, setName] = useState(checkInput ? fullName : "")
    const [phone, setPhone] = useState(checkInput ? phone_number : "")
    const [village, setVillage] = useState(checkInput ? village_name : "")
    const [inputDistrict, getDistrict] = useState(checkInput ? district_id : null)
    const [inputProvince, getProvince] = useState(checkInput ? province_id : null)
    const [checkPhoneNumber, setCheckPhoneNumber] = useState(false)
    let DistrictId = parseInt(inputDistrict)
    let ProvinceId = parseInt(inputProvince)
    // console.log(ProvinceId)
    // console.log(DistrictId)

    useEffect(() => {
        const getData1 = async () => {
            const data = await axios.get(url.Mainurl + url.getDistrict).then((res) => {
                setDistrict(res.data)
            })
        }

        const getData2 = async () => {
            const data = await axios.get(url.Mainurl + url.getProvince).then((res) => {
                setProvince(res.data)
            })

        }
        getData1()
        getData2()
    }, [])

    // function checkPhone(event) {
    //     setPhone(event.target.value)
    //     axios.get(url.Mainurl + url.getCandidate + `?phone=${phone}`).then(res => {
    //         setCandidate(res.data.lists)
    //     })
    // }

    let navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        // setFormValue(formValue)
        localStorage.setItem('fullName', name)
        localStorage.setItem('Province_id', ProvinceId)
        localStorage.setItem('district_id', DistrictId)
        localStorage.setItem('village', village)
        localStorage.setItem('phone', phone)
        localStorage.setItem('checkInput', 1)
       
        return navigate("/add-bil")
    }

    function clearData() {
        localStorage.removeItem('fullName')
        localStorage.removeItem('province_id')
        localStorage.removeItem('district_id')
        localStorage.removeItem('village')
        localStorage.removeItem('phone')
        localStorage.removeItem('checkInput')
    }

    return (
        <div className="content-wrapper">
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row">
                        {/* left column */}
                        <div className="col-md-12">
                            {/* general form elements */}
                            <div className="card card-primary">
                                <div className="card-header">
                                    <h3 className="card-title">ເພິ່ມຂໍ້ມູນຜູ້ມີສິດສຸ່ມ</h3>
                                </div>
                                {/* /.card-header */}
                                {/* form start */}
                                <form onSubmit={handleSubmit} method="POST" encType='multipart/form-data'>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1">ຊື່ ແລະ ນາມສະກຸນ</label>
                                                    <input onChange={e => setName(e.target.value)} defaultValue={name} type="text" className="form-control" name='name' placeholder="Enter Name" required/>
                                                </div>
                                            </div>
                                            {/* <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputFile">ຣູບພາບ</label>
                                                    <div className="input-group">
                                                        <div className="custom-file">
                                                            <input onChange={e => setImage(e.target.value)} type="file" className="custom-file-input" id="exampleInputFile" />
                                                            <label className="custom-file-label" htmlFor="exampleInputFile">Choose file</label>
                                                        </div> */}
                                            {/* <div className="input-group-append">
                                                            <span className="input-group-text">Upload</span>
                                                        </div> */}
                                            {/* </div>
                                                </div>
                                            </div> */}

                                            {/* <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1">ຈຳນວນມູນຄ່າບິນ</label>
                                                    <input onChange={e => setAmount(e.target.value)} type="number" className="form-control" placeholder="Enter bill price" />
                                                </div>
                                            </div> */}
                                            {/* <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1">ງວດທີ</label>
                                                    <input onChange={e => setTimes(e.target.value)} type="text" className="form-control" placeholder="Enter lottery period" />
                                                </div>
                                            </div> */}
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>ເບີໂທ</label>
                                                    <NumberFormatBase onChange={e => setPhone(e.target.value)} defaultValue={phone} className="form-control" min={0} placeholder="ຕົວຢ່າງ 020xxx..." required />
                                                    {/* <p>{candidate.filter(e => e.phone == phone).map(e => <p className='text-danger'>ເບີ {phone} ມີຄົນໃຊ້ໄປແລ້ວ</p>)}</p> */}
                                                </div>
                                            </div>
                                            {/* <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1">ເດືອນ/ວັນ/ປີ ຣ່ວມຫລິ້ນກິດຈະກຳ</label>
                                                    <input onChange={e => setDate(e.target.value)} type="date" className="form-control" placeholder="Enter Date" required/>
                                                </div>
                                            </div> */}
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1">ບ້ານ</label>
                                                    <input onChange={e => setVillage(e.target.value)} defaultValue={village} type="text" className="form-control" placeholder="Enter Village" required />
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1">ແຂວງ</label>
                                                    <select className="form-control" name='province_id' onChange={e => getProvince(e.target.value)} required>
                                                        {checkInput ? <option value={inputProvince}>{province.filter(a => a.id == province_id).map((e) => e.name)}</option> : <option value={""}>--ກະລຸນາເລືອກແຂວງ--</option>}

                                                        {province.map((e) =>
                                                            <option key={e.id} value={e.id}>{e.name}</option>
                                                        )}
                                                    </select>
                                                    {/* <input type="text" className="form-control" placeholder="Enter Province" /> */}
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1">ເມືອງ</label>
                                                    <select className="form-control" name='district_id' onChange={e => getDistrict(e.target.value)} required>
                                                        {checkInput ? <option value={inputDistrict}>{district.filter(a => a.id == inputDistrict).map((e) => e.name)}</option> : <option value={""}>--ກະລຸນາເລືອກເມືຶອງ--</option>}
                                                        {district.filter((e) => e.provinceId === ProvinceId).map((e) =>
                                                            <option key={e.id} value={e.id}>{e.name}</option>
                                                        )}
                                                    </select>
                                                    {/* <input type="text" className="form-control" placeholder="Enter District" /> */}
                                                </div>
                                            </div>
                                            {/* <div className="col-md-6">
                                                <div id='addBil' className="form-group">
                                                    <label htmlFor="exampleInputEmail1">ເລກບິນ</label>
                                                    <div className='d-flex'> */}
                                            {/* <input onChange={e => setBil(e.target.value)} type="text" className="form-control" placeholder="Enter bill number" /> */}
                                            {/* <button onClick={addBil} type='button' className='px-4 btn btn-primary'> <i className="nav-icon fa fa-plus" /> </button> */}
                                            {/* </div>
                                                </div> */}
                                            {/* </div> */}
                                        </div>
                                    </div>
                                    {/* /.card-body */}
                                    <div className="card-footer">
                                        <Link onClick={clearData} to="/candidates" className="btn btn-danger">Cancel</Link>
                                        <button type="submit" className="btn btn-success float-right">ຕໍ່ໄປ</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default CreateCandidate