import pandas as pd
from flask import Flask, render_template, jsonify, make_response, request
from flask_cors import CORS

app = Flask(
    __name__, template_folder="F:/VSCode/Web Dev/Projects/Josaa/josaa-analysis/src")
CORS(app)

# Load the CSV as a DataFrame
csv_data = pd.read_csv(
    'F:/VSCode/Web Dev/Projects/Josaa/josaa-analysis/assets/ORCR_16_22_all.csv')
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
    pageNumber = request.args.get('pageno', default=1, type=int)
    last_round = {2016: 5, 2017: 6, 2018: 7,
                  2019: 6, 2020: 6, 2021: 6, 2022: 6}

    filtered_data = csv_data

    if (institute != ''):
        filtered_data = filtered_data[filtered_data['Institute'] == institute]
    if (seat != ''):
        filtered_data = filtered_data[filtered_data['Seat Type'] == seat]
    if (gender != ''):
        filtered_data = filtered_data[filtered_data['Gender'] == gender]

    if (round != '' and round != 'y'):
        filtered_data = filtered_data[filtered_data['Round'].astype(
            str) == round[-1]]
    elif (round == 'y'):
        filtered_data = filtered_data[filtered_data['Round']
                                      == filtered_data['Year'].map(last_round)]
    if (minRank != ''):
        filtered_data = filtered_data[filtered_data['Closing Rank'] >= int(
            minRank)]

    if (maxRank != ''):
        filtered_data = filtered_data[filtered_data['Closing Rank'] <= int(
            maxRank)]
    totalRows = len(filtered_data)
    filtered_data = filtered_data.iloc[(pageNumber-1)*10:(pageNumber-1)*10+10]
    # Convert the filtered DataFrame to JSON
    data_json = filtered_data.to_json(orient='records')
    print(type(data_json))
    response_json = {'total_rows': totalRows, 'data': data_json}

    response = make_response(response_json)
    response.headers['Content-Type'] = 'application/json'
    response.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate'
    response.headers['Pragma'] = 'no-cache'
    response.headers['Expires'] = '0'

    return response


@app.route('/get_iit', methods=["GET"])
def iit_details():
    iit = request.args.get('iit', default='', type=str)
    filtered_data = csv_data[csv_data['Institute']
                             == iit]['Academic Program Name'].unique()
    return jsonify(filtered_data.tolist())


@app.route('/get_branch_data', methods=["GET"])
def branch_details():
    iit = request.args.get('iit', default='', type=str)
    branch = request.args.get('branch', default='', type=str)
    filtered_data = csv_data[csv_data['Institute'] == iit]
    filtered_data = filtered_data[filtered_data['Academic Program Name'] == branch]
    filtered_data = filtered_data[filtered_data['Seat Type'] == "OPEN"]
    result_list = filtered_data.to_json(orient='records')
    return result_list


@app.route('/get_csv_by_branch', methods=["GET"])
def get_branch_wise_cutoff():
    branch = request.args.get('branch', default='', type=str)
    seat = request.args.get('seat', default='', type=str)
    gender = request.args.get('gender', default='', type=str)
    round = request.args.get('round', default='', type=str)
    minRank = request.args.get('minrank', default='', type=str)
    maxRank = request.args.get('maxrank', default='', type=str)
    pageNumber = request.args.get('pageno', default=1, type=int)
    last_round = {2016: 5, 2017: 6, 2018: 7,
                  2019: 6, 2020: 6, 2021: 6, 2022: 6}

    filtered_data = csv_data

    if (branch != ''):
        filtered_data = filtered_data[filtered_data['Category'].str.contains(
            branch, case=False, na=False)]
    if (seat != ''):
        filtered_data = filtered_data[filtered_data['Seat Type'] == seat]
    if (gender != ''):
        filtered_data = filtered_data[filtered_data['Gender'] == gender]

    if (round != '' and round != 'y'):
        filtered_data = filtered_data[filtered_data['Round'].astype(
            str) == round[-1]]
    elif (round == 'y'):
        filtered_data = filtered_data[filtered_data['Round']
                                      == filtered_data['Year'].map(last_round)]
    if (minRank != ''):
        filtered_data = filtered_data[filtered_data['Closing Rank'] >= int(
            minRank)]

    if (maxRank != ''):
        filtered_data = filtered_data[filtered_data['Closing Rank'] <= int(
            maxRank)]
    totalRows = len(filtered_data)
    filtered_data = filtered_data.iloc[(pageNumber-1)*10:(pageNumber-1)*10+10]
    # Convert the filtered DataFrame to JSON
    data_json = filtered_data.to_json(orient='records')
    print(type(data_json))
    response_json = {'total_rows': totalRows, 'data': data_json}

    response = make_response(response_json)
    response.headers['Content-Type'] = 'application/json'
    response.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate'
    response.headers['Pragma'] = 'no-cache'
    response.headers['Expires'] = '0'

    return response


if __name__ == '__main__':
    app.run(debug=True)
