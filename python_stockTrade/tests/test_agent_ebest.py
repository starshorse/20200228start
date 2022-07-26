import unittest
# from stocklab.agent.ebest import EBest
from agent.ebest import EBest
import inspect
import time

class TestEbest(unittest.TestCase):
    def setUp(self):
        self.ebest = EBest("DEMO")
        self.ebest.login()

    def test_get_current_call_price_by_code(self):
        print(inspect.stack()[0][3])
        result = self.ebest.get_current_call_price_by_code("005930")
        assert result
        print(result)
