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
            video: 'https://www.youtube.com/watch?v=Q9PNaYtUMyg',
            detalles: {
                año: '2008-2015',
                autor: 'Desconocido',
                plataformas: ['Windows XP', 'Windows Vista', 'Windows 7', 'Windows 8'],
                capacidades: [
                    'Captura de pantalla en tiempo real',
                    'Grabación de pulsaciones de teclado (keylogging)',
                    'Acceso a webcam y micrófono',
                    'Administración de archivos',
                    'Ejecución de comandos remotos',
                    'Robo de credenciales',
                    'Descarga y ejecución de archivos'
                ],
                metodos_propagacion: [
                    'Correos electrónicos de phishing',
                    'Sitios web comprometidos',
                    'Redes P2P infectadas',
                    'Descargas falsas'
                ],
                indicadores_ioc: [
                    'Puertos: 7779-7785',
                    'Proceso: vncscreen.exe',
                    'Archivos en: C:\\Windows\\Temp',
                    'Registro: HKCU\\Software\\Microsoft\\Windows\\Run'
                ],
                tecnicas_deteccion: [
                    'Monitoreo de conexiones de red salientes',
                    'Análisis heurístico del comportamiento',
                    'Búsqueda de artefactos en el registro',
                    'Monitoreo de acceso a dispositivos (webcam, micrófono)'
                ]
            }
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
            video: 'https://www.youtube.com/watch?v=kwLOVVwT8ak',
            detalles: {
                año: '2012-Presente',
                autor: 'Njrat Team (Árabe)',
                plataformas: ['Windows', 'Servidores Windows'],
                capacidades: [
                    'Control remoto completo',
                    'Minería de criptomonedas',
                    'Persistencia en el sistema',
                    'Robo de credenciales y datos',
                    'Propagación por USB',
                    'Captura de pantalla',
                    'Bypass de firewall'
                ],
                metodos_propagacion: [
                    'Phishing avanzado',
                    'Correos con archivos maliciosos',
                    'Sitios web de descarga falsa',
                    'Redes P2P',
                    'Propagación por USB'
                ],
                indicadores_ioc: [
                    'Puertos: 5552-5557',
                    'Archivos: nj*.exe, update*.exe',
                    'Conexiones a C2 servidores',
                    'Mutexes: "njrat"'
                ],
                tecnicas_deteccion: [
                    'Análisis de tráfico de red',
                    'Monitoreo de procesos hijos',
                    'Detección de comportamiento de minería',
                    'Búsqueda de propagación por USB'
                ]
            }
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
            video: 'https://www.youtube.com/watch?v=Lb3Q-CkXfVw',
            detalles: {
                año: '2015-Presente',
                autor: 'Grupo Sednit (APT28)',
                plataformas: ['Sistemas con UEFI vulnerable', 'AMI BIOS', 'Insyde BIOS'],
                capacidades: [
                    'Persistencia a nivel de firmware',
                    'Invisibilidad ante antivirus',
                    'Carga de drivers maliciosos',
                    'Sobrevive a formateo de disco',
                    'Intercepta el arranque del sistema',
                    'Evasión de detección'
                ],
                metodos_propagacion: [
                    'Acceso físico a equipos',
                    'Vulnerabilidades en BIOS',
                    'Ataques dirigidos a infraestructura crítica',
                    'Herramientas de actualización falsa de BIOS'
                ],
                indicadores_ioc: [
                    'Modificaciones en UEFI/BIOS',
                    'Cambios en variables NVRAM',
                    'Firmas de firmware modificado',
                    'Presencia de código no autorizado en UEFI'
                ],
                tecnicas_deteccion: [
                    'Análisis forense de BIOS/UEFI',
                    'Verificación criptográfica de firmware',
                    'Herramientas especializadas (UEFITool)',
                    'Búsqueda de anomalías en el arranque'
                ]
            }
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
            video: 'https://www.youtube.com/watch?v=1-FyyhpW-t8',
            detalles: {
                año: '2016-Presente',
                autor: 'Múltiples actores de amenaza',
                plataformas: ['Windows 7+', 'Windows Server'],
                capacidades: [
                    'Ejecución en memoria',
                    'Sin huella en disco',
                    'Ofuscación de script',
                    'Bypass de antivirus',
                    'Inyección en procesos legítimos',
                    'Uso de herramientas nativas de Windows',
                    'Cifrado dinámico'
                ],
                metodos_propagacion: [
                    'Correos de phishing con enlaces',
                    'Sitios web comprometidos',
                    'Documentos Office con macros',
                    'Uso de herramientas legítimas (HTA, VBScript)'
                ],
                indicadores_ioc: [
                    'Logs de PowerShell anormales',
                    'Comandos ofuscados en memoria',
                    'Inyección en: svchost.exe, lsass.exe',
                    'Conexiones anómalas desde PowerShell'
                ],
                tecnicas_deteccion: [
                    'Monitoreo de PowerShell Logging',
                    'Análisis de memoria (memory dumps)',
                    'Monitoreo de WMI',
                    'Análisis de comportamiento de .NET',
                    'EDR (Endpoint Detection and Response)'
                ]
            }
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
            video: 'https://www.youtube.com/watch?v=aAfuNn2URng',
            detalles: {
                año: '2017-Presente',
                autor: 'Lazarus Group (Corea del Norte)',
                plataformas: ['Windows XP', 'Windows 7', 'Windows 8', 'Windows 10', 'Windows Server'],
                capacidades: [
                    'Cifrado AES + RSA de archivos',
                    'Propagación por SMB (EternalBlue)',
                    'Escaneo de red automático',
                    'Extorsión de rescate',
                    'Eliminación de copias de seguridad',
                    'Propagación gusano',
                    'Bloqueo de acceso a datos'
                ],
                metodos_propagacion: [
                    'Vulnerabilidad SMB (CVE-2017-0144)',
                    'Herramienta EternalBlue',
                    'Descarga de exploit kit',
                    'Propagación lateral en redes',
                    'Acceso inicial por credenciales débiles'
                ],
                indicadores_ioc: [
                    'Proceso: worm.exe, tasksche.exe',
                    'Extensión de archivos: .WCRY',
                    'Archivo de rescate: @Please_Read_Me@.txt',
                    'C2: iuqerfsodp9ifjaposdfjhgosurijfaewrwergwea.com',
                    'Puerto 445 (SMB)'
                ],
                tecnicas_deteccion: [
                    'Parches de seguridad MS17-010',
                    'Segmentación de red',
                    'Detección de tráfico SMB anómalo',
                    'Backups desconectados',
                    'Monitoreo de cambios de archivo masivos'
                ]
            }
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
            video: 'https://www.youtube.com/watch?v=rdXBVL9gSFQ',
            detalles: {
                año: '2019-Presente',
                autor: 'LockBit Affiliate Network (Rusia)',
                plataformas: ['Windows', 'Linux', 'VMware ESXi', 'Servidores NAS'],
                capacidades: [
                    'Cifrado rápido (multi-threading)',
                    'Doble extorsión (cifrado + filtración)',
                    'Propagación lateral avanzada',
                    'Bypass de EDR y seguridad',
                    'Exploración de red automatizada',
                    'Evasión de VM y análisis',
                    'Soporte de múltiples lenguajes'
                ],
                metodos_propagacion: [
                    'Acceso a través de RDP',
                    'Vulnerabilidades de software',
                    'Credenciales comprometidas',
                    'Servicios expuestos a internet',
                    'Botnets y malware inicial (Emotet, Trickbot)'
                ],
                indicadores_ioc: [
                    'Proceso: c_3456.exe, qmreporting.exe',
                    'Extensión: .lockbit3',
                    'Nota de rescate: lockbit_note.txt',
                    'Portal: Sitio .onion de LockBit',
                    'Sitio de filtración de datos'
                ],
                tecnicas_deteccion: [
                    'Monitoreo de tráfico RDP anómalo',
                    'Detección de movimiento lateral',
                    'Análisis de procesos secundarios',
                    'Monitoreo de cambios de archivos masivos',
                    'EDR con detección de comportamiento'
                ]
            }
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
            video: 'https://www.youtube.com/watch?v=U2Y88kw8WVw',
            detalles: {
                año: '2005-2015',
                autor: 'Lyle Barnaby (descubierto)',
                plataformas: ['Windows', 'Windows Server'],
                capacidades: [
                    'Control remoto completo',
                    'Captura de pantalla',
                    'Grabación de teclado',
                    'Robo de credenciales',
                    'Administración de archivos',
                    'Monitoreo de procesos',
                    'Ejecución de comandos',
                    'Acceso a webcam'
                ],
                metodos_propagacion: [
                    'Correos de phishing dirigidos',
                    'Documentos Office maliciosos',
                    'Descarga de sitios comprometidos',
                    'Ataques contra gobiernos',
                    'Campañas de espionaje selectivas'
                ],
                indicadores_ioc: [
                    'Puertos: 3330-3339',
                    'Mutexes: específicos de versión',
                    'Proceso: CSRSS inyectado',
                    'Registro: HKLM\\Software\\Microsoft\\PoisonIvy',
                    'Archivos: .ini y .dat en AppData'
                ],
                tecnicas_deteccion: [
                    'Análisis de firmas de malware',
                    'Monitoreo de conexiones salientes',
                    'Análisis heurístico',
                    'Búsqueda de comportamiento de espionaje',
                    'Análisis forense de memoria'
                ]
            }
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
            video: 'https://www.youtube.com/watch?v=_X2QMtQkh3M',
            detalles: {
                año: '2009-2010',
                autor: 'USA e Israel (documentado)',
                plataformas: ['Windows', 'Siemens SCADA', 'PLCs industriales'],
                capacidades: [
                    'Modificación de código PLC',
                    'Invisibilidad del rootkit',
                    'Exfiltración de datos SCADA',
                    'Persistencia en sistemas',
                    'Sabotaje de equipamiento industrial',
                    'Propagación por USB',
                    'Exploit de cero-días'
                ],
                metodos_propagacion: [
                    'Vulnerabilidades de Windows (zero-days)',
                    'Certificados digitales robados',
                    'Propagación por USB',
                    'Acceso directo a red industrial',
                    'Ingeniería social dirigida'
                ],
                indicadores_ioc: [
                    'Archivos: .lnk maliciosos en USB',
                    'Drivers: mrxcls.sys (drivere falso)',
                    'Nombre de usuario: siemens (hardcoded)',
                    'Modificaciones en ProjectType.xml',
                    'Registros en SCADA alterados'
                ],
                tecnicas_deteccion: [
                    'Análisis de código PLC',
                    'Inspección de integridad de firmware',
                    'Monitoreo de cambios en SCADA',
                    'Forense industrial especializada',
                    'Análisis de comunicaciones Profibus/Modbus'
                ]
            }
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
                <div class="card" style="animation-delay: ${0.04 * (idx % 8)}s; cursor: pointer;" data-id="${item.id}">
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
                    <div style="text-align: center; margin-top: 1rem; font-size: 0.85rem; color: #6f8fc9;">
                        <i class="fas fa-info-circle"></i> Haz clic para ver más detalles
                    </div>
                </div>
            `;
        });

        grid.innerHTML = html;

        document.querySelectorAll('.card').forEach(card => {
            card.addEventListener('click', function () {
                const id = parseInt(this.dataset.id);
                const item = malwareData.find(m => m.id === id);
                if (item) {
                    openModal(item);
                }
            });
        });
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

    function openModal(item) {
        const modalOverlay = document.createElement('div');
        modalOverlay.className = 'modal-overlay';

        const detalles = item.detalles || {};

        let contenidoDetalles = '';

        if (detalles.año) {
            contenidoDetalles += `<div class="detalle-seccion"><strong>📅 Año(s) activo:</strong> ${detalles.año}</div>`;
        }
        if (detalles.autor) {
            contenidoDetalles += `<div class="detalle-seccion"><strong>👤 Autor/Grupo:</strong> ${detalles.autor}</div>`;
        }
        if (detalles.plataformas && detalles.plataformas.length) {
            contenidoDetalles += `<div class="detalle-seccion"><strong>🖥️ Plataformas afectadas:</strong><br><ul class="lista-detalles">${detalles.plataformas.map(p => `<li>${p}</li>`).join('')}</ul></div>`;
        }
        if (detalles.capacidades && detalles.capacidades.length) {
            contenidoDetalles += `<div class="detalle-seccion"><strong>⚡ Capacidades:</strong><br><ul class="lista-detalles">${detalles.capacidades.map(c => `<li>${c}</li>`).join('')}</ul></div>`;
        }
        if (detalles.metodos_propagacion && detalles.metodos_propagacion.length) {
            contenidoDetalles += `<div class="detalle-seccion"><strong>📡 Métodos de propagación:</strong><br><ul class="lista-detalles">${detalles.metodos_propagacion.map(m => `<li>${m}</li>`).join('')}</ul></div>`;
        }
        if (detalles.indicadores_ioc && detalles.indicadores_ioc.length) {
            contenidoDetalles += `<div class="detalle-seccion"><strong>🔍 Indicadores de Compromiso (IoC):</strong><br><ul class="lista-detalles">${detalles.indicadores_ioc.map(i => `<li><code>${i}</code></li>`).join('')}</ul></div>`;
        }
        if (detalles.tecnicas_deteccion && detalles.tecnicas_deteccion.length) {
            contenidoDetalles += `<div class="detalle-seccion"><strong>🛡️ Técnicas de detección:</strong><br><ul class="lista-detalles">${detalles.tecnicas_deteccion.map(t => `<li>${t}</li>`).join('')}</ul></div>`;
        }

        const modalContent = document.createElement('div');
        modalContent.className = 'modal-content';
        modalContent.innerHTML = `
            <div class="modal-header">
                <div class="modal-titulo">
                    <span class="modal-emoji">${item.emoji || '🔹'}</span>
                    <div>
                        <h2>${item.nombre}</h2>
                        <span class="modal-tipo-badge">${item.tipo}</span>
                    </div>
                </div>
                <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <div class="modal-descripcion">
                    <h3>Descripción</h3>
                    <p>${item.descripcion}</p>
                    <div class="impacto-modal"><i class="fas fa-exclamation-triangle"></i> ${item.impacto}</div>
                </div>

                <div class="modal-detalles">
                    <h3>📋 Información Técnica Detallada</h3>
                    ${contenidoDetalles}
                </div>

                <div class="modal-enlaces">
                    <h3>🔗 Recursos Adicionales</h3>
                    <div class="enlaces-contenedor">
                        ${item.enlace ? `<a href="${item.enlace}" target="_blank" rel="noopener noreferrer" class="enlace-modal"><i class="fas fa-external-link-alt"></i> Leer más información</a>` : ''}
                        ${item.video ? `<a href="${item.video}" target="_blank" rel="noopener noreferrer" class="enlace-modal enlace-video-modal"><i class="fab fa-youtube"></i> Ver vídeo informativo</a>` : ''}
                    </div>
                </div>
            </div>
        `;

        modalOverlay.appendChild(modalContent);
        document.body.appendChild(modalOverlay);

        modalOverlay.addEventListener('click', function (e) {
            if (e.target === modalOverlay) {
                modalOverlay.remove();
            }
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                modalOverlay.remove();
            }
        });
    }

    renderCards('todos', '');
});