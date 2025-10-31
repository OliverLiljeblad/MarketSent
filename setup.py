from setuptools import setup, find_packages

setup(
    name="marketsent",
    version="0.1.0",
    description="AI-powered financial sentiment analysis tool",
    author="Oliver (OByte-Tech)",
    packages=find_packages(),
    install_requires=[
        "pandas",
        "numpy",
        "scikit-learn",
        "matplotlib",
        "seaborn",
        "nltk",
        "spacy",
        "transformers",
        "requests",
        "yfinance",
        "plotly"
    ],
)
