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
import kCourrier from "../KLIBJS/KCourrier"
export default class extends  React.Component {
  static async getData() {
    const res = await fetch('//jsonplaceholder.typicode.com/posts')
    const data = await res.json()
    return data
  }

  static async getListMembers(id)
  {
    id = id || configData.DEFAULT_LIST_ID;

    const res = await kCourrier.get(configData.FETCH_LIST_BY_ID+id);
    const data = await res.json()
    return data

  }
}
