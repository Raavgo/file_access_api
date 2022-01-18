import os

from flask import Flask, request, render_template, send_from_directory
from werkzeug.utils import secure_filename
from flask_cors import CORS

UPLOAD_FOLDER = './files'

app = Flask(__name__)
CORS(app)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.secret_key = "super secret key unique"
uploads = os.path.join(app.root_path, app.config['UPLOAD_FOLDER'])

@app.route('/', methods=['GET'])
def main_page():
    files = list()
    for file in os.listdir(UPLOAD_FOLDER):
        files.append(str(file))

    return render_template('all_files.html', files=files)

@app.route('/rest/api/v1/file', methods=['POST'])
def upload_file():
    if request.method == 'POST':
        # check if the post request has the file part
        if 'file' not in request.files:
            return {"status": "No file part"}, 409

        file = request.files['file']

        if file.filename == '':
            return {"status": "No selected file"}, 404

        if file:
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            #return redirect(url_for('download_file', name=filename))

        return {"status": "success"}, 200

@app.route('/rest/api/v1/file', methods=['GET'])
def download_file():
    name = request.args.get('name')
    return send_from_directory(uploads, name)

@app.route('/rest/api/v1/file', methods=['DELETE'])
def delete():
    name = request.args.get('name')
    os.chdir(uploads)
    os.remove(name)
    os.chdir(app.root_path)
    files = list()
    for file in os.listdir():
        files.append(str(file))

    return {"status": "success"}, 200


if __name__ == "__main__":
    app.run(host='0.0.0.0')