$(function(){
    var btPesquisar = $('#pesquisar');     //submitBtn
    var opPlataforma = $('#plataforma'); //platfromDropDownBtn
    var campoNickname = $('#nickname');    //epicNickName 
    var resultados = $('#resultados');      //results

    //valores padrões
    var opcaoPlat = 'pc';

    //dados que serão enviados pro node 
    btPesquisar.click(function(){
        var dados = {};                    //data
        dados.campoNickname = campoNickname.val().toLowerCase(); 
        dados.opcaoPlat = opcaoPlat.toLowerCase();  //dropDownValue
        //lowercase = caixa baixa para não dar erros
        //chamada ajax para mandar os dados para o backend
        $.ajax({
            type: "POST",
            url: "/",
            dataType: 'json',
            data : dados,
            success : function(dados){      //se tiver sucesso executar a função
                dados = JSON.parse(dados);
                mostrarDados(dados);        //displayData
            } 
        });
        resetarResultados(); //quando o usuário clicar em pesquisar ele reseta
    });

    opPlataforma.click(function(){
        opcaoPlat = $(this).text();
    });

    function resetarResultados(){
        resultados.html('');
        campoNickname.val('');
    }

    function mostrarDados(dados){
        var epicUserHandle = dados.epicUserHandle;
        var lista = '<ul class = "list-group">' +
                    '<li class = "list-group-item">' + 'Solo:' + dados.stats.p2.top1.value + "</li>" +
                    '<li class = "list-group-item">' + 'Duos:' + dados.stats.p10.top1.value + "</li>" +
                    '<li class = "list-group-item">' + 'Teams:' + dados.stats.p9.top1.value + "</li>" +
                   '</ul>';
        var modelo = '<div class="card text-center">' + 
                        '<h5 class="card-header">' + epicUserHandle + '</h5>' + 
                        '<div class="card-body">' + 
                        '<h5 class="card-title">' + 'Vitórias' + '</h5>' + 
                        '<p class="card-text">' + lista + '</p>' + 
                     '</div>' + 
                    '</div>';
        resultados.html(modelo);
    }

});