import React from 'react'
import Router from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import { Container, Row, Col, Nav, NavItem, Button, Form, NavLink, Collapse,
         Navbar, NavbarToggler, NavbarBrand, Modal, ModalHeader, ModalBody,
         ModalFooter, ListGroup, ListGroupItem } from 'reactstrap'
import Signin from './signin'
import { NextAuth } from 'next-auth/client'
import Cookies from 'universal-cookie'
import Package from '../package'
import Styles from '../css/index.scss'
import {MainBody} from './MainBody'
import {UserMenu} from './UserMenu'
import {SigninModal } from './SigninModal'

export default class extends React.Component {

  static propTypes() {
    return {
      session: React.PropTypes.object.isRequired,
      providers: React.PropTypes.object.isRequired,
      children: React.PropTypes.object.isRequired,
      fluid: React.PropTypes.boolean,
      navmenu: React.PropTypes.boolean,
      signinBtn: React.PropTypes.boolean
    }
  }
  
  constructor(props) {
    super(props)

    this.controllers = props.controllers;
    this.state = {
      navOpen: false,
      modal: false,
      providers: null
    }
    this.toggleModal = this.toggleModal.bind(this)
  }
  

  async toggleModal(e) {
    if (e) e.preventDefault()

    // Save current URL so user is redirected back here after signing in
    if (this.state.modal !== true) {
      const cookies = new Cookies()
      cookies.set('redirect_url', window.location.pathname, { path: '/' })
    }

    this.setState({
      providers: this.state.providers || await NextAuth.providers(),
      modal: !this.state.modal
    })
  }
  
  render() {
    return (
      <React.Fragment>
        <Head>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1"/>
          <title>{this.props.title || 'Next.js Starter Project'}</title>
          <style dangerouslySetInnerHTML={{__html: Styles}}/>
          <script src="https://cdn.polyfill.io/v2/polyfill.min.js"/>
        </Head>
        <Navbar light className="navbar navbar-expand-md pt-3 pb-3">
          <Link prefetch href="/">
            <NavbarBrand innerref ="/">
              <span className="icon ion-md-home mr-1"></span> {Package.name}
            </NavbarBrand>
          </Link>
          <input className="nojs-navbar-check" id="nojs-navbar-check" type="checkbox" aria-label="Menu"/>
          <label tabIndex="1" htmlFor="nojs-navbar-check" className="nojs-navbar-label mt-2" />
          <div className="nojs-navbar">
            <Nav navbar>
              <div tabIndex="1" className="dropdown nojs-dropdown">
                <div className="nav-item">
                  <span className="dropdown-toggle nav-link">Examples</span>
                </div>
                <div className="dropdown-menu">
                  <Link prefetch href ="/examples/authentication">
                    <a href="/examples/authentication" className="dropdown-item">Auth</a>
                  </Link>
                  <Link prefetch href ="/examples/async">
                    <a href="/examples/async" className="dropdown-item">Async Data</a>
                  </Link>
                  <Link prefetch href ="/examples/layout">
                    <a href="/examples/layout" className="dropdown-item">Layout</a>
                  </Link>
                  <Link prefetch href ="/examples/routing">
                    <a href="/examples/routing" className="dropdown-item">Routing</a>
                  </Link>
                  <Link prefetch href ="/examples/styling">
                    <a href="/examples/styling" className="dropdown-item">Styling</a>
                  </Link>
                </div>
              </div>
              <div className="nav-link">
                  <Link prefetch href="/page2">
                    <a href="page2" className="dropdown-item">Page 2</a>
                  </Link>
              </div>
            </Nav>
            <UserMenu session={this.props.session} toggleModal={this.toggleModal} signinBtn={this.props.signinBtn}/>
          </div>
        </Navbar>
        <MainBody navmenu={this.props.navmenu} fluid={this.props.fluid} container={this.props.container} onVCChanged = {this.props.onVCChanged}>
          {this.props.children}
        </MainBody>
        <Container fluid={this.props.fluid}>
          <hr className="mt-3"/>
          <p className="text-muted small">
            <Link href ="https://github.com/iaincollins/nextjs-starter">
              <a className="text-muted font-weight-bold"><span className="icon ion-logo-github"/> {Package.name} {Package.version}</a>
              </Link>
            <span> built with </span>
            <Link href ="https://github.com/zeit/next.js"><a className="text-muted font-weight-bold">Next.js {Package.dependencies.next.replace('^', '')}</a></Link>
            <span> &amp; </span>
            <Link href ="https://github.com/facebook/react"><a className="text-muted font-weight-bold">React {Package.dependencies.react.replace('^', '')}</a></Link>
            .
            <span className="ml-2">&copy; {new Date().getYear() + 1900}.</span>
          </p>
        </Container>
        <SigninModal modal={this.state.modal} toggleModal={this.toggleModal} session={this.props.session} providers={this.state.providers}/>
      </React.Fragment>
    )
  }
}




