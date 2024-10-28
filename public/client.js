const socket = io() // [9]

// logic for getting username
let name;
const textArea = document.querySelector("#textarea") // [11]
const messageArea = document.querySelector(".message__area") // [20]
do { //  [10]

    name = prompt('Please enter your name...')
} while (!name);

// event listener on text area [12]
textArea.addEventListener("keyup", (e) => {
    if(e.key === "Enter"){ // checking if the key is "Enter" [13]
        sendMessage(e.target.value)  // [14]

    }
})

// function to send message [15] (define here)
function sendMessage (message) {
    // formatting the message to get the username and the message [17]
    let msg = {
        user:  name,
        message: message.trim()
    }
    // append the message in the section with the help of a function [18]
    appendMessage(msg, 'outgoing')

    // clearing the textArea
    textArea.value = ''

    // calling the scroll [33]
    scrollToBottom()

    // send the message to the server vaya wev socket [25]
    socket.emit('message', msg )// it takes an object, passing the object => msg


}

//  creating the append function [19]
function appendMessage (msg, type) {
    // creating another div where username and message will be present
    const mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className,'message') // adding  the class to the div [21]

    // making the markup area, where user name and message will be there [22]
    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
    // changing the innerhtml form markup of the maindiv  [23]
    mainDiv.innerHTML = markup

    // appending the mainDiv to the message area [24]
    messageArea.appendChild(mainDiv)

}

// reciving the data [28]
socket.on('message', (msg) => {
    //console.log(msg); // this is for the browser
    // calling the appendMessage function  to append the message in the message area [29]
    appendMessage(msg, 'incoming') // since the message is reciving so the type (class) is incoming [30]
    scrollToBottom() // [32]
    
})

// function for scroll in bottom
function scrollToBottom () {
    messageArea.scrollTop = messageArea.scrollHeight // means scrolling to the bottom if the message comes  [31]
    // we have to call the function at the messageAppend, message recive

}