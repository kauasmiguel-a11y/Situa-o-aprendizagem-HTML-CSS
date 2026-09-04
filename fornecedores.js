document.addEventListener("DOMContentLoaded", function () {

    console.log("JavaScript carregado com sucesso!");

    // ELEMENTOS DO HTML
    const form = document.getElementById("formFornecedor");
    const lista = document.getElementById("listaFornecedores");
    const contador = document.getElementById("contador");

    // VERIFICAR SE OS ELEMENTOS EXISTEM
    if (!form) {
        console.error("ERRO: formulário #formFornecedor não foi encontrado.");
        return;
    }

    if (!lista) {
        console.error("ERRO: elemento #listaFornecedores não foi encontrado.");
        return;
    }

    if (!contador) {
        console.error("ERRO: elemento #contador não foi encontrado.");
        return;
    }

    // CARREGAR FORNECEDORES DO LOCALSTORAGE
    let fornecedores = JSON.parse(
        localStorage.getItem("fornecedores")
    ) || [];

    console.log("Fornecedores carregados:", fornecedores);

    // GERAR ESTRELAS DA AVALIAÇÃO
    function gerarEstrelas(avaliacao) {

        if (!avaliacao || avaliacao === "-") {
            return "-";
        }

        return "★".repeat(Number(avaliacao));
    }

    // ATUALIZAR LISTA
    function atualizarLista() {

        lista.innerHTML = "";

        if (fornecedores.length === 0) {
            contador.textContent = "0 fornecedores";
            return;
        }

        fornecedores.forEach(function (fornecedor) {

            const item = document.createElement("div");

            item.classList.add("fornecedor-item");

            item.innerHTML = `
                <div class="fornecedor-dado fornecedor-nome">
                    ${fornecedor.nome}
                </div>

                <div class="fornecedor-dado fornecedor-cnpj">
                    ${fornecedor.cnpj}
                </div>

                <div class="fornecedor-dado fornecedor-telefone">
                    ${fornecedor.telefone}
                </div>

                <div class="fornecedor-dado fornecedor-cidade">
                    ${fornecedor.cidade}
                </div>

                <div class="fornecedor-dado fornecedor-avaliacao">
                    ${gerarEstrelas(fornecedor.avaliacao)}
                </div>

                <div class="fornecedor-dado fornecedor-status">
                    <span class="status ${fornecedor.statusClass || "status-ok"}">
                        ${fornecedor.status || "Ativo"}
                    </span>
                </div>
            `;

            lista.appendChild(item);

        });

        if (fornecedores.length === 1) {

            contador.textContent = "1 fornecedor";

        } else {

            contador.textContent =
                fornecedores.length + " fornecedores";

        }

        console.log("Lista atualizada:", fornecedores);
    }

    // CADASTRAR FORNECEDOR
    form.addEventListener("submit", function (event) {

        event.preventDefault();

        console.log("Formulário enviado!");

        const nome =
            document.getElementById("nome").value.trim();

        const cnpj =
            document.getElementById("cnpj").value.trim();

        const telefone =
            document.getElementById("telefone").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const cidade =
            document.getElementById("cidade").value.trim();

        const avaliacao =
            document.getElementById("avaliacao").value;


        console.log("Dados preenchidos:", {
            nome,
            cnpj,
            telefone,
            email,
            cidade,
            avaliacao
        });


        // VALIDAR CAMPOS
        if (
            nome === "" ||
            cnpj === "" ||
            telefone === "" ||
            email === "" ||
            cidade === "" ||
            avaliacao === ""
        ) {

            alert("Preencha todos os campos!");

            return;
        }


        // CRIAR NOVO FORNECEDOR
        const novoFornecedor = {

            nome: nome,

            cnpj: cnpj,

            telefone: telefone,

            email: email,

            cidade: cidade,

            avaliacao: avaliacao,

            status: "Ativo",

            statusClass: "status-ok"

        };


        console.log("Novo fornecedor:", novoFornecedor);


        // ADICIONAR NA LISTA
        fornecedores.push(novoFornecedor);


        // SALVAR NO LOCALSTORAGE
        localStorage.setItem(
            "fornecedores",
            JSON.stringify(fornecedores)
        );


        console.log(
            "Salvo no LocalStorage:",
            localStorage.getItem("fornecedores")
        );


        // ATUALIZAR LISTA
        atualizarLista();


        // LIMPAR FORMULÁRIO
        form.reset();


        // AVISO
        alert("Fornecedor cadastrado com sucesso!");

    });


    // CARREGAR LISTA AO ABRIR
    atualizarLista();

});