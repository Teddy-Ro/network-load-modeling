const css = `
    @font-face {
        font-family: 'Figtree';
        src: url('../fonts/Figtree-VariableFont_wght.ttf') format('truetype');
        font-weight: 300 900;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    
    /* Прижимаем футер к низу */
    html, body { height: 100%; }
    body {
        color: #17181B;
        font-family: 'Figtree', sans-serif;
        background-color: #FCFAF4;
        line-height: 1.6;
        display: flex;
        flex-direction: column;
    }
    .container { max-width: 1200px; margin: 0 auto; padding: 0 24px; width: 100%; }
    
    .site-header {
        background-color: rgba(254, 254, 252, 0.95);
        backdrop-filter: blur(12px);
        height: 72px; margin: 15px; border-radius: 16px;
        position: sticky; top: 15px; z-index: 1000;
        box-shadow: 0 2px 24px rgba(0, 0, 0, 0.08);
    }
    .header-content { display: flex; align-items: center; gap: 48px; height: 100%; }
    .nav-list { display: flex; list-style: none; gap: 32px; }
    .nav-link { text-decoration: none; color: #17181B; font-weight: 500; transition: 0.2s; }
    .nav-link:hover { color: #F46C38; text-decoration: underline; }

    /* Основной контент занимает всё свободное место */
    .content { flex: 1 0 auto; padding: 40px 0 80px; }
    
    /* СТИЛИ КНОПОК */
    .btn-cta {
        display: inline-flex; 
        justify-content: center; 
        align-items: center;
        padding: 12px 28px; 
        font-size: 16px; 
        font-weight: 600;
        font-family: 'Figtree', sans-serif;
        
        /* В обычном состоянии — прозрачный фон, темно-синяя рамка и текст */
        color: #002B5B; 
        background-color: transparent; 
        border: 2px solid #002B5B; 
        border-radius: 40px; /* Идеально круглая форма "капсулы" */
        
        cursor: pointer; 
        transition: all 0.25s ease-in-out;
        text-decoration: none;
    }

    .btn-cta:hover { 
        background-color: #00244b; 
        border-color: #00244b;
        color: #FFFFFF;
    }

    .btn-cta:active { 
        transform: scale(0.97); 
    }

    /* Модификатор outline (если где-то нужен альтернативный стиль, но сейчас они все одинаковые) */
    .btn-cta.outline { 
        background: transparent; 
        color: #002B5B; 
        border-color: #002B5B;
    }
    .btn-cta.outline:hover { 
        background-color: #002B5B; 
        color: #fff; 
    }

    /* СТИЛИ КАРТОЧЕК ИЗ МАКЕТА */
    .card-grid {
        display: flex; flex-wrap: wrap; gap: 24px;
        padding: 32px; border: 1px solid #e2e8f0; border-radius: 24px;
        background-color: #fff; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
    }
    .service-card {
        flex: 1 1 320px; background: #fff; border: 1px solid #f1f5f9;
        border-radius: 20px; padding: 24px; display: flex; flex-direction: column;
        box-shadow: 0 10px 30px rgba(0,0,0,0.04); transition: transform 0.2s;
    }
    .service-card:hover { transform: translateY(-4px); }

    /* СТИЛИЗАЦИЯ КНОПКИ УДАЛИТЬ*/
    .btn-delete { 
        color: #F46C38;
        background: none; 
        border: none; 
        font-family: 'Figtree', sans-serif;
        font-weight: 600; 
        font-size: 15px;
        cursor: pointer; 
        padding: 8px 12px;
        transition: all 0.2s ease-in-out;
        text-decoration: none;
        display: inline-flex;
        align-items: center;
    }

    /* ЭФФЕКТ ПРИ НАВЕДЕНИИ НА УДАЛИТЬ */
    .btn-delete:hover { 
        color: #e05b2b;           
        text-decoration: underline; /* Подчеркивание при наведении */
        text-underline-offset: 4px;
    }

    .btn-delete:active {
        transform: scale(0.95);
    }
    
    /* ФУТЕР НАДЕЖНО ПРИЖАТ */
    .site-footer { flex-shrink: 0; background: #17181B; color: #a1a1aa; padding: 30px 0; text-align: center; }

    .services-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px; flex-wrap: wrap; gap: 20px; }
    .services-header h1 { font-size: 2rem; font-weight: 800; letter-spacing: -0.5px; }
    .controls-group { display: flex; gap: 15px; align-items: center; }
    .filter-input { padding: 10px 18px; border-radius: 12px; border: 1px solid #e2e8f0; outline: none; font-size: 15px; width: 220px; background: #fff; }
    .filter-input:focus { border-color: #F46C38; }
    
    .status-badge { display: inline-block; padding: 6px 14px; border-radius: 10px; font-size: 0.8rem; font-weight: 700; margin-bottom: 15px; background: #f1f5f9; color: #475569; text-transform: uppercase; letter-spacing: 0.5px; }
    .card-body h3 { font-size: 1.3rem; font-weight: 700; margin-bottom: 8px; }
    .card-body p { color: #64748b; font-size: 14px; }
    .card-footer { display: flex; justify-content: space-between; align-items: center; margin-top: 24px; padding-top: 16px; border-top: 1px solid #f1f5f9; }
`;

export const injectStyles = () => {
    if (!document.getElementById('cloudcalc-styles')) {
        const styleTag = document.createElement('style');
        styleTag.id = 'cloudcalc-styles';
        styleTag.textContent = css;
        document.head.appendChild(styleTag);
    }
};