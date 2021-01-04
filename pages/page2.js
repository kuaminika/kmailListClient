
import React from 'react'
import configData from '../kConfig.json'
import Layout from '../components/kMailListLayout'
import AsyncData from '../components/async-data'
import AllMembersInListVC from '../components/viewControllers/AllMembersInListVC'
import SendEmailVC from '../components/viewControllers/SendEmailVC'

  class Page2 extends React.Component {

     // Set posts on page load (only if prop is populated, i.e. running on server)
  constructor(props) 
  {
    super(props)
    this.state = {
      emailListMembers : props.emailListMembers || [],
      chosenControllerName : "SendEmailVC",
      error: props.error || null
    }
    let newProps = Object.assign({},props);
    newProps.listId= configData.DEFAULT_LIST_ID;
    this.controllers ={AllMembers:(<AllMembersInListVC {...newProps} />), 
                        SendEmailVC:(<SendEmailVC {...newProps} />) }
   

  }

  onVCChanged(vcName)
  {
    let newState = Object.assign({},this.state);
    newState.chosenControllerName = vcName;
    this.setState(newState);

  }

  render() {
    console.log(this.state)

    return (
        <Layout  {...this.props} title="hihi" onVCChanged = {this.onVCChanged.bind(this)} children={[ this.controllers[this.state.chosenControllerName]]} />
    )


  }
}
export default Page2;

export async  function getStaticProps(context) {
  const emailListMembers  = await AsyncData.getListMembers()
  

  return {
    props: {emailListMembers}, // will be passed to the page component as props
  }
}