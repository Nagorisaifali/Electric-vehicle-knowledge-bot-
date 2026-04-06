
from pypdf import PdfReader

def extract_text(file_path):
    reader = PdfReader(file_path)
    text = ""
    for p in reader.pages:
        text += p.extract_text()
    return text