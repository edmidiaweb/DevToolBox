// Gerador de Landing Pages - JavaScript
class LandingPageGenerator {
    constructor() {
        this.initializeElements();
        this.bindEvents();
        this.updatePreview();
    }

    initializeElements() {
        // Elementos do formulário
        this.title = document.getElementById('title');
        this.subtitle = document.getElementById('subtitle');
        this.description = document.getElementById('description');
        this.ctaText = document.getElementById('cta-text');
        this.primaryColor = document.getElementById('primary-color');
        this.secondaryColor = document.getElementById('secondary-color');
        this.backgroundType = document.getElementById('background-type');
        this.fontFamily = document.getElementById('font-family');
        this.email = document.getElementById('email');
        this.phone = document.getElementById('phone');
        this.whatsapp = document.getElementById('whatsapp');

        // NOVO: Elementos da Logo
        this.logoUrl = document.getElementById('logo-url');
        this.logoPosition = document.getElementById('logo-position');

        // Containers
        this.benefitsContainer = document.getElementById('benefits-container');
        this.testimonialsContainer = document.getElementById('testimonials-container');

        // Botões
        this.previewBtn = document.getElementById('preview-btn');
        this.exportBtn = document.getElementById('export-btn');
        this.addBenefitBtn = document.getElementById('add-benefit');
        this.addTestimonialBtn = document.getElementById('add-testimonial');

        // Preview
        this.previewFrame = document.getElementById('preview-frame');
        this.previewIframe = document.getElementById('preview-iframe');
        this.deviceBtns = document.querySelectorAll('.device-btn');

        this.setDefaultValues();
    }

    setDefaultValues() {
        this.title.value = 'Transforme Sua Vida Hoje';
        this.subtitle.value = 'A solução que você estava procurando';
        this.description.value = 'Descubra como nosso produto pode revolucionar sua rotina e trazer os resultados que você sempre desejou.';
        this.ctaText.value = 'Quero Começar Agora';
        this.email.value = 'contato@exemplo.com';
        this.phone.value = '(11) 99999-9999';
        this.whatsapp.value = '(11) 99999-9999';
        
        // Logo Padrão para teste
        this.logoUrl.value = 'https://via.placeholder.com/150x50.png?text=SUA+LOGO';
        this.logoPosition.value = 'center';

        // Preencher primeiro benefício
        const firstBenefitText = document.querySelector('.benefit-item .benefit-text');
        if (firstBenefitText) {
            firstBenefitText.value = 'Resultados comprovados em 30 dias';
        }

        // Preencher primeiro testemunho
        const firstTestimonialName = document.querySelector('.testimonial-item .testimonial-name');
        const firstTestimonialText = document.querySelector('.testimonial-item .testimonial-text');
        if (firstTestimonialName && firstTestimonialText) {
            firstTestimonialName.value = 'Maria Silva';
            firstTestimonialText.value = 'Excelente produto! Superou todas as minhas expectativas e trouxe os resultados que eu esperava.';
        }
    }

    bindEvents() {
        const inputs = document.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', () => this.updatePreview());
            input.addEventListener('change', () => this.updatePreview());
            input.setAttribute('data-bound', 'true');
        });

        this.previewBtn.addEventListener('click', () => this.openPreviewInNewTab());
        this.exportBtn.addEventListener('click', () => this.exportHTML());
        this.addBenefitBtn.addEventListener('click', () => this.addBenefit());
        this.addTestimonialBtn.addEventListener('click', () => this.addTestimonial());

        this.deviceBtns.forEach(btn => {
            btn.addEventListener('click', (event) => {
                event.preventDefault();
                this.changeDevice(btn.dataset.device);
            });
        });

        this.benefitsContainer.addEventListener('click', (e) => {
            if (e.target.closest('.remove-benefit')) {
                this.removeBenefit(e.target.closest('.benefit-item'));
            }
        });

        this.testimonialsContainer.addEventListener('click', (e) => {
            if (e.target.closest('.remove-testimonial')) {
                this.removeTestimonial(e.target.closest('.testimonial-item'));
            }
        });
    }

    bindNewInputs() {
        const newInputs = document.querySelectorAll('input:not([data-bound]), select:not([data-bound]), textarea:not([data-bound])');
        newInputs.forEach(input => {
            input.addEventListener('input', () => this.updatePreview());
            input.addEventListener('change', () => this.updatePreview());
            input.setAttribute('data-bound', 'true');
        });
        this.updatePreview();
    }

    addBenefit() {
        const benefitHTML = `
            <div class="benefit-item">
                <div class="form-grid">
                    <div class="form-group">
                        <label>Ícone</label>
                        <select class="benefit-icon">
                            <option value="fas fa-check">Check</option>
                            <option value="fas fa-star">Estrela</option>
                            <option value="fas fa-heart">Coração</option>
                            <option value="fas fa-shield-alt">Escudo</option>
                            <option value="fas fa-rocket">Foguete</option>
                            <option value="fas fa-trophy">Troféu</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Texto do Benefício</label>
                        <input type="text" class="benefit-text" placeholder="Ex: Resultados em 30 dias">
                    </div>
                    <button type="button" class="btn btn-danger remove-benefit">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
        
        this.benefitsContainer.insertAdjacentHTML('beforeend', benefitHTML);
        this.bindNewInputs();
    }

    addTestimonial() {
        const testimonialHTML = `
            <div class="testimonial-item">
                <div class="form-grid">
                    <div class="form-group">
                        <label>Nome</label>
                        <input type="text" class="testimonial-name" placeholder="Nome do cliente">
                    </div>
                    <div class="form-group">
                        <label>Depoimento</label>
                        <textarea class="testimonial-text" rows="2" placeholder="Depoimento do cliente..."></textarea>
                    </div>
                    <button type="button" class="btn btn-danger remove-testimonial">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
        
        this.testimonialsContainer.insertAdjacentHTML('beforeend', testimonialHTML);
        this.bindNewInputs();
    }

    removeBenefit(benefitItem) {
        benefitItem.remove();
        this.updatePreview();
    }

    removeTestimonial(testimonialItem) {
        testimonialItem.remove();
        this.updatePreview();
    }

    changeDevice(device) {
        this.deviceBtns.forEach(btn => btn.classList.remove('active'));
        const clickedBtn = document.querySelector(`.device-btn[data-device="${device}"]`);
        if (clickedBtn) {
            clickedBtn.classList.add('active');
        }
        this.previewFrame.className = `preview-frame ${device}`;
    }

    getBenefits() {
        const benefits = [];
        const benefitItems = document.querySelectorAll('.benefit-item');
        
        benefitItems.forEach(item => {
            const iconElement = item.querySelector('.benefit-icon');
            const textElement = item.querySelector('.benefit-text');
            
            if (iconElement && textElement) {
                const icon = iconElement.value;
                const text = textElement.value;
                if (text.trim()) {
                    benefits.push({ icon, text });
                }
            }
        });
        
        return benefits;
    }

    getTestimonials() {
        const testimonials = [];
        const testimonialItems = document.querySelectorAll('.testimonial-item');
        
        testimonialItems.forEach(item => {
            const nameElement = item.querySelector('.testimonial-name');
            const textElement = item.querySelector('.testimonial-text');

            if (nameElement && textElement) {
                const name = nameElement.value;
                const text = textElement.value;
                if (name.trim() && text.trim()) {
                    testimonials.push({ name, text });
                }
            }
        });
        
        return testimonials;
    }

    getBackgroundStyle() {
        const type = this.backgroundType.value;
        const primary = this.primaryColor.value;
        const secondary = this.secondaryColor.value;
        
        switch (type) {
            case 'solid':
                return `background: ${primary};`;
            case 'gradient':
                return `background: linear-gradient(135deg, ${primary}, ${secondary});`;
            case 'image':
                return `background: linear-gradient(135deg, ${primary}CC, ${secondary}CC), url('https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80') center/cover no-repeat; background-size: cover;`;
            default:
                return `background: linear-gradient(135deg, ${primary}, ${secondary});`;
        }
    }

    generateLandingPageHTML() {
        const benefits = this.getBenefits();
        const testimonials = this.getTestimonials();
        
        const benefitsHTML = benefits.map(benefit => `
            <div class="benefit-item-lp">
                <i class="${benefit.icon}"></i>
                <p>${benefit.text}</p>
            </div>
        `).join('');

        const testimonialsHTML = testimonials.map(testimonial => `
            <div class="testimonial-lp">
                <div class="testimonial-text-lp">"${testimonial.text}"</div>
                <div class="testimonial-author-lp">- ${testimonial.name}</div>
            </div>
        `).join('');

        const backgroundStyle = this.getBackgroundStyle();
        const primaryColor = this.primaryColor.value;
        const secondaryColor = this.secondaryColor.value;
        const ctaText = this.ctaText.value || 'Ação Principal';
        const phone = this.phone.value;
        const whatsapp = this.whatsapp.value;
        const email = this.email.value;
        const fontFamilyUrl = this.fontFamily.value.replace(/['",\s]/g, '');

        // LÓGICA DA LOGO CORRIGIDA
        const logoUrl = this.logoUrl.value;
        const logoPosition = this.logoPosition.value;
        
        let logoHTML = '';
        let logoHeaderCSS = 'justify-content: center;';
        let contentPaddingTop = '0';

        if (logoUrl && logoPosition !== 'none') {
            logoHTML = `<img src="${logoUrl}" alt="Logo da Empresa" class="lp-logo">`;
            contentPaddingTop = '60px'; // Adiciona espaço se houver logo
            
            if (logoPosition === 'left') {
                logoHeaderCSS = 'justify-content: flex-start; padding-left: 30px;';
            } else if (logoPosition === 'right') {
                logoHeaderCSS = 'justify-content: flex-end; padding-right: 30px;';
            } else { // center
                logoHeaderCSS = 'justify-content: center;';
            }
        }

        return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${this.title.value || 'Minha Nova Landing Page'}</title>
    <link href="https://fonts.googleapis.com/css2?family=${fontFamilyUrl}:wght@400;700&display=swap" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: ${this.fontFamily.value}, sans-serif;
            color: #333;
            line-height: 1.6;
        }
        .hero {
            ${backgroundStyle}
            color: white;
            padding: 80px 20px;
            text-align: center;
            min-height: 80vh; 
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            box-shadow: inset 0 0 100px rgba(0,0,0,0.2);
            position: relative; 
        }
        
        /* ESTILOS DA LOGO */
        .header-lp {
            display: flex;
            align-items: center;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            padding: 20px 0;
            box-sizing: border-box;
            ${logoHeaderCSS} 
        }
        .lp-logo {
            max-height: 50px; 
            width: auto;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        .hero-content {
            padding-top: ${contentPaddingTop}; 
        }
        /* FIM ESTILOS DA LOGO */

        .hero h1 {
            font-size: 3rem;
            margin-bottom: 10px;
        }
        .hero h2 {
            font-size: 1.5rem;
            margin-bottom: 20px;
            font-weight: 400;
        }
        .hero p {
            max-width: 600px;
            margin-bottom: 30px;
            font-size: 1.1rem;
        }
        .cta-button {
            display: inline-block;
            background-color: ${primaryColor};
            color: white;
            padding: 15px 30px;
            text-decoration: none;
            border-radius: 50px;
            font-size: 1.2rem;
            font-weight: 700;
            border: none;
            cursor: pointer;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .cta-button:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        }

        .benefits-section {
            padding: 60px 20px;
            background: #f4f4f4;
            text-align: center;
        }
        .benefits-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 30px;
            margin-top: 40px;
            max-width: 1000px;
            margin-left: auto;
            margin-right: auto;
        }
        .benefit-item-lp {
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s;
        }
        .benefit-item-lp:hover {
            transform: translateY(-5px);
        }
        .benefit-item-lp i {
            font-size: 2.5rem;
            color: ${primaryColor};
            margin-bottom: 15px;
        }
        .benefit-item-lp p {
            font-weight: 600;
            color: #555;
        }

        .testimonials-section {
            padding: 60px 20px;
            background: white;
            text-align: center;
        }
        .testimonials-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 30px;
            margin-top: 40px;
            max-width: 1000px;
            margin-left: auto;
            margin-right: auto;
        }
        .testimonial-lp {
            border: 1px solid #ddd;
            padding: 30px;
            border-radius: 10px;
            text-align: left;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
        }
        .testimonial-text-lp {
            font-style: italic;
            margin-bottom: 15px;
            color: #555;
        }
        .testimonial-author-lp {
            font-weight: 700;
            text-align: right;
            color: #333;
        }

        .contact-footer {
            background-color: ${secondaryColor};
            color: white;
            padding: 40px 20px;
            text-align: center;
        }
        .contact-footer a {
            color: #ffcc00;
            text-decoration: none;
            margin: 0 10px;
            transition: color 0.3s;
        }
        .contact-footer a:hover {
            color: white;
        }
        .contact-links {
            margin-top: 15px;
        }
        .contact-links p {
            margin-bottom: 5px;
        }
        @media (max-width: 600px) {
            .hero h1 {
                font-size: 2rem;
            }
            .hero h2 {
                font-size: 1.2rem;
            }
            .lp-logo {
                max-width: 120px;
            }
        }
    </style>
</head>
<body>
    <section class="hero">
        
        <div class="header-lp">
            ${logoHTML}
        </div>

        <div class="hero-content">
            <h1>${this.title.value || 'Transforme Sua Vida Hoje'}</h1>
            <h2>${this.subtitle.value || 'A solução que você estava procurando'}</h2>
            <p>${this.description.value || 'Descubra como nosso produto pode revolucionar sua rotina e trazer os resultados que você sempre desejou.'}</p>
            <a href="#form-or-contact" class="cta-button">${ctaText}</a>
        </div>
    </section>

    ${benefits.length > 0 ? `
        <section class="benefits-section">
            <h2>Nossos Benefícios Exclusivos</h2>
            <div class="benefits-grid">
                ${benefitsHTML}
            </div>
        </section>
    ` : ''}

    ${testimonials.length > 0 ? `
        <section class="testimonials-section">
            <h2>O Que Nossos Clientes Dizem</h2>
            <div class="testimonials-grid">
                ${testimonialsHTML}
            </div>
        </section>
    ` : ''}

    <footer class="contact-footer" id="form-or-contact">
        <h3>Entre em Contato Agora!</h3>
        <p>Pronto para começar? Clique no botão ou entre em contato:</p>
        <a href="#" class="cta-button" style="margin-bottom: 20px; display: inline-block;">${ctaText}</a>
        <div class="contact-links">
            ${email ? `<p><i class="fas fa-envelope"></i> Email: <a href="mailto:${email}">${email}</a></p>` : ''}
            ${phone ? `<p><i class="fas fa-phone"></i> Telefone: <a href="tel:${phone}">${phone}</a></p>` : ''}
            ${whatsapp ? `<p><i class="fab fa-whatsapp"></i> WhatsApp: <a href="https://wa.me/55${whatsapp.replace(/[^0-9]/g, '')}" target="_blank">${whatsapp}</a></p>` : ''}
        </div>
        <p style="margin-top: 20px; font-size: 0.8rem; color: #ccc;">&copy; ${new Date().getFullYear()} Gerador de Landing Pages.</p>
    </footer>
</body>
</html>`;
    }

    updatePreview() {
        const html = this.generateLandingPageHTML();
        const blob = new Blob([html], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        this.previewIframe.src = url;
    }

    openPreviewInNewTab() {
        const html = this.generateLandingPageHTML();
        const newWindow = window.open();
        newWindow.document.write(html);
        newWindow.document.close();
    }

    exportHTML() {
        const html = this.generateLandingPageHTML();
        const blob = new Blob([html], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = 'landing-page.html';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        // Feedback visual
        this.exportBtn.innerHTML = '<i class="fas fa-check"></i> Exportado!';
        this.exportBtn.style.background = 'linear-gradient(135deg, #27ae60, #2ecc71)';
        
        setTimeout(() => {
            this.exportBtn.innerHTML = '<i class="fas fa-download"></i> Exportar HTML';
            this.exportBtn.style.background = '';
        }, 2000);
    }
}

// Inicializar o gerador quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    new LandingPageGenerator();
});