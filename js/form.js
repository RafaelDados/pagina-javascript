function seletor(nomee){
    var seletor = document.querySelector(nomee);

    return seletor;
}

var botaoAdicionar = document.querySelector("#adicionar-paciente");

botaoAdicionar.addEventListener("click", function (event) {
    //Retira o padrão do formulario que seria recarregar a página, dessa forma não ocorre essa atualização da pág
    event.preventDefault();

    var form = document.querySelector("#form-adiciona");

    var paciente = obtemPacienteDoFormulario(form);

    

    var erros = validaPaciente(paciente);
    console.log(erros);
    
    if(erros.length > 0){
        exibiMensagensDeErro(erros);
        return;
    }

    //Adiconando paciente a tabela
    adicionaPacienteNaTabela(paciente);
    
    form.reset();
    var ul = seletor("#mensagens-erro");
    ul.innerHTML = "";
});

function adicionaPacienteNaTabela(paciente){
    var pacienteTr = montaTr(paciente);
    tabelaPacientes = document.querySelector("#tabela-pacientes");
    tabelaPacientes.appendChild(pacienteTr);
}

function exibiMensagensDeErro(erros){
    var ul = seletor("#mensagens-erro");

    ul.innerHTML = "";

    erros.forEach(function(erro) {
        var li = document.createElement("li");
        li.textContent = erro;
        ul.appendChild(li);
    });
}

function obtemPacienteDoFormulario(form) {
    //Extraindo informações do paciente do form e criando objeto paciente
    var paciente = {
        nome: form.nome.value,
        peso: form.peso.value,
        altura: form.altura.value,
        gordura: form.gordura.value,
        imc: calculaImc(form.peso.value, form.altura.value)
    }
    return paciente;
}

function montaTr(paciente) {
    //Criando <tr> com javascript
    var pacienteTr = document.createElement("tr");
    pacienteTr.classList.add("paciente");

    //Função appendChild adiciona um filho a uma tr por exemplo
    pacienteTr.appendChild(montaTd(paciente.nome, "info-nome"));
    pacienteTr.appendChild(montaTd(paciente.peso, "info-peso"));
    pacienteTr.appendChild(montaTd(paciente.altura, "info-altura"));
    pacienteTr.appendChild(montaTd(paciente.gordura, "info-gordura"));
    pacienteTr.appendChild(montaTd(paciente.imc, "info-imc"));

    return pacienteTr;
}

//Função que cria uma td
function montaTd(dado, classe) {
    var td = document.createElement("td");
    td.textContent = dado;
    td.classList.add(classe);

    return td;
}

function validaPaciente(paciente) {

    var erros = [];

    if(paciente.nome.length == 0){
        erros.push("O nome deve ser preenchido!");
    }
    if (!validaPeso(paciente.peso)) {
        erros.push("O peso é inválido");
    }

    if (!validaAltura(paciente.altura)) {
        erros.push("A altura é inválida");
    }

    if(paciente.gordura.length == 0){
        erros.push("A gordura deve ser preenchida!");
    }

    if(paciente.peso.length == 0){
        erros.push("O peso deve ser preenchido!");
    }

    if(paciente.altura.length == 0){
        erros.push("A altura deve ser preenchida!");
    }

    return erros;
}