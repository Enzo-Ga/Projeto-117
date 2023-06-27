$(document).ready(function () {
  console.log("Ready");

  // Busque a data atual e atualize-a no DOM
  let date = new Date();
  let current_date =
    "Data: " +
    date.toLocaleDateString("pt-BR", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  $("#date").text(current_date);

  // Escreva um evento, quando o botão Enviar for clicado
  $("button").click(function () {
    // Obtenha o valor do texto da área de texto usando o método 'val()'
    let text_value = $("#text").val();

    // Converta-o em um objeto JS.
    // Forneça uma "chave" aqui e escreva o mesmo no arquivo app.py também para extrair dados
    let input_text = { text: text_value };
    console.log(input_text);

    // Requisição ajax
    $.ajax({
      // Tipo da requisição web
      type: "POST",

      // Dados a serem enviados no formato JSON
      data: JSON.stringify(input_text),

      // O tipo de resposta esperado é JSON
      dataType: "json",

      // ContentType
      contentType: "application/json",

      // Se tudo funcionar, execute esta função
      success: function (result) {
        // Extraia a previsão e a URL do emoticon do resultado
        let sentiment = result.sentiment;
        let emoticonURL = result.emoticonURL;

        // Atualize os elementos DOM
        $("#sentiment").text(sentiment);
        $("#sentiment").css("display", "block");

        $("#emoji").attr("src", emoticonURL);
        $("#emoji").css("display", "block");
      },

      // Se houver algum erro, execute esta função
      error: function (result) {
        console.log(result.responseJSON.message);
      },
    });

    // Limpe a caixa de texto após cada clique no botão
    $("#text").val("");
  });
});
