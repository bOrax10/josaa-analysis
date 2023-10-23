import React, { useState, useEffect } from 'react';
import CsvTable from './Parse';

const Institutes = () => {
    const [seatValue, setSeatValue] = useState('');
    const [genderValue, setGenderValue] = useState('');
    const [roundValue, setRoundValue] = useState('');
    const [tableData, setTableData] = useState([]);
    const [seatDropdownButtonText, setSeatDropdownButtonText] = useState('Select');
    const [genderDropdownButtonText, setGenderDropdownButtonText] = useState('Select');
    const [roundDropdownButtonText, setRoundDropdownButtonText] = useState('Select');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        // Add a one-second delay before making the API call
        const delay = setTimeout(() => {
            fetchData(seatValue, genderValue, roundValue);
        }, 300); // 1000 milliseconds = 1 second
    
        // Clear the timeout if the component unmounts or the dependencies change
        return () => clearTimeout(delay);
    }, [seatValue, genderValue, roundValue]);

    const handleSeatDropdownChange = (event) => {
        const value = event.target.getAttribute('data-value');
        if (value === 'CLEAR') {
            setSeatValue('');
            setSeatDropdownButtonText('Select');
        } else {
            setSeatValue(value);
            setSeatDropdownButtonText(value);
        }
    };

    const handleGenderDropdownChange = (event) => {
        const value = event.target.getAttribute('data-value');
        if (value === 'CLEAR') {
            setGenderValue('');
            setGenderDropdownButtonText('Select');
        } else {
            setGenderValue(value);
            setGenderDropdownButtonText(value);
        }
    };

    const handleRoundDropdownChange = (event) => {
        const value = event.target.getAttribute('data-value');
        if (value === 'All Rounds') {
            setRoundValue('');
            setRoundDropdownButtonText('Select');
        } else {
            setRoundValue(value);
            setRoundDropdownButtonText(value);
        }
    };

    const fetchData = (seat, gender, round) => {
        fetch(`http://localhost:5000/get_csv?seat=${seat}&gender=${gender}&round=${round}`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setTableData(data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div className="institutes">
            <h2 className="display-7 text-light fw-bold mx-3 mt-3">View All Institutes</h2>
            <p className="text-light ms-3">List of Institutes participating in JoSAA counseling.</p>
        
            <div className="row m-4">
                <div className="col-md-4">
                    <div className="dropdown">
                        <div className="seat-type">
                            <p className="text-light">Seat Type</p>
                            <button
                                className="btn btn-secondary dropdown-toggle custom-dropdown-button col-12"
                                type="button"
                                id="dropdownMenuButton1"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                            >
                                {seatDropdownButtonText}
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                <li>
                                    <a className="dropdown-item" href="#" data-value="CLEAR" onClick={handleSeatDropdownChange}>
                                        Clear
                                    </a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#" data-value="OPEN" onClick={handleSeatDropdownChange}>
                                        OPEN
                                    </a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#" data-value="SC" onClick={handleSeatDropdownChange}>
                                        SC
                                    </a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#" data-value="ST" onClick={handleSeatDropdownChange}>
                                        ST
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="dropdown">
                        <div className="gender">
                            <p className="text-light">Gender</p>
                            <button
                                className="btn btn-secondary dropdown-toggle custom-dropdown-button col-12"
                                type="button"
                                id="dropdownMenuButton2"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                            >
                                {genderDropdownButtonText}
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton2">
                                <li>
                                    <a className="dropdown-item" href="#" data-value="CLEAR" onClick={handleGenderDropdownChange}>
                                        Clear
                                    </a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#" data-value="Gender-Neutral" onClick={handleGenderDropdownChange}>
                                        Gender-Neutral
                                    </a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#" data-value="Female-only (including Supernumerary)" onClick={handleGenderDropdownChange}>
                                        Female-only (including Supernumerary)
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="dropdown">
                        <div className="display-rounds">
                            <p className="text-light">Display Rounds</p>
                            <button
                                className="btn btn-secondary dropdown-toggle custom-dropdown-button col-12"
                                type="button"
                                id="dropdownMenuButton2"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                            >
                                {roundDropdownButtonText}
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton2">
                                <li>
                                    <a className="dropdown-item" href="#" data-value="All Rounds" onClick={handleRoundDropdownChange}>
                                        All Rounds
                                    </a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#" data-value="Last round only" onClick={handleRoundDropdownChange}>
                                        Last round only
                                    </a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#" data-value="Round 1" onClick={handleRoundDropdownChange}>
                                        Round 1
                                    </a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#" data-value="Round 2" onClick={handleRoundDropdownChange}>
                                        Round 2
                                    </a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#" data-value="Round 3" onClick={handleRoundDropdownChange}>
                                        Round 3
                                    </a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#" data-value="Round 4" onClick={handleRoundDropdownChange}>
                                        Round 4
                                    </a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#" data-value="Round 5" onClick={handleRoundDropdownChange}>
                                        Round 5
                                    </a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#" data-value="Round 6" onClick={handleRoundDropdownChange}>
                                        Round 6
                                    </a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#" data-value="Round 7" onClick={handleRoundDropdownChange}>
                                        Round 7
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

        <div className="table text-light">
            {loading ? (
                <div className="text-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                <CsvTable data={tableData} seatValue={seatValue} genderValue={genderValue} roundValue={roundValue} />
            )}
        </div>
    </div>
);
}

export default Institutes;
