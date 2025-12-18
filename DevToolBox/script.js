document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.nav-item');
    const iframe = document.getElementById('content-frame');
    const titleDisplay = document.getElementById('current-tool-title');

    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();

            // 1. Remover classe ativa de todos e adicionar ao clicado
            navItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');

            // 2. Mudar o título no topo
            const toolName = this.querySelector('span').textContent;
            titleDisplay.textContent = toolName;

            // 3. Carregar o novo projeto no Iframe
            const path = this.getAttribute('data-path');
            iframe.src = path;
        });
    });
});