# coding: utf-8

from __future__ import absolute_import

from flask import json
from six import BytesIO

from swagger_server.test import BaseTestCase


class TestUploadController(BaseTestCase):
    """UploadController integration test stubs"""

    def test_rest_api_v1_file_post(self):
        """Test case for rest_api_v1_file_post

        
        """
        query_string = [('name', 'name_example')]
        response = self.client.open(
            '/rest/api/v1/file',
            method='POST',
            content_type='multipart/form-data',
            query_string=query_string)
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))


if __name__ == '__main__':
    import unittest
    unittest.main()
