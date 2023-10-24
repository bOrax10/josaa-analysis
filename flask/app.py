import pandas as pd
from flask import Flask, render_template, jsonify, make_response, request
from flask_cors import CORS

app = Flask(
    __name__, template_folder="F:/VSCode/Web Dev/Projects/Josaa/josaa-analysis/src")
CORS(app)

# Load the CSV as a DataFrame
csv_data = pd.read_csv(
    'F:/VSCode/Web Dev/Projects/Josaa/josaa-analysis/sample.csv')
csv_data.drop("Quota", axis=1)


@app.route('/')
def display_csv():
    return render_template('index.html', data=csv_data.to_dict(orient='records'))


@app.route('/get_csv', methods=["GET"])
def get_filtered_csv():
    institute = request.args.get('institute', default='', type=str)
    seat = request.args.get('seat', default='', type=str)
    gender = request.args.get('gender', default='', type=str)
    round = request.args.get('round', default='', type=str)
    minRank = request.args.get('minrank', default='', type=str)
    maxRank = request.args.get('maxrank', default='', type=str)

    filtered_data = csv_data
    if (institute != ''):
        filtered_data = filtered_data[filtered_data['Institute'] == institute]
    if (seat != ''):
        filtered_data = filtered_data[filtered_data['Seat Type'] == seat]
    if (gender != ''):
        filtered_data = filtered_data[filtered_data['Gender'] == gender]
    if (round != ''):
        filtered_data = filtered_data[filtered_data['Round'].astype(
            str) == round[-1]]
    if (minRank != ''):
        filtered_data = filtered_data[filtered_data['Closing Rank'] >= int(
            minRank)]
    if (maxRank != ''):
        filtered_data = filtered_data[filtered_data['Closing Rank'] <= int(
            maxRank)]

    # Convert the filtered DataFrame to JSON
    response_json = filtered_data.to_json(orient='records')

    response = make_response(response_json)
    response.headers['Content-Type'] = 'application/json'
    response.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate'
    response.headers['Pragma'] = 'no-cache'
    response.headers['Expires'] = '0'

    return response


if __name__ == '__main__':
    app.run(debug=True)
