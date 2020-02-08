console.log('Client side javascript loaded!');

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data);
//     });
// });

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTow = document.querySelector('#message-2');

messageOne.textContent = ''; 

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const location = search.value;

    messageOne.textContent = 'Loading...';
    messageTow.textContent = '';

    fetch('http://localhost:3000/weather?address=' + encodeURIComponent(location) + '&language=en').then((response) => {
    response.json().then((data) => {
        if(data.error) {
            messageOne.textContent= data.error;
        } else {
            messageOne.textContent  = data.location;
            messageTow.textContent = data.forecast;
        }
    });
});

   
});