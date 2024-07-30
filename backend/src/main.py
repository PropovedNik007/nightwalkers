from typing import Union
import spacy
from fastapi import FastAPI
from pydantic import BaseModel
from thefuzz import fuzz, process
from fastapi import FastAPI, Request, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import openai
import base64
import json
import requests
from content.av_hubert.avhubert.main import *
from moviepy.editor import VideoFileClip

import subprocess

def convert_webm_to_mov(input_path, output_path):
    command = ['ffmpeg', '-y', '-i', input_path, output_path]
    subprocess.run(command, check=True)

# input_path = '/path/to/input.webm'
# output_path = '/path/to/output.mov'

# convert_webm_to_mov(input_path, output_path)


# def convert_webm_to_mov(webm_path, mov_path):
#     clip = VideoFileClip(webm_path)
#     clip.write_videofile(mov_path, codec='libx264')

# webm_path = "/path/to/input.webm"
# mov_path = "/path/to/output.mov"

# convert_webm_to_mov(webm_path, mov_path)


app = FastAPI()

origins = ["http://localhost:3000"]  # Replace with your frontend's origin
app.add_middleware(CORSMiddleware, allow_origins=origins, allow_credentials=True,
                   allow_methods=["*"], allow_headers=["*"])

dataBaseArray = []


class TextRequest(BaseModel):
    text: str


@app.get("/")
def read_root():
    response = lip2text('/home/artur/clip.mov')
    return response



@app.post("/lip2text")
def lipReading(file: UploadFile):
# def lipReading(file: str):
    # Specify the directory to save the uploaded file
    # print(file)
    # webm_path = "/path/to/input.webm"
    # mov_path = "/path/to/output.mov"



    upload_folder = "./uploads"
    os.makedirs(upload_folder, exist_ok=True)

    # Full path to the file
    # file_path = os.path.join(upload_folder, file.filename)
    file_path = os.path.join(upload_folder, 'video.webm')
    # output_path = os.path.join(upload_folder, file.filename + '.mov')
    #
    # print(file_path)
    # print(output_path)
    #
    # # convert_webm_to_mov(file_path, upload_folder+'/'+file.filename+'.mov')
    # convert_webm_to_mov(file_path, output_path)
    #
    # file_path = output_path

    try:
        contents = file.file.read()
        with open(file_path, 'wb') as f:
            f.write(contents)
    except Exception as e:
        return JSONResponse(content={"message": f"There was an error uploading the file: {str(e)}"}, status_code=400)
    finally:
        file.file.close()
    # file_path = os.path.join(upload_folder, file.filename)
    output_path = os.path.join(upload_folder, file.filename + '.mov')

    # convert_webm_to_mov(input_path, output_path)
    # convert_webm_to_mov(file_path, upload_folder+'/'+file.filename+'.mov')
    convert_webm_to_mov(file_path, output_path)

    file_path = output_path
    liptext = lip2text(file_path)
    # return response
    openai.api_key = "API_KEY"
    response = openai.Completion.create(
        model="text-davinci-003",
        prompt=f"we are interprating with lip reading a expression that is sent by medical and security staff over to other crew members. can you help us to remove fuzzy words and replace misheard words with fitting words. i give you now an example sentence and i want you to respond with the just fitting text without any disclaimers or other irrelevant info. Sentence: {liptext}",
        temperature=0.7,
        max_tokens=2048,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0
    )
    # print("FFDf", response)
    response_text = response["choices"][0]["text"].strip()
    dataBaseArray.append(response_text)
    return response_text


# @app.post("/uploadfile/")
# async def create_upload_file(file: UploadFile):
#     return {"filename": file.filename}


# @app.post("/text_formatter")
# def textFormatter(text: str):  # Receive the string directly
#     openai.api_key = "API_KEY"
#     response = openai.Completion.create(
#         model="text-davinci-003",
#         prompt=f"we are interprating with lip reading a expression that is sent by medical and security staff over to other crew members. can you help us to remove fuzzy words and replace misheard words with fitting words. i give you now an example sentence and i want you to response in a json with text=here the correct sentence. and please just response with the json and don't comment it because I want to use your output directly in my app. Sentence: {text}",
#         temperature=0.7,
#         max_tokens=2048,
#         top_p=1,
#         frequency_penalty=0,
#         presence_penalty=0
#     )
#     response_text = response["choices"][0]["text"]
#     return response_text


@app.get("/notification")
def getNotifications():
    # text = lipReading()
    # response = textFormatter(text)  # No need to call textFormatter again
    # database = saveNotifications(text)
    return dataBaseArray  # Create the JSON response


def saveNotifications(text):
    dataBaseArray.append(text)
    print(dataBaseArray)
    return dataBaseArray
