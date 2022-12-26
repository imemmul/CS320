'''
Purpose: Server responsible for routing

Author: Md. Tanvir Islam

Command to execute: python app.py  
'''
import flask
from flask import Flask, jsonify
from flask import render_template
from flask import json
from flask import request
import random
import sys

app = Flask(__name__)

print("Server is live...", file = sys.stderr)

users = []
current_command = "STARTING"

@app.route("/")
def index():
	return render_template("index.html"), 200

@app.route("/commands", methods=["GET", "POST"])
def get_command():
	global current_command
	if flask.request.method == 'POST':
		current_command = request.data.decode('utf-8')
		print(current_command)
		return current_command
	elif flask.request.method == 'GET':
		return current_command


if __name__ == "__main__":
	app.run(host = "0.0.0.0", port = 4000, debug = True)