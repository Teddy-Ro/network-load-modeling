const App = {
    state: JSON.parse(localStorage.getItem('networkData')) || [...initialData],

    render: function() {
        const hash = window.location.hash || '#services';
        const root = document.getElementById('app');
        
        root.innerHTML = `
            <header class="site-header">
                <div class="container header-content">
                    <a href="#services" class="nav-link" style="font-weight: 800; font-size: 20px;">CloudCalc</a>
                    <nav class="nav-list">
                        <a href="#services" class="nav-link">Услуги</a>
                        <a href="#about" class="nav-link">About</a>
                    </nav>
                </div>
            </header>
            <main class="container page-section">
                ${hash === '#about' ? AboutPage.render() : this.servicesPage()}
            </main>
            <footer class="site-footer"><div class="container" style="text-align:center;">© 2025 CloudCalc</div></footer>
        `;
    },

    servicesPage: function() {
        const cards = this.state.map(item => `
            <div class="service-card">
                <div style="background:#eef2f6; color:#003366; padding:4px 12px; border-radius:20px; font-size:12px; font-weight:700; align-self:flex-start; margin-bottom:15px;">
                    ${item.category}
                </div>
                <h3>${item.title}</h3>
                <p style="flex-grow:1; color:#4B5563; margin: 15px 0;">${item.description}</p>
                <button class="btn-cta outline">Подробнее</button>
                <button class="btn-delete" onclick="App.deleteItem(${item.id})">Удалить</button>
            </div>
        `).join('');

        return `
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:30px;">
                <h2>Виды моделирования</h2>
                <button class="btn-cta" onclick="App.addItem()">Добавить услугу</button>
            </div>
            <div class="card-grid">${this.state.length ? cards : 'Пусто'}</div>
        `;
    },

    addItem: function() {
        const newItem = { ...initialData[0], id: Date.now(), title: "Новая услуга " + (this.state.length + 1) };
        this.state.push(newItem);
        this.sync();
    },

    deleteItem: function(id) {
        this.state = this.state.filter(i => i.id !== id);
        this.sync();
    },

    sync: function() {
        localStorage.setItem('networkData', JSON.stringify(this.state));
        this.render();
    }
};

window.addEventListener('hashchange', () => App.render());
window.addEventListener('load', () => App.render());