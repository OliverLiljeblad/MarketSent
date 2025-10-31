import matplotlib.pyplot as plt
import seaborn as sns

def plot_sentiment(sentiments):
    sns.histplot(sentiments)
    plt.title('Sentiment Distribution')
    plt.show()
