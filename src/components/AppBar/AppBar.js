import React from 'react';
import './AppBar.scss'
import { Container as BootstrapContainer, Row, Col, InputGroup, FormControl } from 'react-bootstrap'
import logoAppBar from 'resources/Images/logo19.png'
import logoUser from 'resources/Images/userlogo.png'

function AppBar() {
    return (
        <nav className='navbar-app'>
            <BootstrapContainer className="wise-space-container">
                <Row>
                    <Col sm={5} xs ={12} className="col-no-padding">
                        <div className="app-actions">
                            <div className="item all"><i className="fa fa-th"/></div>
                            <div className="item home"><i className="fa fa-home"></i></div>
                            <div className="item boards"><i className="fa fa-columns"></i>&nbsp;&nbsp;<strong>Boards</strong></div>
                            <div className="item search">
                                <InputGroup className="group-search">
                                    <FormControl className="input-search" placeholder="Jump to..."></FormControl>
                                    <InputGroup.Text className="input-icon-search"><i className="fa fa-search"></i></InputGroup.Text>
                                </InputGroup>
                            </div>
                        </div>
                    </Col>
                    <Col sm={2} xs={12} className="col-no-padding">
                        <div className="app-branding text-center">
                            <a href="https://www.facebook.com/duphatminhh" target="blank">
                                <img 
                                    src= { logoAppBar }
                                    className="top-logo"
                                    alt="logo-Appbar">
                                </img>
                                <span className="wise-space-slogan">Wise Space</span>
                            </a>
                        </div>
                    </Col>
                    <Col sm={5} xs={12} className="col-no-padding">
                        <div className="user-actions">
                            <div className="item quick"><i className="fa fa-plus-square-o"></i></div>
                            <div className="item news"><i className="fa fa-info-circle"></i></div>
                            <div className="item notification"><i className="fa fa-bell-o"></i></div>
                            <div className="item user-avatar">
                                <img src= {logoUser} alt="avatar-wise-space" title="avatar" className="item avatar-user"></img>
                            </div>
                        </div>
                    </Col>
                </Row>
            </BootstrapContainer>
        </nav>
    )
}

export default AppBar