document.addEventListener('DOMContentLoaded', () => {
    const botones = document.querySelectorAll('[data-caso]');
    const casoTipo = document.getElementById('casoTipo');
    const casoFecha = document.getElementById('casoFecha');
    const casoTitulo = document.getElementById('casoTitulo');
    const casoTexto = document.getElementById('casoTexto');
    const casoLeccion = document.getElementById('casoLeccion');
    const casoFuente = document.getElementById('casoFuente');

    const casos = {
        coppel: {
            tipo: 'Incidente reportado', fecha: 'México · 2024', titulo: 'Coppel: continuidad antes que especulación',
            texto: 'Durante 2024 se reportaron interrupciones en servicios y operaciones de Coppel asociadas públicamente con un incidente de ciberseguridad. La lección no es afirmar que una base de datos fue eliminada sin evidencia: es distinguir indisponibilidad, cifrado, pérdida y recuperación.',
            leccion: '¿Qué servicio dejó de operar? ¿Qué respaldo existía? ¿Qué indicador comprobaría cada hipótesis?', fuente: 'Consultar fuente institucional', url: 'https://www.coppel.com/'
        },
        telcel: {
            tipo: 'Caso para contrastar', fecha: 'México · reportes públicos', titulo: 'Telcel: separar rumor, acceso y evidencia',
            texto: 'En torno a Telcel han circulado reportes de accesos no autorizados y exposición de datos. Sin un comunicado técnico que detalle alcance, fecha y sistema afectado, no debe presentarse como una eliminación confirmada de su base de datos.',
            leccion: 'Busca alcance, usuarios afectados, indicador de compromiso y mitigación; no conviertas una afirmación viral en un hecho técnico.', fuente: 'Consultar sitio institucional', url: 'https://www.telcel.com/'
        },
        wannacry: {
            tipo: 'Ransomware documentado', fecha: 'Global · mayo de 2017', titulo: 'WannaCry: un parche que cambió la historia',
            texto: 'WannaCry se propagó aprovechando una vulnerabilidad de SMB en sistemas sin actualizar y afectó a organizaciones de numerosos países. El incidente mostró cómo una falla conocida, respaldos insuficientes y redes planas pueden convertir un problema local en una crisis operativa.',
            leccion: 'Prioriza parches, segmentación, respaldos probados y un inventario que permita saber qué equipos siguen expuestos.', fuente: 'Microsoft Security Response Center', url: 'https://msrc.microsoft.com/blog/2017/05/customer-guidance-for-wannacrypt-attacks/'
        },
        colonial: {
            tipo: 'Ransomware documentado', fecha: 'Estados Unidos · mayo de 2021', titulo: 'Colonial Pipeline: cuando la operación se detiene',
            texto: 'El ataque a Colonial Pipeline provocó la suspensión temporal de operaciones y mostró que el impacto de un ransomware no se limita a los archivos cifrados: también puede alcanzar procesos, logística, comunicación y confianza pública.',
            leccion: 'Incluye continuidad de negocio en la respuesta: rutas alternativas, comunicación clara y criterios para restaurar servicios.', fuente: 'Agencia de Ciberseguridad de Estados Unidos', url: 'https://www.cisa.gov/news-events/cybersecurity-advisories/aa21-131a'
        }
    };

    botones.forEach((boton) => {
        boton.addEventListener('click', () => {
            const caso = casos[boton.dataset.caso];
            if (!caso) return;

            botones.forEach((item) => {
                const activo = item === boton;
                item.classList.toggle('activo', activo);
                item.setAttribute('aria-selected', activo);
            });
            casoTipo.textContent = caso.tipo;
            casoFecha.textContent = caso.fecha;
            casoTitulo.textContent = caso.titulo;
            casoTexto.textContent = caso.texto;
            casoLeccion.textContent = caso.leccion;
            casoFuente.href = caso.url;
            casoFuente.innerHTML = `${caso.fuente} <i class="fas fa-arrow-up-right-from-square"></i>`;
        });
    });
});
