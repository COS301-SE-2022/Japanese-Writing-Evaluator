import os
import tempfile
import pytest
# from flaskr import create_app
import sys
sys.path.insert(0, 'flaskr')
from flaskr.db import get_db, init_db
sys.path.insert(1, "backend/services/authentication")
from authentication import app as auth
# from kanji import app as kanji
with open(os.path.join(os.path.dirname(__file__), 'data.sql'), 'rb') as f:
    _data_sql = f.read().decode('utf8')

@pytest.fixture
def app():
    db_fd, db_path = tempfile.mkstemp()

    auth.config.update({
      'TESTING': True,
      'DATABASE': db_path  
    })

    with auth.app_context():
        init_db()
        get_db().executescript(_data_sql)

    yield auth

    os.close(db_fd)
    os.unlink(db_path)

@pytest.fixture
def client(app):
    return app.test_client()


@pytest.fixture
def runner(app):
    return app.test_cli_runner()
