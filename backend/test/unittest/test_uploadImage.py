import sys
import unittest
from flask import current_app

sys.path.append('../../api')
sys.path.append('../../database')

from app import app


class UploadImageTest(unittest.TestCase):
    def setUp(self):
        self.app = app
        self.appctx = self.app.app_context()
        self.appctx.push()

    def tearDown(self):
        self.appctx.pop()
        self.app = None
        self.appctx = None

    def test_app(self):
        assert self.app is not None
        assert current_app == self.app

    # test upload image with a valid request body
    def valid_image_upload(self):
        request_body = {
            'id':2,
            'image_path': "somegivenpath",
            'image_char': " C",
            'score':0
        }
        tester = self.app.test_client(self)
        response = tester.post('/upload', json=request_body)
        self.assertEqual(response.status_code, 200)
        self.assertTrue(b'image upload successful.' in response.data)

    # test upload image with a invalid request body
    def invalid_image_upload(self):
            request_body = {
                'id':2,
                'image_path': "somegivenpath",
                'score':0
            }
            tester = self.app.test_client(self)
            response = tester.post('/upload', json=request_body)
            self.assertEqual(response.status_code, 401)
            self.assertTrue(b'image upload failed.' in response.data)

if __name__ == '__main__':
    unittest.main()