const app = document.getElementById('app');

// --- CSS-in-JS
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

        /* ОРИГИНАЛЬНЫЙ HEADER */
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

        /* КНОПКИ В СТИЛЕ KENTIK (Все синие) */
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

        /* КАРТОЧКИ И КОНТЕНТ */
        .content { padding: 40px 0 80px; flex-grow: 1; }
        .services-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px; }
        .services-header h1 { font-size: 2.2rem; font-weight: 700; }
        
        .card-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 32px; }
        .service-card {
            background: #FFFFFF; border: 1px solid #b6c3d1; border-radius: 28px;
            overflow: hidden; display: flex; flex-direction: column;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.03); transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .service-card:hover { transform: translateY(-4px); box-shadow: 0 15px 50px rgba(0, 0, 0, 0.08); }
        .card-img { width: 100%; height: 200px; object-fit: cover; border-bottom: 1px solid #b6c3d1; }
        .card-body { padding: 24px; flex-grow: 1; }
        .card-body h3 { font-size: 1.4rem; margin-bottom: 12px; font-weight: 700; color: #111827; }
        .card-body p { color: #4B5563; font-size: 1.05rem; line-height: 1.6; }
        .card-footer { padding: 0 24px 24px; display: flex; gap: 12px; flex-wrap: wrap; }

        /* СТРАНИЦА ПОДРОБНЕЕ */
        .detail-page { background: #fff; padding: 60px; border-radius: 32px; border: 1px solid #b6c3d1; box-shadow: 0 10px 40px rgba(0, 0, 0, 0.03); }
        .detail-img { 
            width: 100%; 
            aspect-ratio: 21 / 11; 
            object-fit: cover; 
            border-radius: 16px; 
            margin-bottom: 30px; 
        }
        .detail-page h1 { font-size: 2.5rem; margin-bottom: 20px; font-weight: 700; }
        .detail-page p { font-size: 1.2rem; color: #4B5563; line-height: 1.8; margin-bottom: 30px; }

        /* ОРИГИНАЛЬНЫЙ FOOTER */
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

// --- КОНТРОЛЛЕРЫ И ПРЕДСТАВЛЕНИЯ ---

function renderHomeView() {
    let html = `
        <div class="services-header">
            <h1>Услуги моделирования</h1>
            <button class="btn-kentik" onclick="addService()">Добавить услугу</button>
        </div>
        <div class="card-grid">
    `;

    servicesMockData.forEach((service, index) => {
        html += `
            <div class="service-card">
                <img src="${service.image}" class="card-img" alt="${service.title}">
                <div class="card-body">
                    <h3>${service.title}</h3>
                    <p>${service.description}</p>
                </div>
                <div class="card-footer">
                    <button class="btn-kentik" onclick="renderDetailView(${service.id})">Подробнее</button>
                    <button class="btn-kentik" onclick="deleteService(${index})">Удалить</button>
                </div>
            </div>
        `;
    });

    html += `</div>`;
    app.innerHTML = html;
}

function renderDetailView(id) {
    const service = servicesMockData.find(s => s.id === id);
    if (!service) return;

    app.innerHTML = `
        <div class="detail-page">
            <button class="btn-kentik" onclick="renderHomeView()" style="margin-bottom: 30px;">← Назад</button>
            <img src="${service.image}" class="detail-img">
            <h1>${service.title}</h1>
            <p>${service.details}</p>
            <div style="margin-top: 40px; padding-top: 30px; border-top: 1px solid #e5e7eb;">
                <button class="btn-kentik">Оставить заявку на эту услугу</button>
            </div>
        </div>
    `;
    window.scrollTo(0, 0);
}

function renderAboutView() {
    app.innerHTML = AboutPage.render();
}

// --- ЛОГИКА ---
window.addService = () => {
    if (servicesMockData.length > 0) {
        const copy = { ...servicesMockData[0], id: Date.now() };
        servicesMockData.push(copy);
        renderHomeView();
    }
};

window.deleteService = (index) => {
    servicesMockData.splice(index, 1);
    renderHomeView();
};

// --- НАВИГАЦИЯ ---
document.getElementById('nav-home').onclick = (e) => { e.preventDefault(); renderHomeView(); };
document.getElementById('nav-logo').onclick = (e) => { e.preventDefault(); renderHomeView(); };
document.getElementById('nav-about').onclick = (e) => { e.preventDefault(); renderAboutView(); };

// --- СТАРТ ---
injectStyles();
renderHomeView();