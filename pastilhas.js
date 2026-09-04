const formulario = document.getElementById("form-pastilha");
const listaPastilhas = document.getElementById("lista-pastilhas");
const contador = document.getElementById("contador-pastilhas");

formulario.addEventListener("submit", function (event) {

    event.preventDefault();

    const codigo = document.getElementById("codigo").value;
    const descricao = document.getElementById("descricao").value;
    const fabricante = document.getElementById("fabricante-novo").value;
    const minimo = document.getElementById("estoque-minimo").value;
    const quantidade = document.getElementById("quantidade-inicial").value;

    let status = "OK";
    let classeStatus = "status-ok";

    if (quantidade >= minimo) {
        status = "OK";
        classeStatus = "status-ok";
    } else if (quantidade > minimo * 0.5) {
        status = "Baixo";
        classeStatus = "status-warning";
    } else {
        status = "Crítico";
        classeStatus = "status-critical";
    }

    const novaPastilha = document.createElement("div");

    novaPastilha.classList.add("pastilha");

    novaPastilha.innerHTML = `
        <div class="pastilha-info">
            <strong>${codigo}</strong>
            <span>${descricao}</span>
            <span>Fabricante: ${fabricante}</span>
        </div>

        <div class="pastilha-estoque">
            <span>Quantidade: ${quantidade}</span>
            <span>Mínimo: ${minimo}</span>
            <span class="status ${classeStatus}">
                ${status}
            </span>
        </div>
    `;

    listaPastilhas.appendChild(novaPastilha);

    const total = listaPastilhas.children.length;

    contador.textContent = `${total} itens cadastrados`;

    formulario.reset();

});