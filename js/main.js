let listaDeItens = [];
let isEdicao = -1;

function limpaCampos() {

    document.getElementById('item').value = '';
    document.getElementById('autor').value = '';   
    document.getElementById('quantidade').value = '';
    document.getElementById('ano').value = '';
    document.getElementById('imagemUrl').value = '';
}


function salvar() {
    let item = document.getElementById('item').value;
    let autor = document.getElementById('autor').value;
    let quantidade = document.getElementById('quantidade').value;
    let ano = document.getElementById('ano').value;
    let imagemUrl = document.getElementById('imagemUrl').value; // Obter a URL da imagem

    if (valido(item) && valido(autor) && valido(quantidade) && valido(ano) && valido(imagemUrl)) {
        if (isEdicao >= 0) {
            let obj = listaDeItens[isEdicao];
            obj.item = item;
            obj.autor = autor;
            obj.quantidade = quantidade;
            obj.ano = ano;
            obj.imagemUrl = imagemUrl; // Adicionar a URL da imagem ao objeto
        } else {
            listaDeItens.push({
                'item': item,
                'autor': autor,
                'quantidade': quantidade,
                'ano': ano,
                'imagemUrl': imagemUrl // Adicionar a URL da imagem ao objeto
            });
        }
    } else {
        alert("Campos preenchidos incorretamente");
        return;
    }
    limpaCampos();
    atualizarTabela();
    isEdicao = -1;
}


function valido(valorCampo){
    let resultado = valorCampo.trim();
    if (valorCampo<0)
        return False;
    return resultado.length && valorCampo;
}

function editarItem(indice){
    isEdicao = indice;
    console.log('editarItem',indice);
    let obj = listaDeItens[indice];
    document.getElementById('item').value = obj.item;
    document.getElementById('autor').value = obj.autor;
    document.getElementById('quantidade').value = obj.quantidade;
    document.getElementById('ano').value = obj.ano;
    document.getElementById('imagemUrl').value = obj.imagemUrl;
    
}

function excluirItem(indice){
    if(confirm ('deseja remover o item ')){
        listaDeItens.splice(indice,1);
        atualizarTabela();
    }
}

function atualizarTabela() {
    let tableBody = document.getElementById('table-body');
    tableBody.innerHTML = '';
    listaDeItens.forEach((i, indice) => {
        let tr = document.createElement('tr');
        tr.innerHTML = `
            <td>
                <img src="${i.imagemUrl}" style="width: 80px; height: 80px;">
            </td>
            <td>${i.item}</td> <!-- Correção aqui -->
            <td>${i.autor}</td>
            <td>${i.quantidade}</td>
            <td>${i.ano}</td>
            <td>
                <button 
                    type="button"
                    onclick="editarItem(${indice})"
                    class="material-symbols-outlined btn-icone">edit
                </button>
                <button 
                    type="button"
                    onclick="excluirItem(${indice})"
                    class="material-symbols-outlined btn-icone">remove
                </button>
            </td>`;
        tableBody.append(tr);
    });
}
