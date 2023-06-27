# importe os módulos necessários
from flask import Flask, render_template, request, jsonify

# importe o arquivo sentiment_analysis como sa
import sentiment_analysis as sa

app = Flask(__name__)

# rota do aplicativo para a página inicial
@app.route('/')
def home():
    return render_template('index.html')

# crie uma rota para a requisição POST
@app.route("/1", methods=["POST"])
def review():
    # extraia a avaliação do cliente acessando a chave apropriada dos dados JSON
    review = request.json.get('text')

    # verifique se a avaliação do cliente está vazia e retorne um erro
    if not review:
        return jsonify({'status': 'error',
                        'message': 'Avaliação em branco'})

    # se a avaliação não estiver vazia, passe-a pela função 'predict'
    # a função predict retorna duas informações: o sentimento e o caminho da imagem na pasta static
    # exemplo: Positivo, ./static/assets/emoticons/positive.png
    else:
        sentiment, emoticon_url = sa.predict(review)

        return jsonify({'sentiment': sentiment, 'emoticonURL': emoticon_url})


if __name__ == "__main__":
    app.run(debug=True)
