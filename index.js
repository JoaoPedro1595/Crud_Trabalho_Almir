var dados = []

function popula_tabela(){
    if(Array.isArray(dados)){

        $("#tbl_dados tbody").html("")

        dados.forEach(function(item){
            $("#tbl_dados tbody").append(`<tr>
                <td>${item.ID}</td>
                <td>${item.Nome}</td>
                <td>${item.Sobrenome}</td>
                <td>${item.Nasc}</td>
                <td>${item.CNPJ}</td>
            </tr>`)
        })
    }
}

$(function() {
    dados = JSON.parse(localStorage.getItem("__dados__"))

    if (dados){
        popula_tabela()
    }
})