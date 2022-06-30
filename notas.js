var notas = []

function apaga_registro(id) {
    let _confirm = confirm("Deseja realmente excluir o registro?")

    if (_confirm) {
        for (let i = 0; i < notas.length; i++) {
            if (notas[i].ID == id) {
                notas.splice(i, 1)
            }
        }

        popula_tabela()

    }
}

function edita_registro(id) {

    $("#modal_registro").modal("show")

    notas.forEach(function (item) {

        if (item.ID == id) {
            $("#hdid").val(item.ID)
            $("#txt_tipo").val(item.Tipo)
            $("#txt_doc").val(item.Doc)
            $("#txt_lanc").val(item.Lanc.substr(6, 4) + "-" + item.Lanc.substr(3, 2) + "-" + item.Lanc.substr(0, 2))
            $("#txt_val").val(item.Val)
        }

    })

}

function popula_tabela() {
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
                <td><button type="button" class="btn btn-primary" onclick="javascript:edita_registro(${item.ID});"><i class="fa fa-edit"></button></td>
                <td><button type="button" class="btn btn-danger" onclick="javascript:apaga_registro(${item.ID});"><i class="fa fa-trash"></button></td>
            </tr>`)
        })
    }
}

$(function () {
    notas = JSON.parse(localStorage.getItem("__notas__"))

    if (notas != null) {

        popula_tabela();
    
      } else {notas = []}


    $("#btn_salvar").click(function () {

        let _id = $("#hdid").val()

        let Tipo = $("#txt_tipo").val()
        let Doc = $("#txt_doc").val()
        let Lanc = new Date($("#txt_lanc").val()).toLocaleDateString("pt-br", { timeZone: "UTC" })
        let Val = $("#txt_val").val()        

        if (!_id || _id == "0"){ 

            let registro = {}

            registro.Tipo = Tipo
            registro.Doc = Doc
            registro.Lanc = Lanc
            registro.Val = Val

            registro.ID = notas.length + 1
            notas.push(registro)
        }
        else{
            notas.forEach(function(item){
                if (item.ID == _id){
                    item.Tipo = Tipo
                    item.Doc = Doc
                    item.Lanc = Lanc
                    item.Val = Val
                }
            })
        }


    alert("Registro salvo com sucesso")
    $("#modal_registro").modal("hide")

    $("#hdid").val("0")
    $("#txt_tipo").val("")
    $("#txt_doc").val("")
    $("#txt_lanc").val("")
    $("#txt_val").val("")
 

    popula_tabela()

})

})