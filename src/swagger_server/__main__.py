#!/usr/bin/env python3
import os

import connexion
from flask import  request, redirect

from swagger_server import encoder


app = connexion.App(__name__, specification_dir='./swagger/', )
app.app.json_encoder = encoder.JSONEncoder
app.app.config['UPLOAD_FOLDER'] = '/files'
app.add_api('swagger.yaml', arguments={'title': 'File Access API'}, pythonic_params=True)

@app.route('/rest/api/v1/file', methods=['GET', 'POST', 'DELETE'])
def file_handler(name):  # noqa: E501
    """rest_api_v1_file_post

    Creates a new file  in the filesystem # noqa: E501

    :param name: filename.extension
    :type name: str

    :rtype: str
    """

    if 'file' not in request.files:
        return f'do first magic!{str(request.form)}'
    file = request.files['file']
    # If the user does not select a file, the browser submits an
    # empty file without a filename.
    if file.filename == '':
        return redirect(request.url)
    else:
        filename = file.filename
        file.save(os.path.join(app.app.config['UPLOAD_FOLDER'], filename))
        return 'very nice success (Y) (Y)'


if __name__ == '__main__':
    app.run(port=8080)
