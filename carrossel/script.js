document.addEventListener('DOMContentLoaded', () => {
    // 1. Elementos do Carrossel e Controles
    const rootElement = document.documentElement;
    const sliderTrack = document.getElementById('slider-track');
    const slideItems = document.querySelectorAll('.slide-item');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const codeElement = document.getElementById('css-code');
    
    const controls = {
        // ... (Todos os controles de input) ...
        'slideWidth': document.getElementById('slideWidth'),
        'slideHeight': document.getElementById('slideHeight'),
        'transitionDuration': document.getElementById('transitionDuration'),
        'timingFunction': document.getElementById('timingFunction'),
        'autoplayInterval': document.getElementById('autoplayInterval'),
        'indicatorColor': document.getElementById('indicatorColor'),
        'indicatorActiveColor': document.getElementById('indicatorActiveColor'),
        'indicatorSize': document.getElementById('indicatorSize'),
        'indicatorSpacing': document.getElementById('indicatorSpacing'),
        'btnBgColor': document.getElementById('btnBgColor'),
        'btnIconColor': document.getElementById('btnIconColor'),
        'btnBorderRadius': document.getElementById('btnBorderRadius'),
        'btnPadding': document.getElementById('btnPadding'),
    };

    // Para Looping Suave (5 slides no DOM: [C3] [S1] [S2] [S3] [C1])
    const totalSlidesInDOM = slideItems.length; // 5
    const originalTotalSlides = totalSlidesInDOM - 2; // 3
    let currentIndex = 1; // Inicia no primeiro slide real ([S1])
    let autoplayTimer = null;

    // --- Função Auxiliar para Formatar/Indentar Código ---
    function formatCode(codeString) {
        let cleanedCode = codeString.replace(/^\s*\n/gm, '').trim();
        let lines = cleanedCode.split('\n');
        let indentLevel = 0;
        let indentChar = '    '; 

        for (let i = 0; i < lines.length; i++) {
            let line = lines[i].trim();

            if (line.length === 0) {
                lines[i] = '';
                continue;
            }
            if (line.match(/^[\}\)\]]/) && indentLevel > 0) {
                indentLevel--;
            }
            lines[i] = indentChar.repeat(indentLevel) + line;
            if (line.match(/[\{\(]$/)) {
                indentLevel++;
            }
        }
        return lines.join('\n');
    }

    // --- 3. Funções de Navegação (Mudança de Estado) ---
    function updateIndicators(realIndex) {
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === realIndex);
        });
    }

    function moveToSlide(newIndex) {
        const width = controls.slideWidth.value;
        const duration = parseFloat(controls.transitionDuration.value);
        const timing = controls.timingFunction.value;
        
        currentIndex = newIndex;
        
        // 1. Ativar transição para o movimento visível
        sliderTrack.style.transition = `transform ${duration}s ${timing}`;
        
        // 2. Mover para o novo slide (real ou clone)
        const offset = -currentIndex * width;
        sliderTrack.style.transform = `translateX(${offset}px)`;
        
        // 3. Atualizar indicadores com base no slide REAL
        // Índice real (0, 1, 2) mapeado de (1, 2, 3)
        let realIndex = currentIndex - 1; 
        
        // Se estiver no clone do último (índice 0), o real é o último (2)
        if (currentIndex === 0) realIndex = originalTotalSlides - 1; 
        // Se estiver no clone do primeiro (índice 4), o real é o primeiro (0)
        else if (currentIndex === totalSlidesInDOM - 1) realIndex = 0; 
        
        updateIndicators(realIndex);


        // 4. Lógica de "Snap Back" (Salto Sem Transição)
        if (currentIndex === totalSlidesInDOM - 1 || currentIndex === 0) {
            
            // Espera a transição visual terminar
            setTimeout(() => {
                // A) Desativa a transição
                sliderTrack.style.transition = 'none';

                // B) Define o novo índice (pulo para o slide real)
                if (currentIndex === totalSlidesInDOM - 1) { // Estava no clone do primeiro (4)
                    currentIndex = 1; // Pula para o primeiro real (1)
                } else if (currentIndex === 0) { // Estava no clone do último (0)
                    currentIndex = totalSlidesInDOM - 2; // Pula para o último real (3)
                }
                
                // C) Realiza o pulo
                const snapOffset = -currentIndex * width;
                sliderTrack.style.transform = `translateX(${snapOffset}px)`;
                
                // D) Reativa a transição (necessário para o próximo clique/autoplay)
                setTimeout(() => {
                     sliderTrack.style.transition = `transform ${duration}s ${timing}`;
                }, 50); // Pequeno atraso para garantir que a transição seja reativada
                
            }, duration * 1000); // Aguarda o tempo de transição
        }
    }
    
    // --- 2. FUNÇÃO PRINCIPAL: Atualiza o Visual e Gera o Código ---
    function updateCarousel() {
        const width = controls.slideWidth.value;
        const height = controls.slideHeight.value;
        const duration = controls.transitionDuration.value;
        const timing = controls.timingFunction.value;
        const interval = parseFloat(controls.autoplayInterval.value);
        const indicatorColor = controls.indicatorColor.value;
        const indicatorActiveColor = controls.indicatorActiveColor.value;
        const indicatorSize = controls.indicatorSize.value;
        const indicatorSpacing = controls.indicatorSpacing.value;
        const btnBgColor = controls.btnBgColor.value;
        const btnIconColor = controls.btnIconColor.value;
        const btnRadius = controls.btnBorderRadius.value;
        const btnPadding = controls.btnPadding.value;

        // ... (Aplica Variáveis CSS no :root e atualiza spans - mesma lógica) ...
        rootElement.style.setProperty('--slide-width', `${width}px`);
        rootElement.style.setProperty('--slide-height', `${height}px`);
        rootElement.style.setProperty('--transition-duration', `${duration}s`);
        rootElement.style.setProperty('--timing-function', timing);
        rootElement.style.setProperty('--indicator-inactive-color', indicatorColor);
        rootElement.style.setProperty('--indicator-active-color', indicatorActiveColor);
        rootElement.style.setProperty('--indicator-size', `${indicatorSize}px`);
        rootElement.style.setProperty('--indicator-spacing', `${indicatorSpacing}px`);
        rootElement.style.setProperty('--btn-bg-color', btnBgColor);
        rootElement.style.setProperty('--btn-icon-color', btnIconColor);
        rootElement.style.setProperty('--btn-radius', `${btnRadius}px`);
        rootElement.style.setProperty('--btn-padding', `${btnPadding}px`);
        slideItems.forEach(item => {
            item.style.width = `${width}px`;
            item.style.height = `${height}px`;
        });
        
        // Mover para o slide atual (currentIndex inicial é 1)
        const offset = -currentIndex * width;
        sliderTrack.style.transform = `translateX(${offset}px)`;
        updateIndicators(currentIndex - 1);

        document.getElementById('slideWidth-value').textContent = `${width}px`;
        document.getElementById('slideHeight-value').textContent = `${height}px`;
        document.getElementById('transitionDuration-value').textContent = `${duration}s`;
        document.getElementById('autoplayInterval-value').textContent = `${interval}s (${interval === 0 ? 'Desativado' : 'Ativo'})`;
        document.getElementById('btnBgColor-value').textContent = btnBgColor;
        document.getElementById('btnIconColor-value').textContent = btnIconColor;
        document.getElementById('btnBorderRadius-value').textContent = `${btnRadius}px (0 = Quadrado, 50 = Círculo)`;
        document.getElementById('btnPadding-value').textContent = `${btnPadding}px`;

        // Lógica Autoplay
        if (autoplayTimer) clearInterval(autoplayTimer);
        if (interval > 0) {
            autoplayTimer = setInterval(() => {
                moveToSlide(currentIndex + 1);
            }, interval * 1000);
        }

        // Geração de Código
        generateCode(width, height, duration, timing, interval, 
            indicatorColor, indicatorActiveColor, indicatorSize, indicatorSpacing,
            btnBgColor, btnIconColor, btnRadius, btnPadding
        );
    }
    
    // --- 4. Geração do Código Final (HTML, CSS e JS) ---
    function generateCode(
        width, height, duration, timing, interval, 
        indColor, indActiveColor, indSize, indSpacing,
        btnBgColor, btnIconColor, btnRadius, btnPadding
    ) {
        
        const rootVarsCSS = `
:root {
    /* Variáveis Layout e Movimento */
    --slide-width: ${width}px;
    --slide-height: ${height}px;
    --transition-duration: ${duration}s;
    --timing-function: ${timing};

    /* Variáveis Indicadores */
    --indicator-inactive-color: ${indColor};
    --indicator-active-color: ${indActiveColor};
    --indicator-size: ${indSize}px;
    --indicator-spacing: ${indSpacing}px;

    /* Variáveis Botões */
    --btn-bg-color: ${btnBgColor};
    --btn-icon-color: ${btnIconColor};
    --btn-radius: ${btnRadius}px;
    --btn-padding: ${btnPadding}px;
}
        `.trim();

        const carouselHTML = `
<div class="carousel-container">
    <div class="slider-window">
        <div class="slider-track">
            <div class="slide-item clone"><img src="03.jpeg" alt="Slide ${originalTotalSlides} (Clone)"></div>
            
            <div class="slide-item" data-slide="0"><img src="01.jpg" alt="Slide 1"></div>
            <div class="slide-item" data-slide="1"><img src="02.jpeg" alt="Slide 2"></div>
            <div class="slide-item" data-slide="2"><img src="03.jpeg" alt="Slide 3"></div>
            
            <div class="slide-item clone"><img src="01.jpg" alt="Slide 1 (Clone)"></div>
        </div>
    </div>
    
    <button class="nav-btn prev-btn">←</button>
    <button class="nav-btn next-btn">→</button>
    
    <div class="slider-indicators">
        <span data-slide="0" class="indicator active"></span>
        <span data-slide="1" class="indicator"></span>
        <span data-slide="2" class="indicator"></span>
    </div>
</div>
        `.trim();

        const carouselCSS = `
/* Estrutura e Estilos de Design Tokens */
.carousel-container {
    width: var(--slide-width);
    height: var(--slide-height);
    margin: 0 auto;
    position: relative; 
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2); 
    border-radius: 8px; 
}

.slider-window {
    width: var(--slide-width);
    height: var(--slide-height);
    overflow: hidden;
}

.slider-track {
    display: flex;
    /* Transição inicial controlada pelo JS */
    transition: transform var(--transition-duration) var(--timing-function);
    width: fit-content;
    /* Inicia no primeiro slide real (índice 1, pulando o clone 0) */
    transform: translateX(-${width}px); 
}

.slide-item {
    flex-shrink: 0;
    width: var(--slide-width);
    height: var(--slide-height);
}

.slide-item img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
}

/* Estilos dos Botões de Navegação */
.nav-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: var(--btn-bg-color); 
    color: var(--btn-icon-color); 
    border: none;
    padding: 10px var(--btn-padding); 
    border-radius: var(--btn-radius); 
    cursor: pointer;
    z-index: 10;
    font-size: 1.5em;
    transition: background 0.3s;
}

.prev-btn { left: 10px; }
.next-btn { right: 10px; }


/* Estilos dos Indicadores (Pontos) */
.slider-indicators {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: var(--indicator-spacing); 
    z-index: 10;
}

.indicator {
    display: block;
    width: var(--indicator-size);
    height: var(--indicator-size);
    background: var(--indicator-inactive-color);
    border-radius: 50%;
    cursor: pointer;
    transition: background 0.3s, transform 0.2s;
}

.indicator.active {
    background: var(--indicator-active-color);
    transform: scale(1.2);
}
        `.trim();

        const carouselJS = `
const sliderTrack = document.querySelector('.slider-track');
const indicators = document.querySelectorAll('.indicator');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

// Configurações (Ajuste se o HTML mudar)
const originalTotalSlides = 3; 
const totalSlidesInDOM = 5; // Inclui 2 clones
const slideWidth = ${width}; 
const duration = ${duration}; // Duração da transição
const timing = '${timing}';
const interval = ${interval}; 

// Indexação: 0 (Clone), 1 (Slide 1), 2 (Slide 2), 3 (Slide 3), 4 (Clone)
let currentIndex = 1; 
let autoplayTimer = null;

function updateIndicators(realIndex) {
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === realIndex);
    });
}

function moveToSlide(newIndex) {
    currentIndex = newIndex;
    
    // 1. Ativa a transição para o movimento visível
    sliderTrack.style.transition = \`transform \${duration}s \${timing}\`;
    
    // 2. Move para o novo slide (real ou clone)
    const offset = -currentIndex * slideWidth;
    sliderTrack.style.transform = \`translateX(\${offset}px)\`;
    
    // 3. Atualiza os indicadores com base no índice real
    let realIndex = currentIndex - 1; 
    if (currentIndex === totalSlidesInDOM - 1) realIndex = 0; // Se moveu para o último clone
    if (currentIndex === 0) realIndex = originalTotalSlides - 1; // Se moveu para o primeiro clone
    updateIndicators(realIndex);


    // 4. Lógica de "Snap Back" (Salto Sem Transição)
    if (currentIndex === totalSlidesInDOM - 1 || currentIndex === 0) {
        
        setTimeout(() => {
            // A) Desativa a transição
            sliderTrack.style.transition = 'none';

            // B) Define o novo índice (pulo para o slide real)
            if (currentIndex === totalSlidesInDOM - 1) { // Estava no clone do primeiro (4)
                currentIndex = 1; // Pula para o primeiro real (1)
            } else if (currentIndex === 0) { // Estava no clone do último (0)
                currentIndex = originalTotalSlides; // Pula para o último real (3)
            }
            
            // C) Realiza o pulo
            const snapOffset = -currentIndex * slideWidth;
            sliderTrack.style.transform = \`translateX(\${snapOffset}px)\`;
            
            // D) Reativa a transição para o próximo movimento
            setTimeout(() => {
                 sliderTrack.style.transition = \`transform \${duration}s \${timing}\`;
            }, 50); 
            
        }, duration * 1000); 
    }
}

// Autoplay
if (interval > 0) {
    autoplayTimer = setInterval(() => {
        // Incrementa o índice sem se preocupar com o limite, a função moveToSlide lida com o loop
        moveToSlide(currentIndex + 1); 
    }, interval * 1000); 
}

// Event Listeners
prevBtn.addEventListener('click', () => { moveToSlide(currentIndex - 1); });
nextBtn.addEventListener('click', () => { moveToSlide(currentIndex + 1); });

indicators.forEach(indicator => {
    indicator.addEventListener('click', (e) => {
        const realSlideIndex = parseInt(e.target.dataset.slide);
        // O índice real no DOM é o realSlideIndex + 1 (por causa do slide clone no início)
        moveToSlide(realSlideIndex + 1); 
    });
});

// Inicializa o carrossel na posição correta (slide 1 real)
updateIndicators(0); // Garante que o indicador 0 esteja ativo
        `.trim();

        // --- APLICAÇÃO DA FORMATAÇÃO E MONTAGEM DO RESULTADO ---
        const finalHTML = formatCode(carouselHTML);
        const finalCSS = formatCode(rootVarsCSS + '\n' + carouselCSS);
        const finalJS = formatCode(carouselJS);

        codeElement.textContent = `
// ==========================================================
// --- CÓDIGO HTML (Estrutura) ---
// ==========================================================
${finalHTML}

// ==========================================================
// --- CÓDIGO CSS (Definição de Design Tokens e Estilos) ---
// ==========================================================
${finalCSS}

// ==========================================================
// --- CÓDIGO JAVASCRIPT (Lógica de Movimento e Autoplay) ---
// ==========================================================
${finalJS}
        `;
    }

    // --- 5. Event Listeners e Inicialização ---
    Object.values(controls).forEach(input => {
        input.addEventListener('input', updateCarousel);
        input.addEventListener('change', updateCarousel);
    });

    prevBtn.addEventListener('click', () => moveToSlide(currentIndex - 1));
    nextBtn.addEventListener('click', () => moveToSlide(currentIndex + 1));

    indicators.forEach(indicator => {
        indicator.addEventListener('click', (e) => {
            const index = parseInt(e.target.dataset.slide);
            // Move para o índice real do DOM (índice 0 do indicador é o slide 1 do DOM)
            moveToSlide(index + 1);
        });
    });

    // Inicializa o carrossel na primeira carga
    updateCarousel();
});