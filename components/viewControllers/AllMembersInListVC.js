
import React from 'react'
import {KList} from '../klist'
import kCourrier from "../../KLIBJS/KCourrier";
import {AddMemberForm} from '../AddMemberForm.js'
import { faMinusCircle,faEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import pageConsts from "../../componentsConsts/viewControllers/AllMembersInListVC.json"
import { post } from 'jquery'
import configData from '../../kConfig.json'

export default class extends  React.Component  {

     // Set posts on page load (only if prop is populated, i.e. running on server)
  constructor(props) {
    super(props);
    console.log("in all");
    console.log(props);
    this.addFormElement = React.createRef();
    this.state = {
      listMembers: props.emailListMembers || null,
      error: props.error || null
    }
  }

  addToList(event)
  {
        
     // const elementClickedOn = event.target;

      console.log(this.state);
      console.log(this.props);
      console.log(this.addFormElement.current.state);

      const newMember = this.addFormElement.current.state;
      kCourrier.post( configData.SUBSCRIBER_ADD_TO_LIST,newMember)
      .then((response)=>{
        console.log("it finished",response)
        return response.json();
      })
      .then(this.updateMemberList.bind(this))   
      .then(this.closeForm.bind(this))   
      .catch(console.error);
  }

  updateMemberList(memberLists)
  {
      let map = {};
      let newState = Object.assign({},this.state);

      newState.listMembers = memberLists || newState.listMembers;          
      newState.listMembers.forEach(element=>map[element.id] = element );       
      newState.map = map; 
      console.log("setting new state",newState)
      this.setState(newState);
  }

  closeForm()
  {
      this.addFormElement.current.onCloseFormClicked();
  }

  render() {
    return (
        <React.Fragment>
            <h2 className="display-4">{pageConsts.en.TITLE}</h2>
            <AddMemberForm  id="addMemberForm" key="addForm" listId={this.props.listId} ref= {this.addFormElement}  onSubmit={this.addToList.bind(this) } />
            <KList title="Test" items={this.state.listMembers} error={this.state.error} logMode={false}>
        
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


