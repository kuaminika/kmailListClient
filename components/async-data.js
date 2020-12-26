/**
 * This is a very simple class that returns data asynchronously.
 *
 * This code runs on both the server and in the browser.
 *
 * You could also put the logic to detect if code is being run on
 * the server or in the browser inside the page template.
 * 
 * We use 'isomorphic-fetch' as it runs both server and client side.
 */
import React from 'react'
import fetch from 'isomorphic-fetch' 
import configData from "../kConfig.json";

export default class extends  React.Component {
  static async getData() {
    const res = await fetch('//jsonplaceholder.typicode.com/posts')
    const data = await res.json()
    return data
  }

  static async getListMembers()
  {
    const res = await fetch(configData.SERVER_URL+'/'+configData.APP_NAME+'/API/index.php?context=Subscriber&requestAction=getSubscribersInList&list_id=2')
    const data = await res.json()
    return data

  }
}
