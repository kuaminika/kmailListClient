
import React from 'react'
import {KReactInput} from './KReactInput';

export class AddMemberForm  extends React.Component 
{


    constructor(props)
    {
        super(props);
        this.state = { name:"N/A",email:"N/A", listToAddId:props.listId};
        this.nameInputElement = React.createRef();
        this.emailInputElement = React.createRef();
        this.title = props.title || "Add member";
        this.state.open = false;

    }

   


    onSubmitProcedure(event)
    {
        console.log("executing form "+this.props.id+"submitcProcedure ");

        const defaultFn = ()=>console.log("doing procedure but its empty");
        const givenProcedure = this.props.onSubmit || defaultFn;

        givenProcedure(event);
    }

    onCloseFormClicked()
    {
        let currentState = this.state;
        currentState.open = false;
         this.setState(currentState);

    }
    onOpenFormClicked(event)
    {
       let currentState = this.state;
       currentState.open = true;
        this.setState(currentState);
    }
    onInputChanged(event)
    {
            
        const htmlInputTag = event.target;;
        this.state[htmlInputTag.name]  = htmlInputTag.value;
    }


    render()
    {
        console.log(this.props);
        let addPlusChar = String.fromCharCode(  '43' ) ;
        let pointDownChar = String.fromCharCode(  '709' ) ;
        let pointUpChar = String.fromCharCode(  '708' ) ;

        const openFormBtn = React.createElement("div",{className:"btn btn-success float-right",children:"Add member "+pointDownChar,onClick:this.onOpenFormClicked.bind(this),key:"openFormBtn"});
            
        const closeFormBtn =  React.createElement("div",{className:"btn btn-danger float-right",children:"Hide form "+pointUpChar,onClick:this.onCloseFormClicked.bind(this),key:"closeFormBtn"});
            
        if(!this.state.open)
        {
           const result = React.createElement("div",{id:this.props.id, className:"d-flex justify-content-end"},openFormBtn)
            return result;
        }
        const nameInput = React.createElement(KReactInput, {id:this.props.id+"Name" ,labelText:"Name", name:"name", onChange:this.onInputChanged.bind(this), type:"text" , ref:this.nameInputElement ,className:"form-control", key:"nameInput"});
        const emailInput = React.createElement(KReactInput,{id:this.props.id+"Email" ,labelText:"Email",name:"email",onChange:this.onInputChanged.bind(this), type:"email",ref:   this.emailInputElement, className:"form-control", key:"emailInput"});
        
        const btn = React.createElement("div",{className:"btn btn-success",children:"Add "+addPlusChar,onClick:this.onSubmitProcedure.bind(this),key:"submitBtn"});

       
       let submitRow = ( <div key="submitRow" children={[btn,closeFormBtn]}></div>);
        return ( 
            <div key="form" > 
               <h5 key="heading" className=" text-right">{this.title}</h5>
                <div key="body" className="border border-info rounded bg-light mb-5 p-3" children={[nameInput,emailInput,submitRow]}>
                </div>
            </div>)
    }

}