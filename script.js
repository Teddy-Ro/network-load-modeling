const app = document.getElementById('app');

const injectStyles = () => {
    const styleTag = document.createElement('style');
    styleTag.textContent = `
        @font-face {
            font-family: 'Figtree';
            src: url('fonts/Figtree-VariableFont_wght.ttf') format('truetype');
            font-weight: 300 900;
            font-style: normal;
            font-display: swap;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body {
            color: #17181B;
            font-family: Figtree, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            font-weight: 400;
            line-height: 1.6;
            background-color: #FCFAF4;
            display: flex;
            flex-direction: column;
            min-height: 100vh;
        }

        .container { max-width: 1200px; margin: 0 auto; padding: 0 24px; width: 100%; }

        .site-header {
            background-color: rgba(254, 254, 252, 0.95);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            height: 72px;
            margin: 15px;
            border-radius: 16px;
            position: sticky;
            top: 15px;
            z-index: 1000;
            box-shadow: 0 2px 24px rgba(0, 0, 0, 0.08);
        }
        .header-content { display: flex; justify-content: flex-start; align-items: center; gap: 48px; height: 100%; }
        .logo { text-decoration: none; flex-shrink: 0; display: flex; align-items: center; }
        .nav-list { display: flex; list-style: none; gap: 32px; }
        .nav-link {
            text-decoration: none; color: #17181B; font-weight: 500;
            font-size: 16px; transition: all 0.2s; padding: 24px 0; display: block;
        }
        .nav-link:hover { text-decoration: underline; text-decoration-thickness: 2px; text-underline-offset: 4px; }

        .btn-kentik {
            display: inline-flex;
            justify-content: center;
            align-items: center;
            padding: 10px 28px;
            font-family: 'Figtree', sans-serif;
            font-size: 16px;
            font-weight: 500;
            color: #002B5B; 
            background-color: transparent;
            border: 2px solid #002B5B;
            border-radius: 40px; 
            text-decoration: none;
            transition: all 0.2s ease-in-out; 
            cursor: pointer;
        }
        .btn-kentik:hover { background-color: #002B5B; color: #FFFFFF; }
        .btn-kentik:active { transform: scale(0.97); }

        .content { padding: 40px 0 80px; flex-grow: 1; }
        .services-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px; flex-wrap: wrap; gap: 20px;}
        .services-header h1 { font-size: 2.2rem; font-weight: 700; }
        
        /* Блок фильтрации (красное пятно на скрине) */
        .controls-group { display: flex; gap: 15px; align-items: center; }
        .filter-input {
            padding: 10px 16px;
            border-radius: 40px;
            border: 1px solid #b6c3d1;
            outline: none;
            font-family: 'Figtree', sans-serif;
            font-size: 16px;
            width: 200px;
        }
        .filter-input:focus { border-color: #002B5B; }

        .card-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 32px; }
        .service-card {
            background: #FFFFFF; border: 1px solid #b6c3d1; border-radius: 28px;
            overflow: hidden; display: flex; flex-direction: column;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.03); transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .service-card:hover { transform: translateY(-4px); box-shadow: 0 15px 50px rgba(0, 0, 0, 0.08); }
        .card-body { padding: 24px; flex-grow: 1; }
        .card-body h3 { font-size: 1.4rem; margin-bottom: 12px; font-weight: 700; color: #111827; }
        .card-body p { color: #4B5563; font-size: 1.05rem; line-height: 1.6; }
        .card-footer { padding: 0 24px 24px; display: flex; gap: 12px; flex-wrap: wrap; }

        .status-badge {
            display: inline-block;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 0.85rem;
            font-weight: bold;
            margin-bottom: 15px;
            background: #e5e7eb;
        }

        .site-footer { background: #0B1A33; color: #fff; padding: 60px 0 0; width: 100%; }
        .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 40px; padding-bottom: 48px; border-bottom: 1px solid rgba(255, 255, 255, 0.1); }
        .footer-brand p { color: #8899AA; font-size: 14px; margin-top: 16px; line-height: 1.6; max-width: 260px; }
        .footer-col h4 { font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 16px; color: #8899AA; }
        .footer-col a { display: block; text-decoration: none; color: #C5D0DB; font-size: 14px; margin-bottom: 10px; transition: color 0.2s; }
        .footer-col a:hover { color: #F46C38; }
        .footer-bottom { display: flex; justify-content: space-between; align-items: center; padding: 24px 0; font-size: 13px; color: #667788; }
    `;
    document.head.appendChild(styleTag);
};



const API_URL = 'http://localhost:3000/api/requests';

function fetchRequests(statusFilter = '') {
    const xhr = new XMLHttpRequest();
    
    let url = API_URL;
    if (statusFilter) {
        url += `?status=${encodeURIComponent(statusFilter)}`;
    }

    xhr.open('GET', url, true);

    xhr.onload = function() {
        if (xhr.status === 200) {
            const serverData = JSON.parse(xhr.responseText);
            renderHomeView(serverData); 
        } else {
            console.error('Ошибка сервера:', xhr.status);
        }
    };

    xhr.onerror = function() {
        console.error('Ошибка сети или блокировка CORS');
        app.innerHTML = `
            <div style="padding: 40px; text-align: center; color: #ef4444;">
                <h2>Сетевая ошибка!</h2>
                <p>Не удалось подключиться к серверу. Убедитесь, что сервер Лабораторной №4 запущен, а расширение CORS Unblock включено.</p>
            </div>
        `;
    };

    xhr.send();
}

window.applyFilter = () => {
    const filterValue = document.getElementById('statusFilter').value.trim();
    fetchRequests(filterValue);
};

window.deleteService = (id) => {
    const xhr = new XMLHttpRequest();
    xhr.open('DELETE', `${API_URL}/${id}`, true);
    xhr.onload = function() {
        if (xhr.status === 200) {
            fetchRequests(); 
        }
    };
    xhr.send();
};


// --- КОНТРОЛЛЕРЫ И ПРЕДСТАВЛЕНИЯ ---

function renderHomeView(data) {
    let html = `
        <div class="services-header">
            <h1>Услуги моделирования</h1>
            
            <div class="controls-group">
                <!-- Поле фильтра и кнопка (то самое красное пятно) -->
                <input type="text" id="statusFilter" class="filter-input" placeholder="поиск по статусу">
                <button class="btn-kentik" onclick="applyFilter()">Найти</button>
                
                <!-- Кнопка добавления ведет на новую страницу -->
                <button class="btn-kentik" onclick="window.location.href='edit.html'">Добавить услугу</button>
            </div>
        </div>
        <div class="card-grid">
    `;

    if (!data || data.length === 0) {
        html += `<p style="font-size: 1.2rem; color: #4B5563;">Заявок не найдено.</p></div>`;
        app.innerHTML = html;
        return;
    }

    // Отрисовывка карточки на основе данных с сервера
    data.forEach((service) => {
        html += `
            <div class="service-card">
                <div class="card-body">
                    <h3>${service.equipmentType}</h3>
                    <span class="status-badge">Статус: ${service.status}</span>
                    <p><strong>Вид моделирования:</strong> ${service.modelingType}</p>
                </div>
                <div class="card-footer">
                    <!-- Кнопка Подробнее теперь открывает форму edit.html и передает ей ID -->
                    <button class="btn-kentik" onclick="window.location.href='edit.html?id=${service.id}'">Подробнее</button>
                    <!-- Удаление передает реальный ID из базы -->
                    <button class="btn-kentik" onclick="deleteService('${service.id}')">Удалить</button>
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

// --- НАВИГАЦИЯ ---
document.getElementById('nav-home').onclick = (e) => { e.preventDefault(); fetchRequests(); };
document.getElementById('nav-logo').onclick = (e) => { e.preventDefault(); fetchRequests(); };
document.getElementById('nav-about').onclick = (e) => { e.preventDefault(); renderAboutView(); };

// --- СТАРТ ПРИЛОЖЕНИЯ ---
injectStyles();
fetchRequests();