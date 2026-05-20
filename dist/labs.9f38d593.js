var u=globalThis,e={},t={},o=u.parcelRequire65e5;null==o&&((o=function(u){if(u in e)return e[u].exports;if(u in t){var o=t[u];delete t[u];var r={id:u,exports:{}};return e[u]=r,o.call(r.exports,r,r.exports),r.exports}var n=Error("Cannot find module '"+u+"'");throw n.code="MODULE_NOT_FOUND",n}).register=function(u,e){t[u]=e},u.parcelRequire65e5=o),(0,o.register)("45f4g",function(u,e){Object.defineProperty(u.exports,"injectStyles",{get:()=>o,set:void 0,enumerable:!0,configurable:!0});let t=`
    @font-face {
        font-family: 'Figtree';
        src: url('../fonts/Figtree-VariableFont_wght.ttf') format('truetype');
        font-weight: 300 900;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    
    /* \u{41F}\u{440}\u{438}\u{436}\u{438}\u{43C}\u{430}\u{435}\u{43C} \u{444}\u{443}\u{442}\u{435}\u{440} \u{43A} \u{43D}\u{438}\u{437}\u{443} */
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

    /* \u{41E}\u{441}\u{43D}\u{43E}\u{432}\u{43D}\u{43E}\u{439} \u{43A}\u{43E}\u{43D}\u{442}\u{435}\u{43D}\u{442} \u{437}\u{430}\u{43D}\u{438}\u{43C}\u{430}\u{435}\u{442} \u{432}\u{441}\u{451} \u{441}\u{432}\u{43E}\u{431}\u{43E}\u{434}\u{43D}\u{43E}\u{435} \u{43C}\u{435}\u{441}\u{442}\u{43E} */
    .content { flex: 1 0 auto; padding: 40px 0 80px; }
    
    /* \u{421}\u{422}\u{418}\u{41B}\u{418} \u{41A}\u{41D}\u{41E}\u{41F}\u{41E}\u{41A} */
    .btn-cta {
        display: inline-flex; 
        justify-content: center; 
        align-items: center;
        padding: 12px 28px; 
        font-size: 16px; 
        font-weight: 600;
        font-family: 'Figtree', sans-serif;
        
        /* \u{412} \u{43E}\u{431}\u{44B}\u{447}\u{43D}\u{43E}\u{43C} \u{441}\u{43E}\u{441}\u{442}\u{43E}\u{44F}\u{43D}\u{438}\u{438} \u{2014} \u{43F}\u{440}\u{43E}\u{437}\u{440}\u{430}\u{447}\u{43D}\u{44B}\u{439} \u{444}\u{43E}\u{43D}, \u{442}\u{435}\u{43C}\u{43D}\u{43E}-\u{441}\u{438}\u{43D}\u{44F}\u{44F} \u{440}\u{430}\u{43C}\u{43A}\u{430} \u{438} \u{442}\u{435}\u{43A}\u{441}\u{442} */
        color: #002B5B; 
        background-color: transparent; 
        border: 2px solid #002B5B; 
        border-radius: 40px; /* \u{418}\u{434}\u{435}\u{430}\u{43B}\u{44C}\u{43D}\u{43E} \u{43A}\u{440}\u{443}\u{433}\u{43B}\u{430}\u{44F} \u{444}\u{43E}\u{440}\u{43C}\u{430} "\u{43A}\u{430}\u{43F}\u{441}\u{443}\u{43B}\u{44B}" */
        
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

    /* \u{41C}\u{43E}\u{434}\u{438}\u{444}\u{438}\u{43A}\u{430}\u{442}\u{43E}\u{440} outline (\u{435}\u{441}\u{43B}\u{438} \u{433}\u{434}\u{435}-\u{442}\u{43E} \u{43D}\u{443}\u{436}\u{435}\u{43D} \u{430}\u{43B}\u{44C}\u{442}\u{435}\u{440}\u{43D}\u{430}\u{442}\u{438}\u{432}\u{43D}\u{44B}\u{439} \u{441}\u{442}\u{438}\u{43B}\u{44C}, \u{43D}\u{43E} \u{441}\u{435}\u{439}\u{447}\u{430}\u{441} \u{43E}\u{43D}\u{438} \u{432}\u{441}\u{435} \u{43E}\u{434}\u{438}\u{43D}\u{430}\u{43A}\u{43E}\u{432}\u{44B}\u{435}) */
    .btn-cta.outline { 
        background: transparent; 
        color: #002B5B; 
        border-color: #002B5B;
    }
    .btn-cta.outline:hover { 
        background-color: #002B5B; 
        color: #fff; 
    }

    /* \u{421}\u{422}\u{418}\u{41B}\u{418} \u{41A}\u{410}\u{420}\u{422}\u{41E}\u{427}\u{415}\u{41A} \u{418}\u{417} \u{41C}\u{410}\u{41A}\u{415}\u{422}\u{410} */
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

    /* \u{421}\u{422}\u{418}\u{41B}\u{418}\u{417}\u{410}\u{426}\u{418}\u{42F} \u{41A}\u{41D}\u{41E}\u{41F}\u{41A}\u{418} \u{423}\u{414}\u{410}\u{41B}\u{418}\u{422}\u{42C}*/
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

    /* \u{42D}\u{424}\u{424}\u{415}\u{41A}\u{422} \u{41F}\u{420}\u{418} \u{41D}\u{410}\u{412}\u{415}\u{414}\u{415}\u{41D}\u{418}\u{418} \u{41D}\u{410} \u{423}\u{414}\u{410}\u{41B}\u{418}\u{422}\u{42C} */
    .btn-delete:hover { 
        color: #e05b2b;           
        text-decoration: underline; /* \u{41F}\u{43E}\u{434}\u{447}\u{435}\u{440}\u{43A}\u{438}\u{432}\u{430}\u{43D}\u{438}\u{435} \u{43F}\u{440}\u{438} \u{43D}\u{430}\u{432}\u{435}\u{434}\u{435}\u{43D}\u{438}\u{438} */
        text-underline-offset: 4px;
    }

    .btn-delete:active {
        transform: scale(0.95);
    }
    
    /* \u{424}\u{423}\u{422}\u{415}\u{420} \u{41D}\u{410}\u{414}\u{415}\u{416}\u{41D}\u{41E} \u{41F}\u{420}\u{418}\u{416}\u{410}\u{422} */
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
`,o=()=>{if(!document.getElementById("cloudcalc-styles")){let u=document.createElement("style");u.id="cloudcalc-styles",u.textContent=t,document.head.appendChild(u)}}});var r=o("45f4g");let n=document.getElementById("app"),i="/api/requests";async function a(u=""){let e=i;u&&(e+=`?status=${encodeURIComponent(u)}`);try{let u=await fetch(e);if(!u.ok)throw Error("Ошибка сети");let t=await u.json();!function(u){let e=`
        <div class="services-header">
            <h1>\u{423}\u{441}\u{43B}\u{443}\u{433}\u{438} \u{43C}\u{43E}\u{434}\u{435}\u{43B}\u{438}\u{440}\u{43E}\u{432}\u{430}\u{43D}\u{438}\u{44F}</h1>
            <div class="controls-group">
                <input type="text" id="statusFilter" class="filter-input" placeholder="\u{43F}\u{43E}\u{438}\u{441}\u{43A} \u{43F}\u{43E} \u{441}\u{442}\u{430}\u{442}\u{443}\u{441}\u{443}">
                <button class="btn-cta" onclick="applyFilter()">\u{41D}\u{430}\u{439}\u{442}\u{438}</button>
                <button class="btn-cta outline" onclick="window.location.href='edit.html'">\u{414}\u{43E}\u{431}\u{430}\u{432}\u{438}\u{442}\u{44C} \u{443}\u{441}\u{43B}\u{443}\u{433}\u{443}</button>
            </div>
        </div>
        <div class="card-grid">
    `;if(!u||0===u.length){n.innerHTML=e+='<p style="font-size: 1.2rem; color: #4B5563;">Заявок не найдено.</p></div>';return}u.forEach(u=>{e+=`
            <div class="service-card">
                <div class="card-body">
                    <h3>${u.equipmentType}</h3>
                    <span class="status-badge">\u{421}\u{442}\u{430}\u{442}\u{443}\u{441}: ${u.status}</span>
                    <p><strong>\u{412}\u{438}\u{434} \u{43C}\u{43E}\u{434}\u{435}\u{43B}\u{438}\u{440}\u{43E}\u{432}\u{430}\u{43D}\u{438}\u{44F}:</strong> ${u.modelingType}</p>
                </div>
                <div class="card-footer">
                    <button class="btn-cta" onclick="window.location.href='edit.html?id=${u.id}'">\u{41F}\u{43E}\u{434}\u{440}\u{43E}\u{431}\u{43D}\u{435}\u{435}</button>
                    <button class="btn-delete" onclick="deleteService('${u.id}')">\u{423}\u{434}\u{430}\u{43B}\u{438}\u{442}\u{44C}</button>
                </div>
            </div>
        `}),n.innerHTML=e+="</div>"}(t)}catch(u){console.error("Ошибка:",u),n.innerHTML=`
            <div style="padding: 40px; text-align: center; color: #ef4444;">
                <h2>\u{421}\u{435}\u{442}\u{435}\u{432}\u{430}\u{44F} \u{43E}\u{448}\u{438}\u{431}\u{43A}\u{430}!</h2>
                <p>\u{41D}\u{435} \u{443}\u{434}\u{430}\u{43B}\u{43E}\u{441}\u{44C} \u{43F}\u{43E}\u{43B}\u{443}\u{447}\u{438}\u{442}\u{44C} \u{434}\u{430}\u{43D}\u{43D}\u{44B}\u{435} \u{441} \u{441}\u{435}\u{440}\u{432}\u{435}\u{440}\u{430} API.</p>
            </div>
        `}}window.applyFilter=()=>{a(document.getElementById("statusFilter").value.trim())},window.deleteService=async u=>{try{(await fetch(`${i}/${u}`,{method:"DELETE"})).ok&&a()}catch(u){console.error("Ошибка удаления:",u)}},document.getElementById("nav-home").onclick=u=>{u.preventDefault(),a()},document.getElementById("nav-logo").onclick=u=>{u.preventDefault(),a()},document.getElementById("nav-about").onclick=u=>{u.preventDefault(),n.innerHTML=`
            <div style="background: #fff; padding: 60px; border-radius: 32px; border: 1px solid #b6c3d1; margin-bottom: 40px;">
                <h1 style="font-size: 2.5rem; margin-bottom: 20px;">\u{41E} \u{43F}\u{440}\u{43E}\u{435}\u{43A}\u{442}\u{435}</h1>
                <p style="font-size: 1.1rem; color: #4B5563; margin-bottom: 30px; line-height: 1.8;">
                    \u{410}\u{43D}\u{430}\u{43B}\u{438}\u{442}\u{438}\u{447}\u{435}\u{441}\u{43A}\u{43E}\u{435} \u{43C}\u{43E}\u{434}\u{435}\u{43B}\u{438}\u{440}\u{43E}\u{432}\u{430}\u{43D}\u{438}\u{435} \u{437}\u{430}\u{433}\u{440}\u{443}\u{436}\u{435}\u{43D}\u{43D}\u{43E}\u{441}\u{442}\u{438} \u{441}\u{435}\u{442}\u{435}\u{432}\u{43E}\u{433}\u{43E} \u{43E}\u{431}\u{43E}\u{440}\u{443}\u{434}\u{43E}\u{432}\u{430}\u{43D}\u{438}\u{44F}.<br>
                    \u{423}\u{441}\u{43B}\u{443}\u{433}\u{438} \u{2014} \u{432}\u{438}\u{434}\u{44B} \u{43C}\u{43E}\u{434}\u{435}\u{43B}\u{438}\u{440}\u{43E}\u{432}\u{430}\u{43D}\u{438}\u{44F} \u{43F}\u{43E} \u{43E}\u{431}\u{43E}\u{440}\u{443}\u{434}\u{43E}\u{432}\u{430}\u{43D}\u{438}\u{44E}.<br>
                    \u{417}\u{430}\u{44F}\u{432}\u{43A}\u{438} \u{2014} \u{437}\u{430}\u{43F}\u{440}\u{43E}\u{441} \u{441} \u{432}\u{445}\u{43E}\u{434}\u{43D}\u{44B}\u{43C}\u{438} \u{434}\u{430}\u{43D}\u{43D}\u{44B}\u{43C}\u{438}.
                </p>
                <div style="display: flex; gap: 15px;">
                    <a href="https://github.com/Teddy-Ro/network-load-modeling" target="_blank" class="btn-cta">\u{41C}\u{43E}\u{439} GitHub</a>
                </div>
            </div>
        `},(0,r.injectStyles)(),a();
//# sourceMappingURL=labs.9f38d593.js.map
