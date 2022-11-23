/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState,useEffect } from 'react'
import {Modal, Button,Form} from 'react-bootstrap'
import axios from 'axios'
import Swal from 'sweetalert2'
import url from '../components/API-links/apiurl'
import { useNavigate } from 'react-router-dom'

export const EditUserModal = (props) => {
    const userID = props.id
    const user_name = props.username
    // console.log(userDetail)
    // console.log(totalPage)
    const token = localStorage.getItem('myToken')
    if(!token) {
      window.location = "/login"
    }

    const User = ["User"];
    const Employee = ["Employee"];
    const Admin = ["Admin"];
    const [username, setUsername]= useState("")
    const [fullName, setFullName] = useState("")
    const [email, setEmail]= useState("")
    const [phoneNumber] = useState("")
    const [password, setPassword]= useState('')
    const [role, setRole]= useState([])
    const [formValue, setformValue]= useState([])
    const [formValues, setformValues]= useState({})


    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        axios.get(url.Mainurl + url.getSingleUser).then((res) => {
            setformValue(res.data.lists)
      })
    },[])

    let navigate = useNavigate()

    const handleChange = (e) => {
        const {name, value}= e.target
        setformValues({...formValues, [name]: value})
    }
    
    const UpdateUser = (e) => {
        e.preventDefault()
        Swal.fire({
            title: 'ທ່ານຈະແກ້ໄຂຂໍ້ມູນແທ້ບໍ່?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'ແກ້ໄຂ'
          }).then((result) => {
            if (result.isConfirmed) {
                axios.put(url.Mainurl + url.updateUser + userID, formValues).then((res) => {
                    // console.log(res)
                    Swal.fire({
                        icon: 'success',
                        title: 'ແກ້ໄຂສຳເລັດ!!',
                        confirmButtonText: 'OK!'
                    }).then((res) => {
                        if(res.isConfirmed) {
                            setShow(false)
                            return navigate("/reloadUser")
                        } else if (res.isDismissed) {
                            setShow(false)
                            return navigate("/reloadUser")
                        }
                    })
                }).catch(() => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Something went wrong',
                        timer: 2000
                    })
                })
            }
          })
    }

    return(
        <>
        <Button variant='primary' onClick={handleShow}>
            <i className='fas fa-edit'>ແກ້ໄຂ</i>
        </Button>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>ແກ້ໄຂຂໍ້ມູນ User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={UpdateUser} method='PUT'>
                <Form.Group>
                        <Form.Label>ຊື່ ແລະ ນາມສະກຸນ</Form.Label>
                        <Form.Control name='fullname' onChange={handleChange} type='text' required></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>ເບີຕິດຕໍ່</Form.Label>
                        <Form.Control name='phone' onChange={handleChange} type='number' required></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control ame='username' onChange={handleChange} type='text' required></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control name='email' onChange={handleChange} type='email' required></Form.Control>
                    </Form.Group>
                    {/* <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control defaultValue={formValue.filter((item) => item.id === userDetail).map((e) => e.password)} name='password' onChange={handleChange} type='password'></Form.Control>
                    </Form.Group> */}
                    <div>
                    <Form.Group>
                        <Form.Label>Role</Form.Label>
                        <Form.Select  className='col-md p-2' onChange={handleChange} required>
                            <option>--ເລືອກ Role--</option>
                            <option value={formValues.User}>{User}</option>
                            <option value={formValues.Employee}>{Employee}</option>
                            <option value={formValues.Admin}>{Admin}</option>
                        </Form.Select>
                    </Form.Group>
                    </div>
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

export default EditUserModal