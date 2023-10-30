import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const IITDetails = () => {
    const { iit } = useParams();
    console.log(iit);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:5000/get_iit?iit=${iit}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setData(data);
            console.log(data);  
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [iit]);

const splitString = (str) => {
    const regex = /\([^)]+\)/; // Corrected regex to capture content within the first set of brackets
    const match = str.match(regex);
    if (match) {
        const title = str.substring(0, match.index).trim();
        const text = match[0]; // Use match[0] to capture the entire matched text
        return { title, text };
    } else {
        // If no opening bracket is found, consider the whole string as the title
        return { title: str, text: '' };
    }
};

    

    return (
        <div>
            <h2 className='display-7 text-light m-3'>{iit}</h2>
            {loading ? (
                <div className="text-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                <div className="row mx-5">
                    {data.map((item, index) => {
                        const parsedItem = splitString(item);
                        return (
                            <div className="col-md-6 col-lg-4 col-xl-3" key={index}>
                                <div className="card mb-4 bg-dark m-2">
                                    <div className="card-body text-light">
                                        <h5 className="card-title">{parsedItem.title}</h5>
                                        <p className="card-text">{parsedItem.text}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default IITDetails;
