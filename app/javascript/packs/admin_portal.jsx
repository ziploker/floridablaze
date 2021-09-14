// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
import Admin from './admin'



document.addEventListener('DOMContentLoaded', () => {
  const node = document.getElementById('admin_data_dump')
  const data = JSON.parse(node.getAttribute('data'))

  ReactDOM.render(
    <Admin props={data}/>,
    document.body.appendChild(document.createElement('div')),
  )
})



