import sys

# sys.path.append('backend/api/')
sys.path.append('api')
sys.path.append('ai')
from backend.api.evalutor import Evaluator

def test_modelA_Evaluate_Characte():
    evaluteA = Evaluator('backend/test/unit/a.jpg', 'A')
    result = evaluteA.testImage()
    assert result != None
    
def test_modelU_Evaluate_Character():
    evaluteU = Evaluator('backend/test/unit/u.png', 'U')
    result = evaluteU.testImage()
    assert result != None
        
def test_modelA_Evaluate_Image():
    evaluteA = Evaluator('backend/test/unit/error.png', 'A')
    result = evaluteA.testImage()
    assert result == None
    
def test_modelU_Evaluate_Image():
    evaluteU = Evaluator('backend/test/unit/error.png', 'U')
    result = evaluteU.testImage()
    print(result)
    assert result == None