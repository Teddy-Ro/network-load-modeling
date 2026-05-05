const app = document.getElementById('app');

// --- ДАННЫЕ ДЛЯ ДЗ (ЧАСТЬ 1) ---
// Коллекция данных логов для анализа (имитация потока данных)
const network_traffic_logs = [
    "NODE_ALPHA:LOAD_20%",
    "NODE_BETA:LOAD_85%:CRITICAL",
    "NODE_GAMMA:LOAD_40%",
    "NODE_DELTA:LOAD_95%:CRITICAL",
    "NODE_EPSILON:LOAD_10%",
    "TERMINATE_SCAN" // Метка остановки для цикла
];

function runNetworkDiagnostic(logs) {
    let i = 0;
    const critical_reports = []; // Коллекция (массив) объектов

    // Цикл с условием (не по счетчику) - пока не встретим флаг остановки
    while (i < logs.length && logs[i] !== "TERMINATE_SCAN") {
        let entry = logs[i]; // Работа со строкой

        if (entry.includes("CRITICAL")) {
            let parts = entry.split(':');
            // Создание объекта по теме
            let report_item = {
                node_name: parts[0],
                load_value: parts[1].replace('LOAD_', ''),
                alert_level: 'High',
                detected_at: new Date().toLocaleTimeString()
            };
            critical_reports.push(report_item);
        }
        i++;
    }
    return critical_reports;
}

// --- CSS-IN-JS: ВНЕДРЕНИЕ СТИЛЕЙ ---
const injectStyles = () => {
    const styleTag = document.createElement('style');
    styleTag.textContent = `
        @font-face {
            font-family: 'Figtree';
            src: url('fonts/Figtree-VariableFont_wght.ttf') format('truetype');
            font-weight: 300 900;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
            color: #17181B;
            font-family: 'Figtree', sans-serif;
            background-color: #FCFAF4;
            display: flex;
            flex-direction: column;
            min-height: 100vh;
        }

        .container { max-width: 1200px; margin: 0 auto; padding: 0 24px; width: 100%; }

        /* HEADER */
        .site-header {
            background-color: rgba(254, 254, 252, 0.95);
            backdrop-filter: blur(12px);
            height: 72px;
            margin: 15px;
            border-radius: 16px;
            position: sticky;
            top: 15px;
            z-index: 1000;
            box-shadow: 0 2px 24px rgba(0, 0, 0, 0.08);
        }
        .header-content { display: flex; align-items: center; gap: 48px; height: 100%; }
        .nav-list { display: flex; list-style: none; gap: 32px; }
        .nav-link { text-decoration: none; color: #17181B; font-weight: 500; font-size: 16px; cursor: pointer; }
        .nav-link:hover { text-decoration: underline; text-underline-offset: 4px; }

        /* KENTIK BUTTONS (Всегда синие) */
        .btn-kentik {
            display: inline-flex;
            justify-content: center;
            align-items: center;
            padding: 10px 28px;
            font-family: inherit;
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
        .btn-kentik:hover { background-color: #002B5B !important; color: #FFFFFF !important; }
        .btn-kentik:active { transform: scale(0.97); }

        /* GRID & CARDS */
        .content { padding: 40px 0 80px; flex-grow: 1; }
        .services-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px; }
        .card-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 32px; }
        .service-card {
            background: #FFFFFF; border: 1px solid #b6c3d1; border-radius: 28px;
            overflow: hidden; display: flex; flex-direction: column;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.03); transition: transform 0.3s ease;
        }
        .service-card:hover { transform: translateY(-4px); }
        .card-img { width: 100%; height: 200px; object-fit: cover; border-bottom: 1px solid #b6c3d1; }
        .card-body { padding: 24px; flex-grow: 1; }
        .card-footer { padding: 0 24px 24px; display: flex; gap: 12px; }

        /* ПОДРОБНЕЕ + 3D */
        .detail-page { background: #fff; padding: 40px; border-radius: 32px; border: 1px solid #b6c3d1; }
        .detail-img { 
            width: 100%; 
            aspect-ratio: 21 / 9; 
            object-fit: cover; 
            border-radius: 16px; 
            margin-bottom: 24px; 
        }
        #three-canvas-container { 
            width: 100%; 
            height: 400px; 
            background: #f8fafc; 
            border-radius: 16px; 
            margin-bottom: 24px; 
            border: 1px solid #e5e7eb;
        }
        .report-box { 
            margin-top: 30px; 
            padding: 20px; 
            background: #f0f4f8; 
            border-radius: 12px; 
            border-left: 5px solid #002B5B;
        }

        /* FOOTER */
        .site-footer { background: #0B1A33; color: #fff; padding: 40px 0; margin-top: auto; text-align: center; }
    `;
    document.head.appendChild(styleTag);
};

function init3DScene(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf8fafc);

    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    // Отдалили камеру чуть дальше, так как реальные модели бывают большими
    camera.position.z = 5; 

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Добавляем хороший свет, чтобы модель не была черной
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    let myModel; // Переменная для хранения загруженной модели

    // Загружаем реальную модель
    const loader = new THREE.GLTFLoader();
    
    // ВНИМАНИЕ: укажи правильное имя твоего скачанного файла!
    loader.load('models/server.glb', function(gltf) {
        myModel = gltf.scene;
        
        // Настройка размера (подбирай под свою модель: 0.5, 1, 2 и т.д.)
        myModel.scale.set(1.5, 1.5, 1.5); 
        
        // Опускаем модель чуть ниже центра, чтобы она красиво стояла
        myModel.position.set(0, -1, 0); 
        
        scene.add(myModel);
    }, undefined, function(error) {
        console.error('Ошибка при загрузке модели:', error);
        alert("Модель не загрузилась! Проверь пути к файлам и запущен ли локальный сервер.");
    });

    // Анимация вращения
    function animate() {
        requestAnimationFrame(animate);
        
        // Если модель загрузилась, медленно вращаем ее по оси Y
        if (myModel) {
            myModel.rotation.y += 0.005;
        }
        
        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
}

// --- RENDERING VIEWS ---

function renderHomeView() {
    let html = `
        <div class="services-header">
            <h1>Услуги и Модели</h1>
            <button class="btn-kentik" onclick="addService()">Добавить услугу</button>
        </div>
        <div class="card-grid">
    `;

    servicesMockData.forEach((service, index) => {
        html += `
            <div class="service-card">
                <img src="${service.image}" class="card-img">
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

    // Выполнение логики ДЗ (Часть 1)
    const alerts = runNetworkDiagnostic(network_traffic_logs);

    app.innerHTML = `
        <div class="detail-page">
            <button class="btn-kentik" onclick="renderHomeView()" style="margin-bottom: 20px;">← Назад</button>
            
            <img src="${service.image}" class="detail-img">
            
            <h1>${service.title}</h1>

            <h3>3D-визуализация узла:</h3>
            <div id="three-canvas-container"></div>

            <p>${service.details}</p>
        </div>
    `;

    // Инициализируем 3D сцену после того, как контейнер появился в DOM
    init3DScene('three-canvas-container');
    window.scrollTo(0, 0);
}

function renderAboutView() {
    app.innerHTML = AboutPage.render();
}

// --- CRUD & ACTIONS ---

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

// --- SPA NAVIGATION ---
document.getElementById('nav-home').onclick = (e) => { e.preventDefault(); renderHomeView(); };
document.getElementById('nav-logo').onclick = (e) => { e.preventDefault(); renderHomeView(); };
document.getElementById('nav-about').onclick = (e) => { e.preventDefault(); renderAboutView(); };

// Инициализация
injectStyles();
renderHomeView();