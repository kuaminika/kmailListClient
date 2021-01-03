
import React from 'react'
import {KList} from '../klist'
import AsyncData from '../async-data'
import { faMinusCircle,faEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { post } from 'jquery'

export default class extends  React.Component  {

     // Set posts on page load (only if prop is populated, i.e. running on server)
  constructor(props) {
    super(props)
    console.log("in all")
    console.log(props)
    this.state = {
      posts: props.emailListMembers || null,
      error: props.error || null
    }
  }



  render() {
    return (
        <React.Fragment>
            <h2 className="display-4">Data from API</h2>
            <KList title="Test" items={this.props.emailListMembers} error={this.state.error} logMode={false}>
        
                 {
                    post=>
                    (
                        <div >
                            <div className="d-flex w-100 justify-content-between">
                                <h5 className="mb-1" >{post.name}</h5>
                                <small>join date:{post.dateAdded}</small>
                            </div>
                            <div className="d-flex w-100 justify-content-between">
                                <div><b>email:</b>{post.email}  </div>
                                <div className="alert  p-1 alert-warning d-flex justify-content-between"><b>id:</b>{post.id} 
                                  <div className="btn btn-sm btn-danger m-1"> <FontAwesomeIcon icon={faMinusCircle}/></div>
                                  <div className="btn btn-sm btn-primary m-auto p-auto"><FontAwesomeIcon icon={faEdit}/></div>
                                </div>
                            </div>
                        </div>
                    )                     
                 }
            </KList>
        </React.Fragment>


    )


  }
}


