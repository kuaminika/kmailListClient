
import React from 'react';
import {KReactInput} from '../KReactInput';
import configData from '../../kConfig.json';
//import Kwysiwyg  from '../../components/KWysiwyg';
import dynamic from "next/dynamic";


const Kwysiwyg = dynamic(
    () => import('../../components/KWysiwyg').then(mod => mod.Kwysiwyg),
    { ssr: false }
  );

const ForwardedRefKwysiwyg = React.forwardRef((props, ref) => (
 <Kwysiwyg {...props} ref={ref} />
));


export default class extends  React.Component  {

     // Set posts on page load (only if prop is populated, i.e. running on server)
  constructor(props) {
    super(props)
    console.log("in all")
    console.log(props)
    this.KwysiwygRef = React.createRef();
    this.KReactInputRef = React.createRef();
    this.state = {
    message: props.defaultMessage || "",
    subject: props.defaultSubject || "",
      error: props.error || null
    }
  }

  messageUpdated(newMessage)
  {
      this.message = newMessage;
     
  }

  subjectChange(event)
  {
    const htmlInputTag = event.target;;
     this.subject = htmlInputTag.value;
  }
  performSend()
  {

    this.state.subject = this.subject;
    this.state.message = this.message;
    let data = {recipients:this.props.allMembers,subject:this.state.subject,content:this.state.message}
    let url = configData.SERVER_URL+configData.APP_NAME+ configData.MESSAGE_CONTEXT_SEND2ALL;
    fetch(url,
    {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {  'Content-Type': 'application/json'  }
    })    
    .then(response => response.json())
    .then(function(c){
      console.log(c)
      console.log(JSON.stringify(c))

    })
      console.log("performing send");
      console.log(this);
      this.KReactInputRef.current.clear();
      this.KwysiwygRef.current.retry();
    
  }
  
  componentDidMount() {
    console.log("mounted rending")
  }
  render() {
  console.log("rending")
    return (
        <React.Fragment> 
          <KReactInput ref= {this.KReactInputRef} labelText = "Subject"  key="003" onChange={this.subjectChange.bind(this)} />
            <ForwardedRefKwysiwyg ref={this.KwysiwygRef} updatedMessageProcedure= {this.messageUpdated.bind(this)} key="001" />            
            <div className=" btn btn-success"  onClick={this.performSend.bind(this)} key="002" > send</div>
        </React.Fragment>
    )


  }
}


