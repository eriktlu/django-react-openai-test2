from django.shortcuts import render
from django.conf import settings

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from django.http import JsonResponse

from .serializers import ResponseSerializer

import openai

openai.api_key = settings.OPENAI_KEY

# Create your views here.
class GenerateResponse(APIView):
    def post(self, request, format=None):
        user_text = request.data.get('user_text')
        response = openai.Completion.create(
            model="text-davinci-003",
            prompt=generate_script(user_text),
            temperature=0.6,
            max_tokens=2000,
        )
        data = response.choices[0].text
        print(response)
        return Response(data, status=status.HTTP_200_OK)
    
    # if request.method == "POST":
    #     animal = request.form["animal"]
    #     response = openai.Completion.create(
    #         model="text-davinci-003",
    #         prompt=generate_prompt(animal),
    #         temperature=0.6,
    #     )
    #     return redirect(url_for("index", result=response.choices[0].text))

    # result = request.args.get("result")
    # return render_template("index.html", result=result)


# def generate_prompt(text):
#     return """Suggest three names for an animal that is a superhero.

# Animal: Cat
# Names: Captain Sharpclaw, Agent Fluffball, The Incredible Feline
# Animal: Dog
# Names: Ruff the Protector, Wonder Canine, Sir Barks-a-Lot
# Animal: {}
# Names:""".format(
#         text.capitalize()
#     )




def generate_script(text):
    return format(text.capitalize()) + """ Answer only in Javascript, no script tags, no additional text. It is very important that you respond only in Javascript and nothing else and only in Javascript in a way that it can be copy pasted directly to this website. Do not use images, gifs or any other media, create everything yourself in javascript code. If you are not capable of doing what's asked then add a red text on top of the page saying: I am not capable of doing what you asked, sorry! 
Html for the page is: <body>
    <div id='main'>
        <div id='app'><div class='center'><div><h1>Make a wish:</h1><form><input type='text' name='animal' placeholder='Create a red ball with up and down bouncing animation..' required=''><input type='submit' value='Send'></form></div></div></div>
    </div>

    <script src='/static/frontend/main.js'></script>

</body>

Css for the page is:
@font-face {
    font-family: 'ColfaxAI';
    src: url(https://cdn.openai.com/API/fonts/ColfaxAIRegular.woff2)
        format('woff2'),
      url(https://cdn.openai.com/API/fonts/ColfaxAIRegular.woff) format('woff');
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: 'ColfaxAI';
    src: url(https://cdn.openai.com/API/fonts/ColfaxAIBold.woff2) format('woff2'),
      url(https://cdn.openai.com/API/fonts/ColfaxAIBold.woff) format('woff');
    font-weight: bold;
    font-style: normal;
  }
  body,
  input {
    font-size: 16px;
    line-height: 24px;
    color: #353740;
    font-family: 'ColfaxAI', Helvetica, sans-serif;
  }
  body {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0;
    margin: 0;
    min-height: 100vh;
    background: radial-gradient(circle, #272b4d 0%, #202123 100%)
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
  input[type='text'] {
    padding: 12px 16px;
    border: 1px solid #10a37f;
    border-radius: 4px;
    margin-bottom: 24px;
  }
  ::placeholder {
    color: #8e8ea0;
    opacity: 1;
  }
  input[type='submit'] {
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
    margin-top: 40px;
  }

  #app {
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
    """


# """<body>
#     <div id='main'>
#         <div id='app'><div class='center'><h1>Tere</h1><div><h1>Name my pet</h1><form><input type='text' name='animal' placeholder='Enter an animal' required=''><input type='submit' value='Generate names'></form></div></div></div>
#     </div>

#     <script src='/static/frontend/main.js'></script>

# </body>"""

# """
# @font-face {
#     font-family: "ColfaxAI";
#     src: url(https://cdn.openai.com/API/fonts/ColfaxAIRegular.woff2)
#         format("woff2"),
#       url(https://cdn.openai.com/API/fonts/ColfaxAIRegular.woff) format("woff");
#     font-weight: normal;
#     font-style: normal;
#   }
#   @font-face {
#     font-family: "ColfaxAI";
#     src: url(https://cdn.openai.com/API/fonts/ColfaxAIBold.woff2) format("woff2"),
#       url(https://cdn.openai.com/API/fonts/ColfaxAIBold.woff) format("woff");
#     font-weight: bold;
#     font-style: normal;
#   }
#   body,
#   input {
#     font-size: 16px;
#     line-height: 24px;
#     color: #353740;
#     font-family: "ColfaxAI", Helvetica, sans-serif;
#   }
#   body {
#     display: flex;
#     flex-direction: column;
#     align-items: center;
#     padding-top: 60px;
#   }
#   .icon {
#     width: 34px;
#   }
#   h3 {
#     font-size: 32px;
#     line-height: 40px;
#     font-weight: bold;
#     color: #202123;
#     margin: 16px 0 40px;
#   }
#   form {
#     display: flex;
#     flex-direction: column;
#     width: 320px;
#   }
#   input[type="text"] {
#     padding: 12px 16px;
#     border: 1px solid #10a37f;
#     border-radius: 4px;
#     margin-bottom: 24px;
#   }
#   ::placeholder {
#     color: #8e8ea0;
#     opacity: 1;
#   }
#   input[type="submit"] {
#     padding: 12px 0;
#     color: #fff;
#     background-color: #10a37f;
#     border: none;
#     border-radius: 4px;
#     text-align: center;
#     cursor: pointer;
#   }
#   .result {
#     font-weight: bold;
#     margin-top: 40px;
#   }
  
# """