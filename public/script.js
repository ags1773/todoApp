console.log('test123')

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
    // console.log(`array => ${todos}`)
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
      sendData(payload)
      window.location.href = '/'
    }
  })
}

function sendData (data) {
  let XHR = new XMLHttpRequest()
  let urlEncodedData = ''
  let urlEncodedDataPairs = []
  let returnVal

  // Turn the data object into an array of URL-encoded key/value pairs.
  for (let name in data) {
    urlEncodedDataPairs.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]))
  }

  // Combine the pairs into a single string and replace all %-encoded spaces to 
  // the '+' character; matches the behaviour of browser form submissions.
  urlEncodedData = urlEncodedDataPairs.join('&').replace(/%20/g, '+')

  // Define what happens on successful data submission
  XHR.addEventListener('load', function (e) {
    if (e.target.status === 200) returnVal = true
    else returnVal = false
  })

  // Define what happens in case of error
  XHR.addEventListener('error', function (event) {
    returnVal = false
  })

  // Set up our request
  XHR.open('POST', '/', true)

  // Add the required HTTP header for form data POST requests
  XHR.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

  // Finally, send our data.
  XHR.send(urlEncodedData)

  return returnVal
}
