import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import HTMLReactParser from 'html-react-parser'
import {  MODAL_ACTION_CLOSE, MODAL_ACTION_CONFIRM } from 'utilities/constants'

function ConfirmModal(props) {
    const { title, content, show, onAction } = props

    return (
        <Modal 
            show={show} 
            onHide={() => onAction('close')}
            backdrop="static"
            keyboard={false}
            animation={false}
        >
            <Modal.Header closeButton>
                <Modal.Title className="h5">{HTMLReactParser(title)}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{HTMLReactParser(content)}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => onAction(MODAL_ACTION_CLOSE)}>
                    Hủy bỏ
                </Button>
                <Button variant="primary" onClick={() => onAction(MODAL_ACTION_CONFIRM)}>
                    Đồng ý
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
export default ConfirmModal