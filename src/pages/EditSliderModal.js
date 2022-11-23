/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import axios from 'axios'
import Swal from 'sweetalert2'
import url from '../components/API-links/apiurl'
import { useNavigate } from 'react-router-dom'

export const EditSliderModal = (props) => {
    const sliderDetail = props.id
    const name = props.name
    const image = props.image
    const token = localStorage.getItem('myToken')
    if (!token) {
        window.location = "/login"
    }
    const [Name, setName] = useState(name)
    const [Image, setImage] = useState([])
    const [show, setShow] = useState(false);
    const [preview, setPreview] = useState()
    const [slider, setSlider] = useState([])
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



    useEffect(() => {
        const SliderList = () => {
            axios.get(url.Mainurl + url.getBanner).then((res) => {
                // console.log(res.data)
                setSlider(res.data)
            })
        }
        SliderList()
    }, [])

    let navigate = useNavigate()

    const SliderUpdate = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('name', Name)
        formData.append('image', Image)
        Swal.fire({
            title: 'ທ່ານຈະແກ້ໄຂຂໍ້ມູນແທ້ຫລືບໍ່?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'ແກ້ໄຂ',
            cancelButtonText: 'ຍົກເລີກ'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.put(url.Mainurl + url.updateBanner + sliderDetail, formData).then((res) => {
                    Swal.fire({
                        icon: 'success',
                        title: 'ແກ້ໄຂຂໍ້ມູນສຳເລັດ!',
                        confirmButtonText: 'OK!'
                    }).then((res) => {
                        if (res.isConfirmed) {
                            setShow(false)
                            return navigate("/reloadSlider")
                        } else {
                            setShow(false)
                            return navigate("/reloadSlider")
                        }
                    })
                }).catch(() => {
                    Swal.fire({
                        icon: 'error',
                        title: 'ເກີດຂໍ້ຜິດພາດ',
                        timer: 2000
                    })
                })
            }
        })

    }

    function imageHandler(e) {
        setImage(e.target.files[0])
        setPreview(e.target.files[0])
    }

    return (
        <>

            <Button variant='primary' onClick={handleShow}>
                <i className='fas fa-edit'>Edit</i>
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>ແກ້ໄຂ Slide </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={SliderUpdate} method='PUT' encType='multipart/form-data'>
                        <Form.Group>
                            <Form.Label>ຊື່ Slide</Form.Label>
                            <Form.Control defaultValue={slider.filter((e) => e.id === sliderDetail).map((e) => e.name)} onChange={(e) => setName(e.target.value)} type='text'></Form.Control>
                        </Form.Group>
                        <Form.Group className="my-3" controlId="eventid">
                            <Form.Label>ປ່ຽນຣູບພາບ</Form.Label>
                            <div >
                                <input className='form-control' onChange={imageHandler} type='file' accept='image/*'></input>
                            </div>
                        </Form.Group>

                        <Form.Group className="my-3" controlId="eventid">
                            {preview ? <div className="input-group mt-3">
                                <p>ຣູບຕົວຢ່າງ</p>
                            </div> : ""}
                            <div className="input-group mt-1">

                                {preview && (
                                    <>
                                        <img className='float-left' style={{maxWidth: 100+'%', height: 100+'%'}} src={URL.createObjectURL(preview)} alt={Image} />
                                    </>
                                )}
                                {preview === null }
                                    
                                
                            </div>
                        </Form.Group>

                        <Modal.Footer>
                            <Button variant="primary" type='submit'>
                                ແກ້ໄຂ
                            </Button>
                            <Button variant="danger" onClick={handleClose}>
                                ປິດ
                            </Button>
                        </Modal.Footer>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default EditSliderModal