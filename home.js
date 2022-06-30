var notas = []
var dados = []

function popula_tabela_notas() {
    if (Array.isArray(notas)) {

        localStorage.setItem("__notas__", JSON.stringify(notas))

        $("#tbl_notas tbody").html("")

        notas.forEach(function (item) {
            $("#tbl_notas tbody").append(`<tr>
                <td>${item.ID}</td>
                <td>${item.Tipo}</td>
                <td>${item.Doc}</td>
                <td>${item.Lanc}</td>
                <td>${item.Val}</td>            
            </tr>`)
        })
    }
}

function popula_tabela_clientes() {
    if (Array.isArray(dados)) {

        localStorage.setItem("__dados__", JSON.stringify(dados))
        

        $("#tbl_dados tbody").html("")

        dados.forEach(function (item) {
            $("#tbl_dados tbody").append(`<tr>
                <td>${item.ID}</td>
                <td>${item.Nome}</td>
                <td>${item.Sobrenome}</td>
                <td>${item.Nasc}</td>
                <td>${item.CNPJ}</td>
                <td><button type="button" class="btn btn-primary" onclick="javascript:edita_registro(${item.ID});"><i class="fa fa-edit"></button></td>
                <td><button type="button" class="btn btn-danger" onclick="javascript:apaga_registro(${item.ID});"><i class="fa fa-trash"></button></td>
            </tr>`)
        })
    }
}

$(function () {
    notas = JSON.parse(localStorage.getItem("__notas__"))

    if (notas != null) {

        popula_tabela_notas();
    
      } else {notas = []
    }
})

$(function () {
    dados = JSON.parse(localStorage.getItem("__dados__"))

    if (dados != null) {

        popula_tabela_clientes();
    
      } else {dados = []}
    })
