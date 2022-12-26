import requests

url = "http://192.168.1.104:4000/commands"
# resp = requests.get(url)
def post_command(text):
    requests.post(url, text)
    pass

