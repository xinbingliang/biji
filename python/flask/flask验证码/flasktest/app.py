# -*- coding:utf-8 -*-
from io import BytesIO

from flask import Flask, make_response

from captcha.code import Captcha

__Author__ = "xinneirong"
__Email__ = "xinneirong@gmail.com"
__Time__ = "2019/11/23 11:13"

app = Flask(__name__)


@app.route('/', methods=['GET'])
def index():
    text, image = Captcha.gene_graph_captcha()
    out = BytesIO()
    image.save(out, 'png')
    out.seek(0)
    resp = make_response(out.read())
    resp.content_type = 'image/png'
    return resp



if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
