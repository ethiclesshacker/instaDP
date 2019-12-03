from flask import Flask , render_template , redirect , request , url_for
import re
import requests

app = Flask(__name__)


imgLink = ""

@app.route("/",methods= ["POST","GET"])
def home():
    imgLink=""
    if(request.method=="POST"):
        URL = "http://www.instagram.com/"
        userId = request.form["userID"]
        URL += userId
        page = requests.get(URL)
        if(page.status_code==200):
            html = page.text
            imgLink = re.findall(r'profile_pic_url_hd":"(.+.net)",', html)[0]

    return render_template("index.html",imgLink=imgLink)



if __name__ == "__main__":
    app.run(debug=True)