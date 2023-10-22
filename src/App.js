//import './reset.css'
import Navbar from './Navbar';
import Home from './Home';
import Branches from './Branches';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Institutes from './Institutes';

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
            		<Route exact path="/institutes">
	              		<Institutes/>
	            	</Route>	
          		</Switch>
        	</div>
      	</div>
    </Router>
  );
}

export default App;
