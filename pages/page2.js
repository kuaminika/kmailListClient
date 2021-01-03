import Link from 'next/link'
import React from 'react'
import configData from '../kConfig.json'
import {KList} from '../components/klist'
import Page from '../components/page'
import Layout from '../components/kMailListLayout'
import AsyncData from '../components/async-data'
import { faMinusCircle,faEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AllMembersInListVC from '../components/viewControllers/AllMembersInListVC'
import { post } from 'jquery'
import SendEmailVC from '../components/viewControllers/SendEmailVC'

  class Page2 extends React.Component {

     // Set posts on page load (only if prop is populated, i.e. running on server)
  constructor(props) 
  {
    super(props)
    this.state = {
      emailListMembers : props.emailListMembers || [],
      error: props.error || null
    }
    this.controllers = {AllMembers: new AllMembersInListVC(props),
                        SendEmailVC: new SendEmailVC(props)};
  }

  render() {
    console.log(this.state)
    return (
        <Layout  {...this.props} title="hihi" controllers = {this.controllers}>
         
            {this.controllers.SendEmailVC.render()}
        </Layout>


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