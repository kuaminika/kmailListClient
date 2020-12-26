
import React from 'react'
import dynamic from "next/dynamic";

const Kwysiwyg = dynamic(
    () => import('../../components/KWysiwyg').then(mod => mod.Kwysiwyg),
    { ssr: false }
  )

export default class extends  React.Component  {

     // Set posts on page load (only if prop is populated, i.e. running on server)
  constructor(props) {
    super(props)
    console.log("in all")
    console.log(props)
    this.state = {
    message: props.defaultMessage || "",
      error: props.error || null
    }
  }

  messageUpdated(newMessage)
  {
      this.state.message = newMessage;
     
  }

  performSend()
  {
      console.log("performing send");
      console.log(this);

  }

  render() {
  
    return (
        <React.Fragment> 
            <Kwysiwyg updatedMessageProcedure= {this.messageUpdated.bind(this)}  />
            
            <div className=" btn btn-success"  onClick={this.performSend.bind(this)} > send</div>
        </React.Fragment>


    )


  }
}


