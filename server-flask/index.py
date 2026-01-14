import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import fitz  # PyMuPDF
from io import BytesIO
import cloudinary
import cloudinary.uploader
import pdfplumber
import logging
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

# Suppress pdfminer warnings
logging.getLogger("pdfminer").setLevel(logging.ERROR)

cloud_name = os.getenv("CLOUDINARY_CLOUD_NAME")
api_key = os.getenv("CLOUDINARY_API_KEY")
api_secret = os.getenv("CLOUDINARY_API_SECRET")


cloudinary.config(
    cloud_name=cloud_name,
    api_key=api_key,
    api_secret=api_secret
)


def check_bold(font_name):
  return "Bold" in font_name or "bold" in font_name


def fetch_table(file_bytes, tables):
  with pdfplumber.open(BytesIO(file_bytes)) as pdf:
    for idx, page in enumerate(pdf.pages):
      fetched_tables = page.find_tables()
      for table in fetched_tables:
        y = table.bbox[1]
        tables.append((table.extract(), y, idx))


def arrange_data_to_headers(type, dataset, headers, richFields):
  for data in dataset:
    should_continue = False
    for idx, header in enumerate(headers):
      if (header[2] > data[2]) or (header[2] == data[2] and header[1] > data[1]):
        richFields.append(
            {"field": headers[idx-1][0], "content": data[0], "type": type})
        should_continue = True
        break
    if should_continue:
      continue
    richFields.append(
        {"field": headers[-1][0], "content": data[0], "type": type})


def parse_pdf_from_file(file_bytes, model_card_id):
  document = fitz.open(stream=BytesIO(file_bytes), filetype="pdf")
  json = {}
  outer_key, inner_key = "", ""
  headers, images, richFields, tables = [], [], [], []

  for page_idx, page in enumerate(document):
    blocks = page.get_text("dict")["blocks"]
    for block in blocks:
      if block['type'] == 0:
        for line in block.get("lines", []):
          spans = line.get("spans", [])
          if not spans:
            continue

          text = " ".join(span["text"].strip() for span in spans).strip()
          if not text:
            continue

          font_size = spans[0]["size"]
          bold = check_bold(spans[0]["font"])

          if font_size > 15 and bold:
            outer_key = text
            headers.append((outer_key, spans[0]['bbox'][1], page_idx))
            json[outer_key] = ""
            inner_key = ""
            continue

          elif outer_key and bold:
            if not isinstance(json[outer_key], dict):
              json[outer_key] = {}
            inner_key = text
            headers.append((inner_key, spans[0]['bbox'][1], page_idx))
            json[outer_key][inner_key] = ""
            continue

          elif outer_key:
            if isinstance(json[outer_key], dict) and inner_key:
              json[outer_key][inner_key] += text + " "
            else:
              json[outer_key] += text + " "
      elif block['type'] == 1 and (cloud_name and api_key and api_secret):
        img_io = BytesIO(block["image"])
        img_io.name = f"pdf_images/{model_card_id}_figure{len(images)}"

        upload_result = cloudinary.uploader.upload(
            img_io, resource_type="image",
            public_id=f"pdf_images/{model_card_id}_figure{len(images)}",
            overwrite=True,
            folder="model_card_image",
            format=block["ext"])

        images.append((upload_result['secure_url'],
                      block['bbox'][1], page_idx))

  fetch_table(file_bytes, tables)
  arrange_data_to_headers("image", images, headers, richFields)
  arrange_data_to_headers("json", tables, headers, richFields)

  if (richFields):
    json["richFields"] = richFields

  return json


@app.route('/upload_pdf/<model_card_id>', methods=['POST'])
def upload_pdf(model_card_id):
  if 'file' not in request.files:
    return jsonify({'error': 'No file part'}), 400

  file = request.files['file']
  if file.filename == '':
    return jsonify({'error': 'No selected file'}), 400

  try:
    pdf_bytes = file.read()
    data = parse_pdf_from_file(pdf_bytes, model_card_id)
    print("run here")
    print(jsonify(data))
    return jsonify(data)
  except Exception as e:
    return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
  app.run(host='0.0.0.0', port=8080)
