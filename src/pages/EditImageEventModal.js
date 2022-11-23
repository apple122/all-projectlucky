import React, { useState,useEffect } from 'react'
import {Modal, Button,Form} from 'react-bootstrap'
import axios from 'axios'
import Swal from 'sweetalert2'
import url from '../components/API-links/apiurl'

function EditImageEventModal(props) {
    const token = localStorage.getItem('myToken')
    if(!token) {
      window.location = "/login"
    }
    const eventdetail = props.id
    const [Image, setImage]= useState('')
    const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    axios.get(url.Mainurl + url.getsingleEvent + eventdetail).then((res) => {
        setImage(res.data.image)
    })
},[])

const UpdateEvent = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('image', Image)
    Swal.fire({
        title: 'ທ່ານຈະແກ້ໄຂແທ້ບໍ່?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ແກ້ໄຂ',
        cancelButtonText: 'ຍົກເລີກ'
      }).then((result) => {
        if (result.isConfirmed) {
            axios.put(url.Mainurl + url.updateEvent + eventdetail, formData).then((res) => {
                Swal.fire({
                    icon: 'success',
                    title: 'ແກ້ໄຂຣູບພາບສຳເລັດ!',
                    confirmButtonText: 'OK'
                }).then((res) => {
                    if(res.isConfirmed) {
                        window.location = "/event"
                    } else {
                        window.location = "/event"
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
  return (
    <div>
        <Button  variant="primary" onClick={handleShow}>
           <i className="fas fa-edit">ຣູບພາບ</i> 
        </Button>
        <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>ແກ້ໄຂຣູບພາບກິດຈະກຳ</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={UpdateEvent} method='PUT' encType='multipart/form-data'>
                       
                   
                       
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
    </div>
  )
}

export default EditImageEventModal