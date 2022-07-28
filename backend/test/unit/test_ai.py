import sys
from PIL import Image

# sys.path.append('backend/api/')
sys.path.append('api')
sys.path.append('ai')
from backend.api.evaluator import Evaluator

def test_model_Hiragana_Evaluate_Characte():
    i = Image.open('backend/test/unit/a.jpg')
    i.save('../../api/imageToSave.png')
    e = Evaluator('hiragana', '')
    result = e.testCharacter()
    assert result != None
    
def test_model_Kanji_Evaluate_Character():
    i = Image.open('backend/test/unit/kanji.jpg')
    i.save('../../api/imageToSave.png')
    e = Evaluator('kanji', '')
    result = e.testCharacter()
    assert result != None
        
def test_model_Hiragana_Evaluate_False_Image():
    i = Image.open('backend/test/unit/error.png')
    i.save('../../api/imageToSave.png')
    e = Evaluator('hiragana', '')
    result = e.testCharacter()
    assert result != None
    
def test_model_Kanji_Evaluate_False_Image():
    i = Image.open('backend/test/unit/error.png')
    i.save('../../api/imageToSave.png')
    e = Evaluator('kanji', '')
    result = e.testCharacter()
    assert result != None