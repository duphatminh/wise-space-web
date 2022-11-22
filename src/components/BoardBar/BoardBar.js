import React from 'react';
import { Container as BootstrapContainer, Row, Col} from 'react-bootstrap'
import './BoardBar.scss'

function BoardBar() {
    return (
        <nav className='navbar-board'>
            <BootstrapContainer className="wise-space-container">
                <Row>
                    <Col sm={10} xs ={12} className="col-no-padding">
                        <div className="board-info">
                            <div className="item board-logo-icon"><i className="fa fa-coffe"></i>&nbsp;&nbsp;<strong>Quản lý đồ án</strong></div>
                            <div className="divider"></div>
                            
                            <div className="item board-type">Không gian làm việc riêng tư</div>
                            <div className="divider"></div> 
                            <div className="item invite">Bộ Lọc</div>
                        </div>
                    </Col>
                    <Col sm={2} xs={12} className="col-no-padding">
                        <div className="board-actions">
                            <div className="item menu"><i className="fa fa-ellipsis-h mr-2"></i> Hiển thị tác vụ</div>
                        </div>
                    </Col>
                </Row>
            </BootstrapContainer>
        </nav>
    )
}

export default BoardBar