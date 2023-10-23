import csv
from flask import Flask, render_template, jsonify, make_response, request
from flask_cors import CORS

app = Flask(
    __name__, template_folder="F:/VSCode/Web Dev/Projects/Josaa/josaa-analysis/src")
CORS(app)


def read_csv_data():
    csv_data = []
    with open('F:/VSCode/Web Dev/Projects/Josaa/josaa-analysis/sample.csv', newline='') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            csv_data.append(row)
    return csv_data


@app.route('/')
def display_csv():
    csv_data = read_csv_data()
    return render_template('index.html', data=csv_data)


@app.route('/get_csv', methods=["GET"])
def get_filtered_csv():
    seat = request.args.get('seat', default='', type=str)
    gender = request.args.get('gender', default='', type=str)
    round = request.args.get('round', default='', type=str)

    csv_data = read_csv_data()

    filtered_data = csv_data

    if (seat != ''):
        filtered_data = [
            row for row in filtered_data
            if (row.get('Seat Type') == seat)]
    if (gender != ''):
        filtered_data = [
            row for row in filtered_data
            if (row.get('Gender') == gender)]
    if (round != ''):
        filtered_data = [
            row for row in filtered_data
            if (str(row.get('Round')) == round[-1])]

    response = make_response(jsonify(filtered_data))
    response.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate'
    response.headers['Pragma'] = 'no-cache'
    response.headers['Expires'] = '0'

    return response


if __name__ == '__main__':
    app.run(debug=True)
