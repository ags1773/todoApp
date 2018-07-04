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
      console.log('Accept payload')
      console.log(`Title :${title}`)
      console.log(todos)
    }
  })
}

// function sendData (data) {
//   var XHR = new XMLHttpRequest()
//   var FD = new FormData()

//   // Push our data into our FormData object
//   for(name in data) {
//     FD.append(name, data[name]);
//   }

//   // Define what happens on successful data submission
//   XHR.addEventListener('load', function(event) {
//     alert('Yeah! Data sent and response loaded.');
//   });

//   // Define what happens in case of error
//   XHR.addEventListener('error', function(event) {
//     alert('Oops! Something went wrong.');
//   });

//   // Set up our request
//   XHR.open('POST', '/test');

//   // Send our FormData object; HTTP headers are set automatically
//   XHR.send(FD);
// }
