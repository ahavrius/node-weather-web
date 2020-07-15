console.log('clientside file loaded')



const weatherForm = document.querySelector('form');
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


messageOne.textContent = 'Loading ...'
messageTwo.textContent = ''

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    
    const address = search.value
    
    fetch('/weather?address=' + address).then((res) => {
        res.json().then((data) => {
            if (!data.status)
            {
                messageOne.textContent = data.errorMessage
                messageTwo.textContent = ''
            }
            else
            {
                messageOne.textContent = data.location
                messageTwo.textContent = data.str
            }
        }
        )
    })
})