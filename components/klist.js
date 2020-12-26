import React from 'react'

import {  ListGroup, ListGroupItem } from 'reactstrap'


    export class KList extends React.Component {

       

        render() {
            if (this.props.error) {
            // Display error if posts have failed to load
            return <p><span className="font-weight-bold k-list">Error loading posts:</span> {this.props.error}</p>
            } else if (!this.props.items) {
            // Display place holder if posts are still loading (and no error)
            return <p><i>Loading content…</i></p>
            } else {
            // Display posts
            return <React.Fragment>
                { this.props.title}
                    <ListGroup>
                            {   
                                this.props.items.map((post, i) => (
                              
                                
                                 <ListGroupItem> 
                                       <div key={i}>
                                           {(()=>{
                                               if (this.props.logMode)
                                               {
                                                   return   <p><i>{JSON.stringify(post)}</i></p>;
                                               }
                                                })()
                                             }
                                           {this.props.children(post)}
                                        </div>
                                </ListGroupItem>
                               
                                
                            ))}
                    
                  </ListGroup>
          
                
            </React.Fragment>
            }
        }
    }