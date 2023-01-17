import React from 'react'
import Sidebar from './sidebar'
import Chatcontent from './chatcontent'

const Home = () => {
  var show = true
  return (
      <div id="chat_home">
        <Sidebar/>
        <Chatcontent/>
      </div>
  )
}

export default Home