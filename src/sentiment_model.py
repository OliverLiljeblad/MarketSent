from transformers import pipeline

def get_sentiment(texts):
    classifier = pipeline('sentiment-analysis')
    return [classifier(t)[0] for t in texts]
