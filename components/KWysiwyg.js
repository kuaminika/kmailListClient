import { Editor } from "react-draft-wysiwyg";
import { convertFromRaw,convertToRaw,ContentState  , EditorState } from 'draft-js';
import styles from "../css/kwysiwyg.module.css";
import wysiwygStyles from "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import React from 'react'

export class Kwysiwyg extends  React.Component
{ 

    constructor(props) {
        super(props);
        
        const html = '<p>Hey this <strong>editor</strong> rocks 😀</p>';
        const contentBlock = htmlToDraft(html);
        if (contentBlock) {
          const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
          this.initialState = contentState;
          
    
          const editorState = EditorState.createWithContent(contentState);
          this.state = {
            editorState,contentState
          };
        }


        this.myRef = React.createRef();
      }
    
   
  clear()
  {
    console.log("clearing")
    this.setState({contentState: this.initialState})

  }
  onEditorStateChange(editorState)  {
    this.setState({
      editorState,
    });

    if(this.props.updatedMessageProcedure)
    {  

         let projected =   draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))

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
                    onEditorStateChange={this.onEditorStateChange.bind(this)}
                    />
            </div>
        );
    }
}
const content = {"entityMap":{},"blocks":[{"key":"637gr","text":"Initialized from content state.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]};
