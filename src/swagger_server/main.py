import os

from flask import Flask, flash, request, redirect, url_for, render_template, send_from_directory
from werkzeug.utils import secure_filename

UPLOAD_FOLDER = './files'
ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.secret_key = "super secret key unique"
uploads = os.path.join(app.root_path, app.config['UPLOAD_FOLDER'])
def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        # check if the post request has the file part
        if 'file' not in request.files:
            flash('No file part')
            return redirect(request.url)
        file = request.files['file']
        # If the user does not select a file, the browser submits an
        # empty file without a filename.
        if file.filename == '':
            flash('No selected file')
            return redirect(request.url)
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            #return redirect(url_for('download_file', name=filename))

        files = list()
        for file in os.listdir(UPLOAD_FOLDER):
            files.append(str(file))

        return render_template('all_files.html', files=files)

    if request.method == 'GET':

        return send_from_directory(uploads, "PErmission.png")

@app.route('/', methods=['DELETE'])
def delete():
    name = "PErmission.png"
    os.chdir(uploads)
    os.remove(name)
    os.chdir(app.root_path)
    files = list()
    for file in os.listdir():
        files.append(str(file))

    return render_template('all_files.html', files=files)


if __name__ == "__main__":
    app.run('8080')