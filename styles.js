const css = `
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
        line-height: 1.6;
    }
    .container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
    
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

    .page-section { padding: 40px 0 80px; min-height: 80vh; }
    
    /* ИСПРАВЛЕННЫЕ КНОПКИ */
    .btn-cta {
        display: inline-flex; justify-content: center; align-items: center;
        padding: 12px 28px; font-size: 16px; font-weight: 600;
        color: #fff; background-color: #003366; 
        border: 2px solid #003366; border-radius: 40px; 
        cursor: pointer; transition: all 0.2s ease-in-out;
        text-decoration: none;
    }
    .btn-cta:hover { background-color: #F46C38; border-color: #F46C38; transform: translateY(-2px); }
    .btn-cta:active { transform: scale(0.95); }
    .btn-cta.outline { background: transparent; color: #003366; }
    .btn-cta.outline:hover { background: #003366; color: #fff; }

    .card-grid {
        display: flex; flex-wrap: wrap; gap: 24px;
        padding: 40px; border: 1px solid #b6c3d1; border-radius: 32px;
        background-color: #fff; box-shadow: 0 10px 40px rgba(0, 0, 0, 0.03);
    }
    .service-card {
        flex: 1 1 300px; background: #fff; border: 1px solid #e2e8f0;
        border-radius: 20px; padding: 32px; display: flex; flex-direction: column;
    }
    .btn-delete { 
        color: #ef4444; cursor: pointer; text-decoration: underline; 
        background: none; border: none; margin-top: 15px; font-weight: 500;
    }
    .site-footer { background: #0B1A33; color: #fff; padding: 40px 0; margin-top: 40px; }
`;

const styleSheet = document.createElement("style");
styleSheet.innerText = css;
document.head.appendChild(styleSheet);