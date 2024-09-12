const firebaseUrl = 'https://shadow-kanban-default-rtdb.firebaseio.com/';
const apiHash = '-Mpie3AnfVbEExpeCk0o';
const buttonApi = `${firebaseUrl}/buttons/${apiHash}/buttons.json`;
const buttonList = [];
const buttonStatus = [];
const interval = setInterval(() => update(), 1000);


window.onload = onInit;


function onInit() {
    getStatus();
}


function getStatus() {
  fetch(buttonApi)
        .then(res => res.json())
        .then(data => {
            for (let key in data) {
                let button = document.getElementById(key);
                let status = data[key];
                updateButtonState(button, status);
            }
        })
        .catch((err) => console.error(err));
}

function updateButtonState(button, status) {
    if (status) {
        button.classList.remove('btn-danger');
        button.classList.add('btn-success');
    } else {
        button.classList.remove('btn-success');
        button.classList.add('btn-danger');
    }
}

function httpPost(url, data) {
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "PATCH", url, false );
    xmlHttp.send( data );
    return xmlHttp.responseText;
}

function update() {
    getStatus();
}

function toggleButtonState(button) {

    let status;

    if (button.classList.contains('btn-success')) {
        button.classList.remove('btn-success');
        button.classList.add('btn-danger');
        status = false;
    } else {
        button.classList.remove('btn-danger');
        button.classList.add('btn-success');
        status = true;
    }

    httpPost(buttonApi, JSON.stringify({ [button.id]: status }));
}

function openModal(mn) {
    let modal = document.getElementById(mn);

    if (typeof modal == 'undefined' || modal === null)
        return;

    modal.style.display = 'Block';
    document.body.style.overflow = 'hidden';
}

function closeModal(mn) {
    let modal = document.getElementById(mn);

    if (typeof modal == 'undefined' || modal === null)
        return;

    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

/*

    [
        {
            "id": "1",
            "status": true
        }
    ]

*/
