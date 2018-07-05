if (document.querySelector('#newToDo')) {
  let todos = []
  document.querySelector('#newToDo button[type="submit"]').addEventListener('click', function () {
    let input = document.querySelector('#newToDoItem').value
    if (/^\S+/.test(input)) {
      todos.push(input)
      document.querySelector('#newToDoItem').value = ''

      let li = document.createElement('li')
      li.className = 'list-group-item'
      li.textContent = input
      document.querySelector('#newToDoList').appendChild(li)
    }
  })

  document.querySelector('#submitToDo').addEventListener('click', function () {
    let title = document.querySelector('#newToDoTitle').value
    if (/^\S+/.test(title) && todos.length > 0) {
      let payload = {
        title: title,
        content: todos,
        // Remove ID when you add DB
        id: Math.floor(Math.random() * 10000)
      }
      sendData(payload, function (err, statusCode) {
        if (err) console.error(err)
        else {
          if (statusCode === 200) window.location.href = '/'
          else console.warn(`Server responded with status code => ${statusCode}`)
        }
      })
    }
  })
}

function sendData (data, callback) { // make XHR POST request to '/'; Send data as JSON
  let XHR = new XMLHttpRequest()

  XHR.open('POST', '/', true)
  XHR.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
  XHR.send(JSON.stringify(data))

  XHR.addEventListener('load', function (e) {
    callback(null, e.target.status)
  })

  XHR.addEventListener('error', function () {
    let err = new Error('Error sending data to server')
    callback(err)
  })
}
