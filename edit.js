document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    if (id) {
        document.getElementById('formTitle').textContent = `Просмотр заявки #${id}`;
        loadRequestData(id);
    }
});

function loadRequestData(id) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `http://localhost:3000/api/requests/${id}`, true);

    xhr.onload = function() {
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            
            document.getElementById('equipmentType').value = data.equipmentType || '';
            document.getElementById('modelingType').value = data.modelingType || '';
            
            if (data.inputData) {
                document.getElementById('packetArrivalRate').value = data.inputData.packetArrivalRate || '';
            }
        }
    };

    xhr.send();
}