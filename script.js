document.addEventListener('DOMContentLoaded', function() {
    // Atualiza o ano atual no rodapé
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Adicionar funcionalidade de menu mobile aqui depois

    // Outros scripts gerais do site podem ser adicionados aqui
});

