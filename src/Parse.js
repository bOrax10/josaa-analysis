import React, { Component } from 'react';

class CsvTable extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    // Fetch data when the component mounts
    this.fetchData(this.props.instituteValue, this.props.seatValue,this.props.genderValue,this.props.roundValue, this.props.minRank, this.props.maxRank);
  }

  componentDidUpdate(prevProps) {
    // Re-fetch data when the seatValue prop changes
    if (this.props.instituteValue !== prevProps.instituteValue) {
      this.fetchData(this.props.instituteValue, this.props.seatValue,this.props.genderValue,this.props.roundValue, this.props.minRank, this.props.maxRank);
    }
    if (this.props.seatValue !== prevProps.seatValue) {
      this.fetchData(this.props.instituteValue, this.props.seatValue,this.props.genderValue,this.props.roundValue, this.props.minRank, this.props.maxRank);
    }
    if (this.props.genderValue !== prevProps.genderValue) {
      this.fetchData(this.props.instituteValue, this.props.seatValue,this.props.genderValue,this.props.roundValue, this.props.minRank, this.props.maxRank);
    }
    if (this.props.roundValue !== prevProps.roundValue) {
      this.fetchData(this.props.instituteValue, this.props.seatValue,this.props.genderValue,this.props.roundValue, this.props.minRank, this.props.maxRank);
    }
    if (this.props.minRank !== prevProps.minRank) {
      this.fetchData(this.props.instituteValue, this.props.seatValue,this.props.genderValue,this.props.roundValue, this.props.minRank, this.props.maxRank);
    }
    if (this.props.maxRank !== prevProps.maxRank) {
      this.fetchData(this.props.instituteValue, this.props.seatValue,this.props.genderValue,this.props.roundValue, this.props.minRank, this.props.maxRank);
    }
  }

  fetchData = (instituteValue, seatValue, genderValue, roundValue, minRank, maxRank) => {
    const instituteParam = instituteValue ? `?institute=${instituteValue}` : `?institute=${''}`;
    const seatParam = seatValue ? `&seat=${seatValue}` : `&seat=${''}`;
    const genderParam = genderValue ? `&gender=${genderValue}` : `&gender=${''}`;
    const roundParam = roundValue ? `&round=${roundValue[roundValue.length-1]}` :`&round=${''}`;
    const minRankParam = minRank ? `&minrank=${minRank}` :`&minrank=${''}`;
    const maxRankParam = maxRank ? `&maxrank=${maxRank}` :`&maxrank=${''}`;
    const filterParam = instituteParam+seatParam+genderParam+roundParam+minRankParam+maxRankParam;
    console.log(filterParam);
    console.log(`http://localhost:5000/get_csv${filterParam}`);
    fetch(`http://localhost:5000/get_csv${filterParam}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.setState({ data });
      });
  }

  render() {
    const { data } = this.state;

    return (
      <div className='m-5'>
        <table className="table table-bordered table-dark table-striped">
          <thead>
            <tr>
              <th className='text-center'>Institute</th>
              <th className='text-center'>Academic Program Name</th>
              <th className='text-center'>Seat Type</th>
              <th className='text-center'>Gender</th>
              <th className='text-center'>Opening Rank</th>
              <th className='text-center'>Closing Rank</th>
              <th className='text-center'>Year</th>
              <th className='text-center'>Round</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td className='text-center'>{row.Institute}</td>
                <td className='text-center'>{row['Academic Program Name']}</td>
                <td className='text-center'>{row['Seat Type']}</td>
                <td className='text-center'>{row.Gender}</td>
                <td className='text-center'>{row['Opening Rank']}</td>
                <td className='text-center'>{row['Closing Rank']}</td>
                <td className='text-center'>{row.Year}</td>
                <td className='text-center'>{row.Round}</td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    );
  }
}

export default CsvTable;
