document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('catalogoGrid');
    const filtros = document.querySelectorAll('.filtro-btn');
    const searchInput = document.getElementById('searchInput');

    const malwareData = [
        {
            id: 1,
            nombre: 'DarkComet RAT',
            tipo: 'control',
            descripcion: 'Control remoto avanzado con captura de pantalla, keylogging y acceso a webcam. Usado en ciberespionaje. Permite administrar archivos, ejecutar comandos y grabar audio/micrófono. Es highly configurable y difícil de detectar.',
            icono: 'images/rat.png',
            emoji: '🕹️',
            impacto: 'Alto · Espionaje',
            enlace: 'https://www.malwarebytes.com/blog/news/2012/06/you-dirty-rat-part-1-darkcomet',
            video: 'https://www.youtube.com/watch?v=Q9PNaYtUMyg'
        },
        {
            id: 2,
            nombre: 'NjRAT',
            tipo: 'control',
            descripcion: 'Backdoor con persistencia, minería y control remoto. Permite robo de credenciales, archivos y navegación encubierta. Incluye funciones de ransomware ligero y propagación por USB.',
            icono: 'images/backdoor.png',
            emoji: '🔓',
            impacto: 'Crítico · Robo de datos',
            enlace: 'https://attack.mitre.org/software/S0385/',
            video: 'https://www.youtube.com/watch?v=kwLOVVwT8ak'
        },
        {
            id: 3,
            nombre: 'Rootkit · UEFI',
            tipo: 'ocultamiento',
            descripcion: 'Se oculta en el firmware UEFI, indetectable para antivirus. Persistente y difícil de eliminar. Puede espiar el arranque del sistema, cargar drivers maliciosos y sobrevivir a formateos.',
            icono: 'images/rootkit.png',
            emoji: '👻',
            impacto: 'Persistente · Invisible',
            enlace: 'https://www.welivesecurity.com/la-es/2018/09/27/lojax-primer-rootkit-uefi-en-uso-cortesia-grupo-sednit/',
            video: 'https://www.youtube.com/watch?v=Lb3Q-CkXfVw'
        },
        {
            id: 4,
            nombre: 'Fileless · PowerShell',
            tipo: 'ocultamiento',
            descripcion: 'Ejecución en memoria sin archivos en disco. Ofuscación avanzada y difícil de rastrear. Utiliza scripts de PowerShell, WMI y .NET para cargar payloads directamente en RAM.',
            icono: 'images/file.png',
            emoji: '🌀',
            impacto: 'Sigiloso · Difícil de rastrear',
            enlace: 'https://www.cisa.gov/news-events/cybersecurity-advisories/aa22-320a',
            video: 'https://www.youtube.com/watch?v=1-FyyhpW-t8'
        },
        {
            id: 5,
            nombre: 'WannaCry Ransomware',
            tipo: 'impacto',
            descripcion: 'Cifra archivos y exige rescate en Bitcoin. Propagación por vulnerabilidad SMB (EternalBlue). Afectó a miles de organizaciones globales en 2017, paralizando hospitales y empresas.',
            icono: 'images/ransomware.png',
            emoji: '💀',
            impacto: 'Catastrófico · Extorsión',
            enlace: 'https://www.kaspersky.com/resource-center/threats/ransomware-wannacry',
            video: 'https://www.youtube.com/watch?v=aAfuNn2URng'
        },
        {
            id: 6,
            nombre: 'LockBit 3.0',
            tipo: 'impacto',
            descripcion: 'Ransomware-as-a-service con doble extorsión, cifrado rápido y filtración de datos. Utiliza técnicas de evasión avanzadas y ataca tanto a Windows como a Linux.',
            icono: 'images/lockbit.png',
            emoji: '🔐',
            impacto: 'Severo · Parálisis empresarial',
            enlace: 'https://www.cisa.gov/news-events/cybersecurity-advisories/aa23-075a',
            video: 'https://www.youtube.com/watch?v=rdXBVL9gSFQ'
        },
        {
            id: 7,
            nombre: 'Poison Ivy RAT',
            tipo: 'control',
            descripcion: 'Backdoor usado en ciberespionaje, control remoto total y exfiltración de información. Fue utilizado en ataques contra gobiernos y sectores estratégicos. Permite gestión de procesos y archivos.',
            icono: 'images/poisonivy.png',
            emoji: '🐍',
            impacto: 'Alto · Exfiltración',
            enlace: 'https://attack.mitre.org/software/S0017/',
            video: 'https://www.youtube.com/watch?v=U2Y88kw8WVw'
        },
        {
            id: 8,
            nombre: 'Stuxnet (Rootkit)',
            tipo: 'ocultamiento',
            descripcion: 'Rootkit industrial que modifica PLCs y oculta su presencia. Ataque a infraestructura crítica (centrifugadoras nucleares). Es considerado el primer ciberarma conocido.',
            icono: 'images/stuxnet.png',
            emoji: '⚙️',
            impacto: 'Crítico · Sabotaje industrial',
            enlace: 'https://www.kaspersky.com/resource-center/definitions/what-is-stuxnet',
            video: 'https://www.youtube.com/watch?v=_X2QMtQkh3M'
        }
    ];

    function renderCards(tipoFiltro = 'todos', busqueda = '') {
        if (!grid) return;

        let filtrados = tipoFiltro === 'todos'
            ? malwareData
            : malwareData.filter(m => m.tipo === tipoFiltro);

        if (busqueda.trim() !== '') {
            const q = busqueda.toLowerCase().trim();
            filtrados = filtrados.filter(m =>
                m.nombre.toLowerCase().includes(q) ||
                m.descripcion.toLowerCase().includes(q) ||
                m.tipo.includes(q)
            );
        }

        if (filtrados.length === 0) {
            grid.innerHTML = `
                <div class="no-results" style="grid-column:1/-1; text-align:center; padding:3rem; color:#7c8db0; background:#101827; border-radius:2rem; border:1px solid #1f2a42;">
                    <i class="fas fa-search" style="font-size:2rem; display:block; margin-bottom:1rem; color:#4a6a9e;"></i>
                    <span>No hay malware que coincida con tu búsqueda</span>
                </div>`;
            return;
        }

        let html = '';
        filtrados.forEach((item, idx) => {
            const recursos = item.recursos || [];
            html += `
                <div class="card" style="animation-delay: ${0.04 * (idx % 8)}s">
                    <div class="card-icono">
                        <img src="${item.icono || 'images/default.png'}" alt="${item.nombre}" loading="lazy" onerror="this.style.display='none'" />
                        <span class="emoji-grande">${item.emoji || '🔹'}</span>
                    </div>
                    <h3>${item.nombre}</h3>
                    <span class="tipo-badge"><i class="fas fa-tag"></i> ${item.tipo}</span>
                    <p>${item.descripcion}</p>
                    ${recursos.length > 0 ? `
                        <div class="multimedia">
                            ${recursos.map(r => `<span><i class="fas fa-circle" style="font-size:0.3rem; color:#6f8fc9;"></i> ${r}</span>`).join('')}
                        </div>` : ''
                    }
                    <span class="impacto"><i class="fas fa-exclamation-triangle"></i> ${item.impacto}</span>
                    
                    <div class="acciones-card" style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-top: 1rem;">
                        ${item.enlace ? `<a href="${item.enlace}" target="_blank" rel="noopener noreferrer" class="enlace-externo"><i class="fas fa-external-link-alt"></i> Información</a>` : ''}
                        ${item.video ? `<a href="${item.video}" target="_blank" rel="noopener noreferrer" class="enlace-externo enlace-video" style="background: rgba(255, 0, 0, 0.15); color: #ff4d4d; border: 1px solid rgba(255, 0, 0, 0.3);"><i class="fab fa-youtube"></i> Ver Video</a>` : ''}
                    </div>
                </div>
            `;
        });

        grid.innerHTML = html;
    }

    filtros.forEach(btn => {
        btn.addEventListener('click', function () {
            filtros.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const tipo = this.dataset.tipo;
            renderCards(tipo, searchInput ? searchInput.value : '');
        });
    });

    if (searchInput) {
        searchInput.addEventListener('input', function () {
            const activeFiltro = document.querySelector('.filtro-btn.active');
            const tipo = activeFiltro ? activeFiltro.dataset.tipo : 'todos';
            renderCards(tipo, this.value);
        });
    }

    renderCards('todos', '');
});