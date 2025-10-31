from src.sentiment_model import get_sentiment

def test_sentiment_output():
    results = get_sentiment(["Stocks rally as investors gain confidence"])
    assert isinstance(results, list)
