
import { Nav, NavItem, Button, Form } from 'reactstrap'
export class UserMenu extends React.Component {
    constructor(props) {
      super(props)
      this.handleSignoutSubmit = this.handleSignoutSubmit.bind(this)
    }
  
     async handleSignoutSubmit(event) {
       event.preventDefault()
       
       // Save current URL so user is redirected back here after signing out
       const cookies = new Cookies()
       cookies.set('redirect_url', window.location.pathname, { path: '/' })
  
       await NextAuth.signout()
       Router.push('/')
     }
     
    render() {
      if (this.props.session && this.props.session.user) {
        // If signed in display user dropdown menu
        const session = this.props.session
        return (
          <Nav className="ml-auto" navbar>
            {/*<!-- Uses .nojs-dropdown CSS to for a dropdown that works without client side JavaScript ->*/}
            <div tabIndex="2" className="dropdown nojs-dropdown">
              <div className="nav-item">
                <span className="dropdown-toggle nav-link d-none d-md-block">
                  <span className="icon ion-md-contact" style={{fontSize: '2em', position: 'absolute', top: -5, left: -25}}></span>
                </span>
                <span className="dropdown-toggle nav-link d-block d-md-none">
                  <span className="icon ion-md-contact mr-2"></span>
                  {session.user.name || session.user.email}
                </span>
              </div>
              <div className="dropdown-menu">
                <Link prefetch href="/account">
                  <a href="/account" className="dropdown-item"><span className="icon ion-md-person mr-1"></span> Your Account</a>
                </Link>
                <AdminMenuItem {...this.props}/>
                <div className="dropdown-divider d-none d-md-block"/>
                <div className="dropdown-item p-0">
                  <Form id="signout" method="post" action="/auth/signout" onSubmit={this.handleSignoutSubmit}>
                    <input name="_csrf" type="hidden" value={this.props.session.csrfToken}/>
                    <Button type="submit" block className="pl-4 rounded-0 text-left dropdown-item"><span className="icon ion-md-log-out mr-1"></span> Sign out</Button>
                  </Form>
                </div>
              </div>
            </div>
          </Nav>
        )
       } if (this.props.signinBtn === false) {
         // If not signed in, don't display sign in button if disabled
        return null
      } else {
        // If not signed in, display sign in button
        return (
          <Nav className="ml-auto" navbar>
            <NavItem>
              {/**
                * @TODO Add support for passing current URL path as redirect URL
                * so that users without JavaScript are also redirected to the page
                * they were on before they signed in.
                **/}
              <a href="/auth?redirect=/" className="btn btn-outline-primary" onClick={this.props.toggleModal}><span className="icon ion-md-log-in mr-1"></span> Sign up / Sign in</a>
            </NavItem>
          </Nav>
        )
      }
    }
  }