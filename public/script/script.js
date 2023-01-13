const socket = io()

socket.on('connect', ()=>{
    console.log('client-end connected')
    socket.emit('greetings')
})

socket.on('greetings', data=>{
    console.log('data from backend socket.io', data)
})

const chatbody = document.querySelector('.chatbody')
const messages = document.querySelector('.messages')
const input = document.querySelector('input')

chatbody.style.height = `${window.innerHeight - input.offsetHeight -35}px`
chatbody.style.marginBottom = '5px'


socket.on('receive-msg', msg=>{
    const message = document.createElement('div')
    message.className = 'receiver'
    message.innerHTML = `<div>${msg}</div>`
    messages.appendChild(message)
})

input.addEventListener('keyup', e=>{
    if(e.keyCode === 13){
        const msg = e.target.value
        const message = document.createElement('div')
        message.className = 'sender'
        message.innerHTML = `<div>${msg}</div>`
        messages.appendChild(message)
        input.value = ''
        socket.emit('send-msg', msg)
    }
})