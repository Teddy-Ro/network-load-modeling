import { injectStyles } from './styles.js';

const API_URL = '/api/requests';
let requestId = null;

document.addEventListener('DOMContentLoaded', () => {
    injectStyles();
    
    const urlParams = new URLSearchParams(window.location.search);
    requestId = urlParams.get('id'); // Сохраняем ID, если редактируем

    if (requestId) {
        document.getElementById('formTitle').textContent = `Редактирование заявки #${requestId}`;
        loadRequestData(requestId);
    } else {
        document.getElementById('formTitle').textContent = 'Создание новой заявки';
    }

    // Вешаем событие на отправку формы
    document.getElementById('editForm').addEventListener('submit', handleFormSubmit);
});

// Загрузка данных для редактирования (GET)
async function loadRequestData(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) throw new Error('Заявка не найдена');
        
        const data = await response.json();
        
        document.getElementById('equipmentType').value = data.equipmentType || '';
        document.getElementById('modelingType').value = data.modelingType || '';
        document.getElementById('status').value = data.status || 'pending';
        
        if (data.inputData) {
            document.getElementById('packetArrivalRate').value = data.inputData.packetArrivalRate || '';
        }
    } catch (error) {
        console.error('Ошибка загрузки:', error);
        alert('Не удалось загрузить данные заявки.');
    }
}

// Отправка данных (POST или PUT)
async function handleFormSubmit(event) {
    event.preventDefault(); // Предотвращаем перезагрузку страницы браузером

    // Собираем объект данных в соответствии с форматом бэкенда из ЛР 4
    const payload = {
        equipmentType: document.getElementById('equipmentType').value.trim(),
        modelingType: document.getElementById('modelingType').value.trim(),
        status: document.getElementById('status').value,
        inputData: {
            packetArrivalRate: parseFloat(document.getElementById('packetArrivalRate').value)
        }
    };

    // Определяем метод и URL
    const method = requestId ? 'PUT' : 'POST';
    const url = requestId ? `${API_URL}/${requestId}` : API_URL;

    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json' // Говорим серверу, что отправляем JSON
            },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            alert(requestId ? 'Заявка успешно обновлена!' : 'Заявка успешно создана!');
            window.location.href = 'index.html'; // Возвращаемся на главную
        } else {
            throw new Error('Ошибка при сохранении');
        }
    } catch (error) {
        console.error(error);
        alert('Не удалось сохранить данные. Проверьте работу сервера.');
    }
}