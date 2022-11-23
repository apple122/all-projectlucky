import React, { useState } from "react";
import { Modal, Button, Form } from 'react-bootstrap'

export default function EditCandidates_eligibility (props) {

    const PropsUID = props.id 

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button className='btn btn-sm' onClick={handleShow}><i class="bi bi-card-checklist"></i> ເພີມບີນ</Button>
            <Modal show={show} onHide={handleClose} size="lg" aria-labelledby="contained-modal-title-vcenter">
                <Modal.Header closeButton>
                    <Modal.Title>ເພີມບີນ ຂໍ້ມູນຜູ້ມີສິດສຸ່ມ</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        {PropsUID}
                    </form>
                </Modal.Body>
                <Modal.Footer>

                </Modal.Footer>
            </Modal>
        </>
    )
}