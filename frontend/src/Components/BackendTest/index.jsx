import React from 'react';
import Cookies from 'js-cookie';

const BackendTest = () => {
  const sendPost = () => {
    fetch('/core/process/', {
      method: 'POST',
      headers: {
        "X-CSRFToken": Cookies.get('csrftoken')
      },
      body: 'fuck Nekich!!!'
    })
    .then(res => console.log(res.text()))
  }

  return (
    <div>
      <button onClick={sendPost}>CS:GO!</button>
    </div>
  )
}

export default BackendTest;