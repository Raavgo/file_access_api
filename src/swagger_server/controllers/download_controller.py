import connexion
import six

from swagger_server import util


def rest_api_v1_file_get(file_identifier):  # noqa: E501
    """rest_api_v1_file_get

    Retrieves a file from the filesystem # noqa: E501

    :param file_identifier: id or exact filename of the file
    :type file_identifier: str

    :rtype: str
    """
    return 'do some magic!'
