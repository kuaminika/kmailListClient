export class AdminMenuItem extends React.Component {
    render() {
      if (this.props.session.user && this.props.session.user.admin === true) {
        return (
          <React.Fragment>
            <Link prefetch href="/admin">
              <a href="/admin" className="dropdown-item"><span className="icon ion-md-settings mr-1"></span> Admin</a>
            </Link>
          </React.Fragment>
        )
      } else {
        return(<div/>)
      }
    }
  }