
export class SigninModal extends React.Component {
    render() {
      if (this.props.providers === null) return null
      
      return (
        <Modal isOpen={this.props.modal} toggle={this.props.toggleModal} style={{maxWidth: 700}}>
          <ModalHeader>Sign up / Sign in</ModalHeader>
          <ModalBody style={{padding: '1em 2em'}}>
            <Signin session={this.props.session} providers={this.props.providers}/>
          </ModalBody>
        </Modal>
      )
    }
  }