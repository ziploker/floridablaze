// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
import Article from './article'



document.addEventListener('DOMContentLoaded', () => {
  const node = document.getElementById('story_data_dump')
  const data = JSON.parse(node.getAttribute('data'))

  ReactDOM.render(
    <Article d={data}/>,
    document.body.appendChild(document.createElement('div')),
  )
})



