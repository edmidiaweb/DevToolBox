DevToolBox

É um hub unificado de ferramentas interativas para desenvolvedores Front-End. O objetivo desta plataforma é centralizar utilitários de código que facilitam a criação de interfaces, permitindo o ajuste visual e a exportação rápida de código CSS e HTML.

Ferramentas Incluídas

A plataforma organiza três projetos principais em um ecossistema coeso:

1.Gerador de Landing Pages: Uma ferramenta para montar estruturas de LPs rapidamente, com suporte a troca de cores, fontes e pré-visualização em múltiplos dispositivos (Desktop, Tablet, Mobile).
2.  Carrossel JS Interativo: Um configurador de sliders que permite ajustar durações de transição, estilos de navegação (setas e indicadores) e gera o código JS Vanilla pronto para implementação.
3.  VIP CSS Lab: Um laboratório visual avançado para manipular propriedades complexas como sombras múltiplas (box-shadow), filtros, transformações 2D e variáveis CSS personalizadas.

Destaques Técnicos

Este projeto demonstra competências avançadas em desenvolvimento Front-End:

Arquitetura Modular: Uso de Iframes para o isolamento de escopo, garantindo que o CSS e o JavaScript de uma ferramenta não entrem em conflito com as outras.
JavaScript Vanilla: Lógica de manipulação do DOM e navegação entre projetos sem dependências de frameworks externos.
Design UI/UX: Dashboard moderno com foco em usabilidade, barra lateral de navegação e interface responsiva.
Reutilização de Componentes: Estrutura pensada para permitir a adição de novas ferramentas de forma escalável.

Estrutura do Repositório



├── index.html          # Dashboard principal (Shell)
├── style.css           # Estilização do Hub
├── script.js           # Lógica de navegação do Hub
├── /gerador LD         # Projeto: Gerador de Landing Pages
├── /carrossel          # Projeto: Slider Interativo
└── /VIP CSS            # Projeto: Visualizador de Propriedades CSS
