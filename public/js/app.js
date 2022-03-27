//Client side js 

//console.log("ahahahahaha client side")

/*
fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data)
    })
})*/


fetch('http://localhost:3000/weather?address=chicago').then((response) => {
    response.json().then((data) => {
        if (data.error) {
            console.log(data.error)
        } else {
            console.log(data.location)
            console.log(data.forecast)
            console.log(data.address)
        }
    })
})

const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const msgone = document.querySelector('#msg1')
const msgtwo = document.querySelector('#msg2')



weatherform.addEventListener('submit', (e) => {
    e.preventDefault()

    msgone.textContent = 'Loading...'
    msgtwo.textContent = ' '
    console.log("angus")
    const location = search.value
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
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