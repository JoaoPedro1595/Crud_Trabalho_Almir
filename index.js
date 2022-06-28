var dados = []

function add_nota(){

}

function apaga_registro(id) {
    let _confirm = confirm("Deseja realmente excluir o registro?")

    if (_confirm) {
        for (let i = 0; i < dados.length; i++) {
            if (dados[i].ID == id) {
                dados.splice(i, 1)
            }
        }

        popula_tabela()

    }
}

function edita_registro(id) {

    $("#modal_registro").modal("show")

    dados.forEach(function (item) {

        if (item.ID == id) {
            $("#hdid").val(item.ID)
            $("#txt_nome").val(item.Nome)
            $("#txt_sobrenome").val(item.Sobrenome)
            $("#txt_nasc").val(item.Nasc.substr(6, 4) + "-" + item.Nasc.substr(3, 2) + "-" + item.Nasc.substr(0, 2))
            $("#txt_cnpj").val(item.CNPJ)
        }

    })

}

function popula_tabela() {
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
                <td><button type="button" class="btn btn-success" onclick="javascript:add_nota(${item.ID});"><i class="fa fa-plus"></td>
            </tr>`)
        })
    }
}

$(function () {
    dados = JSON.parse(localStorage.getItem("__dados__"))

    if (dados) {
        popula_tabela()
    }

    $("#btn_salvar").click(function () {

        let _id = $("#hdid").val()
        let Nome = $("#txt_nome").val()
        let Sobrenome = $("#txt_sobrenome").val()
        let Nasc = new Date($("#txt_nasc").val()).toLocaleDateString("pt-br", { timeZone: "UTC" })
        let CNPJ = $("#txt_cnpj").val()


        

        if (!_id || _id == "0"){
            let registro = {}

            registro.Nome = Nome
            registro.Sobrenome = Sobrenome
            registro.Nasc = Nasc
            registro.CNPJ = CNPJ

            registro.ID = dados.length + 1
            dados.push(registro)
        }
        else{
            dados.forEach(function(item){
                if (item.ID == _id){
                    item.Nome = Nome
                    item.Sobrenome = Sobrenome
                    item.Nasc = Nasc
                    item.CNPJ = CNPJ
                }
            })
        }


    alert("Registro salvo com sucesso")
    $("#modal_registro").modal("hide")

    $("#hdid").val("0")
    $("#txt_nome").val("")
    $("#txt_sobrenome").val("")
    $("#txt_nasc").val("")
    $("#txt_cnpj").val("")

    popula_tabela()

})

})

