$(function(){
    var btPesquisar = $('#pesquisar');     //submitBtn
    var opPlataforma = $('#plataforma'); //platfromDropDownBtn
    var campoNickname = $('#nickname');    //epicNickName 
    var resultadoNome = $('#resultadoNome');      //results
    var resultadoSolo = $('#resultadoSolo');
    var resultadoDuo = $('#resultadoDuo');
    var resultadoSquad = $('#resultadoSquad');

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
        resultadoNome.html('');
        campoNickname.val('');
    }

    function mostrarDados(dados){
        var epicUserHandle = dados.epicUserHandle
        var listaSolo = '<ul class = "list-group">' +
                    '<li class = "list-group-item">' + 'Vitórias: '                + dados.stats.p2.top1.value     + "</li>" +
                    '<li class = "list-group-item">' + 'Porcentagem de Vitórias: ' + dados.stats.p2.winRatio.value + "</li>" +
                    '<li class = "list-group-item">' + 'Rank: '                    + dados.stats.p2.top1.rank      + "</li>" +
                    '<li class = "list-group-item">' + 'K/D: '                     + dados.stats.p2.kd.value     + "</li>" +
                    '<li class = "list-group-item">' + 'Total de Kills: '          + dados.stats.p2.kills.value    + "</li>" +
                    '<li class = "list-group-item">' + 'Kills por jogo: '          + dados.stats.p2.kpg.value      + "</li>" +
                   '</ul>';

        var listaDuos = '<ul class = "list-group">' +
                   '<li class = "list-group-item">' + 'Vitórias: '                + dados.stats.p10.top1.value     + "</li>" +
                   '<li class = "list-group-item">' + 'Porcentagem de Vitórias: ' + dados.stats.p10.winRatio.value + "</li>" +
                   '<li class = "list-group-item">' + 'Rank: '                    + dados.stats.p10.top1.rank      + "</li>" +
                   '<li class = "list-group-item">' + 'K/D: '                     + dados.stats.p10.kd.value     + "</li>" +
                   '<li class = "list-group-item">' + 'Total de Kills: '          + dados.stats.p10.kills.value    + "</li>" +
                   '<li class = "list-group-item">' + 'Kills por jogo: '          + dados.stats.p10.kpg.value      + "</li>" +
                  '</ul>'; 

        var listaSquad = '<ul class = "list-group">' +
                  '<li class = "list-group-item">' + 'Vitórias: '                + dados.stats.p9.top1.value     + "</li>" +
                  '<li class = "list-group-item">' + 'Porcentagem de Vitórias: ' + dados.stats.p9.winRatio.value + "</li>" +
                  '<li class = "list-group-item">' + 'Rank: '                    + dados.stats.p9.top1.rank      + "</li>" +
                  '<li class = "list-group-item">' + 'K/D: '                     + dados.stats.p9.kd.value     + "</li>" +
                  '<li class = "list-group-item">' + 'Total de Kills: '          + dados.stats.p9.kills.value    + "</li>" +
                  '<li class = "list-group-item">' + 'Kills por jogo: '          + dados.stats.p9.kpg.value      + "</li>" +
                 '</ul>';  
                
                var modelo = '<div class="card text-center">' +   
                        '<div class="card-body-center">'       +                                                               
                        '<h5 class="card-header">'            + epicUserHandle + '</h5>' + 
                        //'<p class="card-text">' + listaDuos + '</p>' +                         
                        '</div>' + 
                    '</div>';   

                var modelo2 = '<div class="card text-center">' + 
                        '<h5 class="card-header">' + 'Solos' + '</h5>' + 
                        '<div class="card-body">' + 
                        '<p class="card-text">' + listaSolo + '</p>' + 
                '</div>' + 
                '</div>';
                var modelo3 = '<div class="card text-center">' + 
                        '<h5 class="card-header">' + 'Duos' + '</h5>' + 
                        '<div class="card-body">' + 
                        '<p class="card-text">' + listaDuos + '</p>' + 
                '</div>' + 
                '</div>';
                var modelo4 = '<div class="card text-center">' + 
                        '<h5 class="card-header">' + 'Squad' + '</h5>' + 
                        '<div class="card-body">' + 
                        '<p class="card-text">' + listaSquad + '</p>' + 
                '</div>' + 
                '</div>';

        resultadoNome.html(modelo);
        resultadoSolo.html(modelo2);
        resultadoDuo.html(modelo3);
        resultadoSquad.html(modelo4);
    }

});