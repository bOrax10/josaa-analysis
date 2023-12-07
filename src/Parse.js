import React, { Component } from 'react';

class CsvTable extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      totalRows: 0,
      currentPage: 1,
    };
  }

  componentDidMount() {
    this.fetchData(
      this.props.instituteValue,
      this.props.seatValue,
      this.props.genderValue,
      this.props.roundValue,
      this.props.minRank,
      this.props.maxRank,
      this.props.pageNumber
    );
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.instituteValue !== prevProps.instituteValue ||
      this.props.seatValue !== prevProps.seatValue ||
      this.props.genderValue !== prevProps.genderValue ||
      this.props.roundValue !== prevProps.roundValue ||
      this.props.minRank !== prevProps.minRank ||
      this.props.maxRank !== prevProps.maxRank ||
      this.props.pageNumber !== prevProps.pageNumber
    ) {
      this.fetchData(
        this.props.instituteValue,
        this.props.seatValue,
        this.props.genderValue,
        this.props.roundValue,
        this.props.minRank,
        this.props.maxRank,
        this.props.pageNumber
      );
    }
  }

  fetchData = (instituteValue, seatValue, genderValue, roundValue, minRank, maxRank, pageNumber) => {
    const instituteParam = instituteValue ? `?institute=${instituteValue}` : `?institute=${''}`;
    const seatParam = seatValue ? `&seat=${seatValue}` : `&seat=${''}`;
    const genderParam = genderValue ? `&gender=${genderValue}` : `&gender=${''}`;
    const roundParam = roundValue ? `&round=${roundValue[roundValue.length - 1]}` : `&round=${''}`;
    const minRankParam = minRank ? `&minrank=${minRank}` : `&minrank=${''}`;
    const maxRankParam = maxRank ? `&maxrank=${maxRank}` : `&maxrank=${''}`;
    const pageNumberParam = pageNumber ? `&pageno=${pageNumber}` : `&pageno=${1}`;
    const filterParam =
      instituteParam + seatParam + genderParam + roundParam + minRankParam + maxRankParam + pageNumberParam;

    fetch(`http://localhost:5000/get_csv${filterParam}`)
      .then((response) => response.json())
      .then((data) => {
        const totalRows = data.total_rows ? data.total_rows : 0;
        const extractedData = Array.isArray(data.data) ? data.data : JSON.parse(data.data);

        this.setState({
          totalRows: totalRows,
          data: extractedData,
          currentPage: pageNumber,
        });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        this.setState({
          totalRows: 0,
          data: [],
          currentPage: 1,
        });
      });
  };

  handlePageChange = (pageNumber) => {
    this.fetchData(
      this.props.instituteValue,
      this.props.seatValue,
      this.props.genderValue,
      this.props.roundValue,
      this.props.minRank,
      this.props.maxRank,
      pageNumber
    );
  };

  renderPagination() {
    const { totalRows, currentPage } = this.state;
    const itemsPerPage = 10; // Number of pages to display
    const totalPages = Math.ceil(totalRows / itemsPerPage);
  
    // Don't render pagination if there is only one page
    if (totalPages === 1) {
      return null;
    }
  
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);
  
    // Calculate the start and end index for the displayed pages
    const startIndex = Math.max(currentPage - Math.floor(itemsPerPage / 2), 1);
    const endIndex = Math.min(startIndex + itemsPerPage - 1, totalPages);
  
    return (
        <nav>
          <ul className="pagination justify-content-center" style={{ backgroundColor: "#1c1b22" }}>
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button
                className="page-link text-light bg-dark"
                onClick={() => this.handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
            </li>
            {pageNumbers.slice(startIndex - 1, endIndex).map((page) => (
              <li
                key={page}
                className={`page-item ${page === currentPage ? 'active' : ''}`}
                onClick={() => this.handlePageChange(page)}
              >
                <button
                  className={`page-link text-light ${page === currentPage ? 'bg-secondary border border-light' : 'bg-dark'}`}
                >
                  {page}
                </button>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button
                className="page-link text-light bg-dark"
                onClick={() => this.handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
    );
  }
  
  

  render() {
    const { data } = this.state;

    return (
      <div className="m-5">

        <table className="table table-bordered table-dark table-striped">
          <thead>
            <tr>
              <th className="text-center">Institute</th>
              <th className="text-center">Academic Program Name</th>
              <th className="text-center">Seat Type</th>
              <th className="text-center">Gender</th>
              <th className="text-center">Opening Rank</th>
              <th className="text-center">Closing Rank</th>
              <th className="text-center">Year</th>
              <th className="text-center">Round</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td className="text-center">{row.Institute}</td>
                <td className="text-center">{row['Academic Program Name']}</td>
                <td className="text-center">{row['Seat Type']}</td>
                <td className="text-center">{row.Gender}</td>
                <td className="text-center">{row['Opening Rank']}</td>
                <td className="text-center">{row['Closing Rank']}</td>
                <td className="text-center">{row.Year}</td>
                <td className="text-center">{row.Round}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {this.renderPagination()}
      </div>
    );
  }
}

export default CsvTable;
