import React, { useState, useEffect } from 'react';

const AnalyzeRoundWiseTrends = () => {
    const [instituteValue, setInstituteValue] = useState('');
    const [courses, setCourses] = useState([]);
    const [programs, setPrograms] = useState([]);
    const [CourseValue, setCourseValue] = useState('');
    const [programValue, setProgramValue] = useState('');
    const [seatValue, setSeatValue] = useState('OPEN');
    const [genderValue, setGenderValue] = useState('Gender-Neutral');
    const [seatDropdownButtonText, setSeatDropdownButtonText] = useState(seatValue);
    const [genderDropdownButtonText, setGenderDropdownButtonText] = useState(genderValue);
    const [programDropdownButtonText, setProgramDropdownButtonText] = useState(programValue);
    const [instituteDropdownButtonText, setInstituteDropdownButtonText] = useState('Select');
    const [CourseDropdownButtonText, setCourseDropdownButtonText] = useState('Select');

    const iits=['Clear','IIT Bhubaneswar', 'IIT Bombay', 'IIT Mandi', 'IIT Delhi', 'IIT Indore', 'IIT Kharagpur', 'IIT Hyderabad', 'IIT Jodhpur', 'IIT Kanpur', 'IIT Madras', 'IIT Gandhinagar', 'IIT Patna', 'IIT Roorkee', 'IIT Ropar', 'IIT (BHU) Varanasi', 'IIT Guwahati', 'IIT Bhilai', 'IIT Goa', 'IIT Palakkad', 'IIT Tirupati', 'IIT Jammu', 'IIT Dharwad', 'IIT (ISM) Dhanbad']
    const seatTypes=['OPEN', 'OBC-NCL', 'SC', 'ST', 'OPEN (PwD)', 'OBC-NCL (PwD)',
    'SC (PwD)', 'ST (PwD)', 'EWS', 'EWS (PwD)'];

    useEffect(() => {
        // Fetch courses based on the selected institute
        if (instituteValue !== '') {
            // Replace this with your actual API endpoint
            fetch(`http://localhost:5000/get_courses_from_institute?institute=${instituteValue}`)
                .then((response) => response.json())
                .then((data) => {
                    setCourses(data);
                    setCourseValue('');
                    setProgramDropdownButtonText('Select');
                    setCourseDropdownButtonText('Select');
                })
                .catch((error) => {
                    console.error('Error fetching courses:', error);
                });
        }
    }, [instituteValue]);

    useEffect(() => {
        // Fetch programs based on the selected course
        if (CourseValue !== '') {
            // Replace this with your actual data fetching logic (API call, etc.)
            fetch(`http://localhost:5000/get_programs_from_course?institute=${instituteValue}&course=${CourseValue}`)
                .then((response) => response.json())
                .then((data) => {
                    setPrograms(data);
                    setProgramValue('');
                })
                .catch((error) => {
                    console.error('Error fetching programs:', error);
                });
        }
    }, [CourseValue]);

    const handleInstituteDropdownChange = (event) => {
        const value = event.target.getAttribute('data-value');
        console.log(value);
        setCourseValue(''); // Reset the selected course when the institute changes
        setProgramValue(''); // Reset the selected program when the institute changes
        setCourseDropdownButtonText('Select'); // Reset the course dropdown text
        setProgramDropdownButtonText('Select'); // Reset the program dropdown text
        setCourses([]); // Clear the courses data
        setPrograms([]); // Clear the programs data
        if (value !== 'Clear') {
            setInstituteValue(value);
            setInstituteDropdownButtonText(value);

        } else {
            setInstituteValue('');
            setInstituteDropdownButtonText('Select');
        }
    };
    

    const handleCourseDropdownChange = (event) => {
        const value = event.target.getAttribute('data-value');
        setCourseValue(value);
        setCourseDropdownButtonText(value);
        setProgramValue('');
        setProgramDropdownButtonText('Select');
    };

    const handleProgramDropdownChange = (event) => {
        const value = event.target.getAttribute('data-value');
        setProgramValue(value);
        setProgramDropdownButtonText(value);
    };

    const handleSeatDropdownChange = (event) => {
        const value = event.target.getAttribute('data-value');
        setSeatValue(value);
        setSeatDropdownButtonText(value);
    };

    const handleGenderDropdownChange = (event) => {
        const value = event.target.getAttribute('data-value');
        setGenderValue(value);
        setGenderDropdownButtonText(value);
    };

    return ( 
        <div>
            <h2 className="display-7 text-light fw-bold mx-3 mt-3">Analyse Round-wise Cut-off Trends</h2>
            <p className="text-light ms-3 me-3">Compare the cut-offs of a course in various rounds over 7 years in the JoSAA seat allocation process. This helps understand the likely range of changes to the closing ranks throught the counselling process. </p>

            <div className="row m-4">
                <div className="col-md-4">
                    <div className="dropdown">
                        <div className="institute">
                            <p className="text-light">Institute</p>
                            <button
                                className="btn btn-secondary dropdown-toggle custom-dropdown-button col-12"
                                type="button"
                                id="dropdownMenuButton2"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                            >
                                {instituteDropdownButtonText}
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton2" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                                {iits.map((iit, index) => (
                                    <li>
                                        <a className="dropdown-item" key={index} data-value={iit} href="#" onClick={handleInstituteDropdownChange}>
                                            {iit}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 mt-3 mt-md-0" style={{ visibility: instituteValue!='' ? 'visible' : 'hidden' }}>
                    <div className="dropdown">
                        <div className="seat-type">
                            <p className="text-light">Course</p>
                            <button
                                className="btn btn-secondary dropdown-toggle custom-dropdown-button col-12"
                                type="button"
                                id="dropdownMenuButton1"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                            >
                                {CourseDropdownButtonText}
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                {courses.map((course, index) => (
                                    <li key={index}>
                                        <a className="dropdown-item" href="#" data-value={course} onClick={handleCourseDropdownChange}>
                                            {course}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 mt-3 mt-md-0" style={{ visibility: CourseValue!='' ? 'visible' : 'hidden' }}>
                    <div className="dropdown">
                        <div className="program-type">
                            <p className="text-light">Program</p>
                            <button
                                className="btn btn-secondary dropdown-toggle custom-dropdown-button col-12"
                                type="button"
                                id="dropdownMenuButton1"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                            >
                                {programDropdownButtonText}
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                {programs.map((program, index) => (
                                    <li key={index}>
                                        <a className="dropdown-item" href="#" data-value={program} onClick={handleProgramDropdownChange}>
                                            {program}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>                                    
                
                <div className="col-md-6 mt-3">
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
                                {seatTypes.map((seat,index) => (
                                    <li>
                                        <a className="dropdown-item" href="#" key={index} data-value={seat} onClick={handleSeatDropdownChange}>
                                            {seat}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>                                    

                <div className="col-md-6 mt-3">
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
    );
}
 
export default AnalyzeRoundWiseTrends;