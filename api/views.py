from django.shortcuts import render
from django.conf import settings

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from django.http import JsonResponse

from .serializers import ResponseSerializer

import openai
import whisper

import tempfile

openai.api_key = settings.OPENAI_API_KEY


from gpt_index import GPTSimpleVectorIndex, SimpleWebPageReader, SimpleDirectoryReader

import os
import os.path
os.environ['OPENAI_API_KEY'] = settings.OPENAI_API_KEY

class GenerateWebsiteAskResponse(APIView):
  def post(self, request, format=None):
    user_text = request.data.get('user_text')
    website = request.data.get('website_url')

    documents = SimpleWebPageReader(html_to_text=True).load_data([website])
    index = GPTSimpleVectorIndex(documents)
    response = index.query(user_text)

    data = str(response)
    print(response)
    return Response(data, status=status.HTTP_200_OK)

class GenerateChatResponse(APIView):
  def post(self, request, format=None):
    question = request.data.get('question')

    documents = SimpleDirectoryReader('api\website_data').load_data()
    index = GPTSimpleVectorIndex(documents)
    response = index.query(question)

    data = str(response)
    print(response)
    return Response(data, status=status.HTTP_200_OK)
  
class GenerateAudioTranscription(APIView):
  def post(self, request, format=None):
    model = whisper.load_model("base")
    files = request.FILES.get('audio')
    with tempfile.TemporaryFile(suffix=os.path.splitext(files.name)[1], delete=False) as f:
      for chunk in files.chunks():
        f.write(chunk)
      f.seek(0)
    try:
      audio = whisper.load_audio(f.name)
    finally:
      os.unlink(f.name)

    audio = whisper.pad_or_trim(audio)
    mel = whisper.log_mel_spectrogram(audio).to(model.device)
    _, probs = model.detect_language(mel)
    options = whisper.DecodingOptions(language='en', fp16=False)
    result = whisper.decode(model, mel, options)
    data = ''
    if result.no_speech_prob < .6:
      print(result.text)
      data = result.text

    return Response(data, status=status.HTTP_200_OK)
    

class GenerateDocumentResponse(APIView):
  def post(self, request, format=None):
    user_text = request.data.get('user_text')
    user_file = request.FILES.get('user_file')
    with tempfile.TemporaryDirectory() as tmpdirname:
      dest = tmpdirname
      print(dest)

      f = open(os.path.join(tmpdirname, str(user_file)), 'wb')
      f.write(user_file.read())

      documents = SimpleDirectoryReader(dest).load_data()
      index = GPTSimpleVectorIndex(documents)
      response = index.query(user_text)

      data = str(response)
      print(response)
      f.close()
      return Response(data, status=status.HTTP_200_OK)

class GenerateResponse(APIView):
    def post(self, request, format=None):
      user_text = request.data.get('user_text')
      response = openai.Completion.create(
          model="text-davinci-003",
          prompt=generate_script(user_text),
          temperature=0.3,
          max_tokens=140,
          top_p=1,
          frequency_penalty=0,
          presence_penalty=1

      )
      data = response.choices[0].text
      print(response)
      return Response(data[data.find('// Javascript'):], status=status.HTTP_200_OK)

def ptl_generate_prompt(text):
  return """
  I am a highly intelligent question answering bot. If you ask me a question that is rooted in truth, I will give you the answer. If you ask me a question that is nonsense, trickery, or has no clear answer, I will respond with \"Unknown\". Q:
  """+ format(text)

def generate_script(text):
    return """
    You are an expert web developer. You only know how to code in Javascript. You must answer only in Javascript. You must try to solve every prompt given to you with Javascript only. Use the provided HTML and CSS code to provide a Javascript prompt that will work on that page. Use the provided examples to see how to send back the result. Do not use images, gifs or any other media, everything must be created from scratch using Javascript code. Do not add anything to the middle of the screen unless specifically asked to. If you are not capable of doing what's asked then alert the user in Javascript by saying: I am not capable of that, sorry!

    Html for the page is: <body>
    <div id='main'>
        <div id='app'><div class='center'><div><h1>Make a wish:</h1><form><input type='text' name='animal' placeholder='Create a red ball with up and down bouncing animation..' required=''><input type='submit' value='Send'></form></div></div></div>
    </div>

    <script src='/static/frontend/main.js'></script>

</body>

Css for the page is:
body,
input {
  font-size: 16px;
  line-height: 24px;
  font-family: "ColfaxAI", Helvetica, sans-serif;
}
body {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
  margin: 0;
  min-height: 100vh;
  background: radial-gradient(circle, #272b4d 0%, #202123 100%);
  overflow: hidden;
  color: #b4b4b4;
}
#ai-response {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: -1;
}
.icon {
  width: 34px;
}
h3 {
  font-size: 32px;
  line-height: 40px;
  font-weight: bold;
  color: #202123;
  margin: 16px 0 40px;
}
form {
  display: flex;
  flex-direction: column;
  width: 320px;
}
input[type="text"] {
  padding: 12px 16px;
  border: 1px solid #10a37f;
  border-radius: 4px;
  margin-bottom: 24px;
}
::placeholder {
  color: #8e8ea0;
  opacity: 1;
}
input[type="submit"] {
  padding: 12px 0;
  color: #fff;
  background-color: #10a37f;
  border: none;
  border-radius: 4px;
  text-align: center;
  cursor: pointer;
  visibility: hidden;
}
.result {
  font-weight: bold;
  margin-top: 250px;
}

#main {
  width: 100%;
  min-height: 100vh;
}

#app {
  display: flex;
  justify-content: center;
}

/* Navigation */

.nav a {
  text-decoration: none;
  color: #b4b4b4;
  text-transform: uppercase;
  margin-right: 1rem;
}

.form-area {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

h1 {
  line-height: 2rem;
  text-align: center;
  color: #b4b4b4;
}
  
  Prompt: Add a red text
  Example answer:
  // Javascript
    const app = document.getElementById('ai-response');
    const message = document.createElement('div');
    message.innerHTML = 'I am so excited to learn Javascript!';
    message.style.color = 'red';
    app.prepend(message);
  // End of Javascript

  Prompt: create a red ball with up and down bouncing animation
  Example answer 2:
  // Javascript
    const app = document.getElementById('ai-response');
    const ball = document.createElement('div');
    ball.style.position = 'absolute';
    ball.style.top = '0px';
    ball.style.right = '0px';
    ball.style.width = '50px';
    ball.style.height = '50px';
    ball.style.backgroundColor = 'red';
    ball.style.borderRadius = '50%';

    let topPosition = 0;
    let direction = 'up';

    setInterval(() => {
        if (direction === 'up') {
            topPosition += 5;
            ball.style.top = `${topPosition}px`;
            if (topPosition >= 200) {
                direction = 'down';
            }
        } else {
            topPosition -= 5;
            ball.style.top = `${topPosition}px`;
            if (topPosition <= 0) {
                direction = 'up';
            }
        }
    }, 50);

    app.prepend(ball);
  // End of Javascript

  Propmpt: Create a snake game
  Example answer 3:
  // Javascript
    const app = document.getElementById('ai-response');
    const game = document.createElement('div');
    game.style.position = 'absolute';
    game.style.top = '0px';
    game.style.left = '0px';
    game.style.width = '100%';
    game.style.height = '100vh';

    const snake = {
        position: {x: 250, y: 250},
        body: [[250, 250], [240, 250], [230, 250]],
        direction: 'right',
        speed: 10
    }

    const food = {
        position: {x: 0, y: 0},
        color: 'red'
    }

    const gameLoop = setInterval(() => {
        // Move snake
        const head = snake.body[0];
        switch (snake.direction) {
            case 'right':
                snake.position.x += snake.speed;
                break;
            case 'left':
                snake.position.x -= snake.speed;
                break;
            case 'up':
                snake.position.y -= snake.speed;
                break;
            case 'down':
                snake.position.y += snake.speed;
                break;
        }
        snake.body.unshift([snake.position.x, snake.position.y]);
        snake.body.pop();

        // Generate food
        if (food.position.x === 0 && food.position.y === 0) {
            food.position.x = Math.floor(Math.random() * window.innerWidth/10) * 10 - 10;
            food.position.y = Math.floor(Math.random() * window.innerHeight/10) * 10 - 10;
        }

        // Check if food has been eaten
        if (head[0] === food.position.x && head[1] === food.position.y) {
            food.position.x = 0;
            food.position.y = 0;
            snake.body.push(head);
        }

        // Draw
        game.innerHTML = '';
        for (let i = 0; i < snake.body.length; i++) {
            const square = document.createElement('div');
            square.style.position = 'absolute';
            square.style.width = '10px';
            square.style.height = '10px';
            square.style.left = `${snake.body[i][0]}px`;
            square.style.top = `${snake.body[i][1]}px`;
            square.style.backgroundColor = i === 0 ? 'yellow' : 'green';
            game.appendChild(square);
        }
        const foodSquare = document.createElement('div');
        foodSquare.style.position = 'absolute';
        foodSquare.style.width = '10px';
        foodSquare.style.height = '10px';
        foodSquare.style.left = `${food.position.x}px`;
        foodSquare.style.top = `${food.position.y}px`;
        foodSquare.style.backgroundColor = food.color;
        game.appendChild(foodSquare);

        // Check collision
        if (snake.position.x < 0 || snake.position.x > window.innerWidth || snake.position.y < 0 || snake.position.y > window.innerHeight - 10) {
            alert('Game Over!');
            snake.position = {x: 250, y: 250};
            snake.body = [[250, 250], [240, 250], [230, 250]];
            snake.direction = 'right';
            snake.speed = 10;
        }
    }, 100);

    document.addEventListener('keydown', (e) => {
        switch (e.key) {
            case 'ArrowUp':
                snake.direction = 'up';
                break;
            case 'ArrowDown':
                snake.direction = 'down';
                break;
            case 'ArrowLeft':
                snake.direction = 'left';
                break;
            case 'ArrowRight':
                snake.direction = 'right';
                break;
        }
    });

    app.prepend(game);
// End of Javascript

Prompt: Add smiley face to bottom right of screen
Example answer 4:
  // Javascript
      const app = document.getElementById('ai-response');
      const smiley = document.createElement('div');
      smiley.style.position = 'absolute';
      smiley.style.bottom = '0px';
      smiley.style.right = '0px';
      smiley.style.width = '50px';
      smiley.style.height = '50px';
      smiley.style.backgroundColor = 'yellow';
      smiley.style.borderRadius = '50%';
      smiley.innerHTML = `
          <div style="position: absolute; top: 20%; left: 20%; width: 20%; height: 20%; background-color: black; border-radius: 50%;"></div>
          <div style="position: absolute; top: 20%; right: 20%; width: 20%; height: 20%; background-color: black; border-radius: 50%;"></div>
          <div style="position: absolute; bottom: 20%; left: 40%; width: 20%; height: 10%; background-color: black; border-radius: 50%;"></div>
      `;
      app.prepend(smiley);
  // End of Javascript

  Example of task you can't do:
  // Javascript
    alert('I am not capable of doing that, sorry!');
  // End of Javascript

  Prompt you must answer to: """+ format(text.capitalize())

