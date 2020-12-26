import { Editor } from "react-draft-wysiwyg";
import { convertFromRaw } from 'draft-js';
import styles from "../css/kwysiwyg.module.css"
import wysiwygStyles from "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import React from 'react'

export class Kwysiwyg extends  React.Component
{  

    constructor(props) {
        super(props);
        const contentState = convertFromRaw(content);
        this.state = {
          contentState,
        }
      }
    

  onContentStateChange(contentState)
  {

      this.setState({contentState});
    if(this.props.updatedMessageProcedure && this.state.contentState.blocks)
      this.props.updatedMessageProcedure(this.state.contentState.blocks[0].text);

  }

    render()
    {
        const { contentState } = this.state;
        return(
            <div>
                
                <style>
                    {styles}
                    {wysiwygStyles}
                </style>
                <Editor
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
