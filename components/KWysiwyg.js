import { Editor } from "react-draft-wysiwyg";
import { convertFromRaw,convertToRaw,ContentState  , EditorState } from 'draft-js';
import styles from "../css/kwysiwyg.module.css"
import wysiwygStyles from "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import React from 'react'

export class Kwysiwyg extends  React.Component
{ 

    constructor(props) {
        super(props);
      
        const contentState = convertFromRaw(content);
        this.myRef = React.createRef();
        this.initialState = contentState;
        this.state = {
          contentState,
        }
  
      }
    
   
  clear()
  {
    console.log("clearing")
    this.setState({contentState: this.initialState})

  }
  
  onContentStateChange(contentState)
  {

      this.setState({contentState});
      
      if(this.props.updatedMessageProcedure && this.state.contentState.blocks)
      {  
            let projected = "";
          for(let i in this.state.contentState.blocks)
          {           
              projected += "<p>"+ this.state.contentState.blocks[i].text.replace('↵',"</br>")+"</p>";
           }
           this.props.updatedMessageProcedure(projected);
      }

  }

  componentDidMount()
  {
    console.log("mounted wysiwyg")
    window.wys = this;
    console.log(window)
  }
    render()
    {
        const { contentState } = this.state;
        return(
            <div  >
                
                <style>
                    {styles}
                    {wysiwygStyles}
                </style>
                <Editor ref={this.myRef}
                    toolbarClassName="kwysiwygToolBar"//{styles.kwysiwygToolBar}
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                    onContentStateChange={this.onContentStateChange.bind(this)}
                    />
            </div>
        );
    }
}
const content = {"entityMap":{},"blocks":[{"key":"637gr","text":"Initialized from content state.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]};
