const AboutPage = {
    render: function() {
        return `
            <div style="background: #fff; padding: 40px; border-radius: 32px; border: 1px solid #b6c3d1;">
                <h1 style="font-size: 2.5rem; margin-bottom: 20px;">О проекте</h1>
                <p style="font-size: 1.1rem; color: #4B5563; margin-bottom: 30px;">
                    Аналитическое моделирование загруженности сетевого оборудования.<br>
                    Услуги — виды моделирования по оборудованию.<br>
                    Заявки — запрос с входными данными.
                </p>
                <div style="display: flex; gap: 15px;">
                    <a href="https://github.com/Teddy-Ro/network-load-modeling" class="btn-cta">Мой GitHub</a>
                    <a href="#services" class="btn-cta outline">К услугам</a>
                </div>
            </div>
        `;
    }
};