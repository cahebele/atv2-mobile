const situacao = document.getElementById("situacoe_id");
if (situacao) {
    listarSituacao();
}

async function listarSituacao() {
    const dados = await fetch('listar_situacao.php');
    const resposta = await dados.json();
    //console.log(resposta);

    if (resposta['status']) {
        document.getElementById("msgAlertaSituacao").innerHTML = "";

        var opcoes = '<option value="">Selecione</option>';
        for (var i = 0; i < resposta.dados.length; i++) {
            //console.log(resposta.dados[i]['id']);
            //console.log(resposta.dados[i]['nome']);
            //situacao.innerHTML = situacao.innerHTML + '<option value="' + resposta.dados[i]['id'] + '">' + resposta.dados[i]['nome'] + '</option>';
            opcoes += '<option value="' + resposta.dados[i]['id'] + '">' + resposta.dados[i]['nome'] + '</option>';
        }
        situacao.innerHTML = opcoes;
    } else {
        document.getElementById("msgAlertaSituacao").innerHTML = resposta['msg'];
    }
}

// Cadastrar novo usuario no BD
const formCadUsuario = document.getElementById("form-cad-usuario");
if (formCadUsuario) {
    formCadUsuario.addEventListener("submit", async(event) => {
        event.preventDefault();
        // Receber os dados do formulario
        const dadosForm = new FormData(formCadUsuario);

        // Enviar os dados para o arquivo "cadastrar.php", deve salvar no BD
        const dados = await fetch("cadastrar.php", {
            method: "POST",
            body: dadosForm
        });
        const resposta = await dados.json();
        //console.log(resposta);

        if (resposta['status']) {
            document.getElementById("msgAlerta").innerHTML = resposta['msg'];
            formCadUsuario.reset();
        } else {
            document.getElementById("msgAlerta").innerHTML = resposta['msg'];
        }
    });
}

// Recebe os dados do formulário
const nome = document.querySelector('#nome').value;
const idade = document.querySelector('#idade').value;
const profissao = document.querySelector('#profissao').value;
const resumo = document.querySelector('#resumo').value;
const foto = document.querySelector('#foto').files[0];

let alertaCadastro = '';

if (nome && idade && profissao && resumo && foto) {

  const formData = new FormData();
  formData.append('nome', nome);
  formData.append('idade', idade);
  formData.append('profissao', profissao);
  formData.append('resumo', resumo);
  formData.append('foto', foto);


  fetch('html/cadastrar.html', {
    method: 'POST',
    body: formData
  })
  .then(response => response.text())
  .then(data => {
    if (data === 'sucesso') {
      alertaCadastro = "Cadastro realizado com sucesso!";
      location.href = 'js/index.js';
    } else {
      alertaCadastro = "Erro ao realizar o cadastro: " + data;
    }
  })
  .catch(error => {
    alertaCadastro = "Erro ao realizar o cadastro: " + error.message;
  });
}

let integrantes = [];
let mensagem = '';


fetch('listar.')
  .then(response => response.json())
  .then(data => {
    if (data.length > 0) {
      integrantes = data;
    } else {
      mensagem = "Nenhum resultado encontrado";
    }
  })
  .catch(error => {
    mensagem = "Erro ao obter os dados: " + error.message;
  });
