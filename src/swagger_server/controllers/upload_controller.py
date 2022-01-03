import os

import connexion
import six
from connexion import request
from swagger_server import util
from werkzeug.utils import secure_filename


def rest_api_v1_file_post(name):  # noqa: E501
    """rest_api_v1_file_post

    Creates a new file  in the filesystem # noqa: E501

    :param name: filename.extension
    :type name: str

    :rtype: str
    """

    path = f'files/{name}'
    file = request.files['file']
    filename = secure_filename(file.filename)
    file.save(os.path.join('files', filename))


    return f'do some magic!'
