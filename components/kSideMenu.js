import React from 'react'

import {  ListGroup, ListGroupItem } from 'reactstrap'


    export  default class extends  React.Component  {

        constructor(props)
        {
            super(props);
           
        }

        validateProps()
        {
            if(!this.props.menuItems)  throw "missing menu items from kSideMenu";
        }

     


        decorateClickecOn(item)
        {
            item = item || { name:"none given" , clickAction :()=>console.log("doing") }
            let givenCallBack = item.clickAction ||function(){console.log("doing ")};

            return  function()
            {
                console.log("performing "+ item.name)

                givenCallBack();
            }

        }

        render() 
        {

            this.validateProps();

          console.log(this.props.menuItems);
        
            // Display posts
            return <React.Fragment>
                    <h5 className="text-muted text-uppercase">{this.props.title}</h5>
                    <ListGroup>
                            {    
                                this.props.menuItems.map((item, i) => (                            
                                 <ListGroupItem className="m-1 p-0"> 
                                       
                                        {(()=>{
                                            if(this.props.logMode)
                                            {
                                              return   <p><i>{JSON.stringify(item)}</i></p>;
                                            }

                                        })()}

                                        {(()=>
                                           {
                                                let clickAction= this.decorateClickecOn( item);// || function(){}
                                                                                            
                                                return(
                                                   
                                                <div className="nav-link  btn btn-primary" onClick={clickAction}>
                                                    {
                                                    item.name
                                                    }
                                                </div>)
                                            })()
                                        }
                                       
                                </ListGroupItem>
                               
                                
                            ))}
                    
                  </ListGroup>                
            </React.Fragment>
            
        }
    }