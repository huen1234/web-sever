//Client side js 

//console.log("ahahahahaha client side")

/*
fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data)
    })
})*/



const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const msgone = document.querySelector('#msg1')
const msgtwo = document.querySelector('#msg2')



weatherform.addEventListener('submit', (e) => {
    e.preventDefault()

    msgone.textContent = 'Loading...'
    msgtwo.textContent = ' '
    const location = search.value
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                msgone.textContent = data.error
            } else {
                msgone.textContent = data.location
                msgtwo.textContent = data.forecast
            }
        })
    })
})