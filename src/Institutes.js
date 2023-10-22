import CsvTable from './Parse';
const Institutes = () => {
    return (
        <div className="institutes">
            <h2 className="display-7 text-light fw-bold mx-3 mt-3">View All Institutes</h2>
            <p className="text-light ms-3">List of Institutes participating in JoSAA counselling. </p>
            <div className="table text-light">
                <CsvTable/>
            </div>
        </div>
    );
}
 
export default Institutes;