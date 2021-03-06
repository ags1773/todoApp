if (document.querySelector('#newToDo')) { // newToDo.ejs page
  let todos = []
  document.querySelector('#newToDo button[type="submit"]').addEventListener('click', function () {
    let input = document.querySelector('#newToDoItem').value
    if (/^\S+/.test(input)) {
      todos.push({data: input, done: false})
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
        content: todos
      }
      sendData(payload, '/', 'POST', function (err, statusCode) {
        if (err) console.error(err)
        else {
          if (statusCode === 200) window.location.href = '/'
          else console.warn(`Server responded with status code => ${statusCode}`)
        }
      })
    }
  })
}

if (document.querySelector('#viewToDo')) { // todo.ejs page
  // let locals = localsObj // contains data with which todo.ejs page is rendered
  let temp = document.querySelector('#localsObj').getAttribute('data-localsObj')
  let locals = JSON.parse(temp)

  let toggleStatus = function () {
    this.classList.toggle('done') // toggle CSS class
    for (let content of locals.content) { // find the task and toggle it's object boolean
      if (content.data === this.textContent) {
        content.done = !content.done
        break
      }
    }
  }

  document.querySelector('a[data-link-type="add"]').addEventListener('click', function () {
    let input = document.querySelector('#newToDoItem').value
    if (/^\S+/.test(input)) {
      document.querySelector('#newToDoItem').value = ''
      let li = document.createElement('li')
      li.className = 'list-group-item'
      li.textContent = input
      li.addEventListener('click', toggleStatus)
      document.querySelector('#newToDoList').appendChild(li)

      locals.content.push({data: input, done: false})
    }
  })

  document.querySelectorAll('#newToDoList li').forEach(e => {
    e.addEventListener('click', toggleStatus)
  })

  document.querySelector('a[data-link-type="update"]').addEventListener('click', function () {
    sendData(locals, '/' + locals._id, 'PUT', function (err, statusCode) {
      if (err) console.log(err)
      else {
        if (statusCode === 200) window.location.href = '/'
        else console.warn(`Server responded with status code => ${statusCode}`)
      }
    })
  })

  document.querySelector('a[data-link-type="delete"]').addEventListener('click', function () {
    sendData({}, '/' + locals._id, 'DELETE', function (err, statusCode) {
      if (err) console.log(err)
      else {
        if (statusCode === 200) window.location.href = '/'
        else console.warn(`Server responded with status code => ${statusCode}`)
      }
    })
  })
}

function sendData (data, action, method, callback) { // make XHR using JSON
  let XHR = new XMLHttpRequest()

  XHR.open(method, action, true)
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
