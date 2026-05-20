import { injectStyles } from './styles.js';
import { AboutPage } from './about.js';

const app = document.getElementById('app');

// ВАЖНО для ЛР 6: убираем http://localhost:3000. 
// Так как бандл будет лежать внутри сервера, запросы можно слать по относительному пути!
const API_URL = '/api/requests';

// Главная функция загрузки заявок через FETCH
async function fetchRequests(statusFilter = '') {
    let url = API_URL;
    if (statusFilter) {
        url += `?status=${encodeURIComponent(statusFilter)}`;
    }

    try {
        const response = await fetch(url); // Fetch возвращает Промис
        if (!response.ok) throw new Error('Ошибка сети');
        
        const serverData = await response.json();
        renderHomeView(serverData);
    } catch (error) {
        console.error('Ошибка:', error);
        app.innerHTML = `
            <div style="padding: 40px; text-align: center; color: #ef4444;">
                <h2>Сетевая ошибка!</h2>
                <p>Не удалось получить данные с сервера API.</p>
            </div>
        `;
    }
}

// Обработчик кнопки фильтрации
window.applyFilter = () => {
    const filterValue = document.getElementById('statusFilter').value.trim();
    fetchRequests(filterValue);
};

// Удаление через FETCH (метод DELETE)
window.deleteService = async (id) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            fetchRequests(); // Перерисовываем список при успехе
        }
    } catch (error) {
        console.error('Ошибка удаления:', error);
    }
};

function renderHomeView(data) {
    let html = `
        <div class="services-header">
            <h1>Услуги моделирования</h1>
            <div class="controls-group">
                <input type="text" id="statusFilter" class="filter-input" placeholder="поиск по статусу">
                <button class="btn-cta" onclick="applyFilter()">Найти</button>
                <button class="btn-cta outline" onclick="window.location.href='edit.html'">Добавить услугу</button>
            </div>
        </div>
        <div class="card-grid">
    `;

    if (!data || data.length === 0) {
        html += `<p style="font-size: 1.2rem; color: #4B5563;">Заявок не найдено.</p></div>`;
        app.innerHTML = html;
        return;
    }

    data.forEach((service) => {
        html += `
            <div class="service-card">
                <div class="card-body">
                    <h3>${service.equipmentType}</h3>
                    <span class="status-badge">Статус: ${service.status}</span>
                    <p><strong>Вид моделирования:</strong> ${service.modelingType}</p>
                </div>
                <div class="card-footer">
                    <button class="btn-cta" onclick="window.location.href='edit.html?id=${service.id}'">Подробнее</button>
                    <button class="btn-delete" onclick="deleteService('${service.id}')">Удалить</button>
                </div>
            </div>
        `;
    });

    html += `</div>`;
    app.innerHTML = html;
}

function renderAboutView() {
    app.innerHTML = AboutPage.render();
}

// НАВИГАЦИЯ
document.getElementById('nav-home').onclick = (e) => { e.preventDefault(); fetchRequests(); };
document.getElementById('nav-logo').onclick = (e) => { e.preventDefault(); fetchRequests(); };
document.getElementById('nav-about').onclick = (e) => { e.preventDefault(); renderAboutView(); };

// СТАРТ ПРИЛОЖЕНИЯ
injectStyles();
fetchRequests();