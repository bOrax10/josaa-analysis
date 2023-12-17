//import './reset.css'
import Navbar from './Navbar';
import Home from './Home';
import Branches from './Branches';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import InstituteWiseCutoff from './InstituteWiseCutoff';
import ViewInstitutes from './ViewInstitutes';
import IITDetails from './IITDetails';
import BranchDetails from './BranchDetails';
import BranchWiseCutoff from './BranchWiseCutoff';

function App() {
  return (
    <Router>
      	<div className="App">
	        <Navbar/>
        	<div className="content">
	          	<Switch>
	            	<Route exact path="/">
	              		<Home/>
            		</Route>
            		<Route exact path="/branches">
		              	<Branches/>
            		</Route>
            		<Route exact path="/institute-wise-cutoff">
	              		<InstituteWiseCutoff/>
	            	</Route>
					<Route exact path="/institutes">
	              		<ViewInstitutes/>
	            	</Route>
					<Route path="/institutes/:iit">
              			{/* Nested route for IIT details */}
              			<Route exact path="/institutes/:iit" component={IITDetails} />
						{/* Nested route for branch details */}
						<Route exact path="/institutes/:iit/:item" component={BranchDetails} />
            		</Route>
					<Route exact path="/branch-wise-cutoff">
	              		<BranchWiseCutoff/>
	            	</Route>
          		</Switch>
        	</div>
      	</div>
    </Router>
  );	
}

export default App;
