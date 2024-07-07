// App.js 

import { useEffect, useState } from 'react'; 
import Axios from 'axios'; 
import './App.css'; 

function App() { 

	const [ipDetails, setIpDetails] = useState([]); 
	useEffect(() => { 
		Axios.get('https://ipapi.co/json/').then((res) => {
			setIpDetails(res.data);
		});   
	}, []) 

	return ( 
		<> 
			<h1 className="heading">IP Address Finder</h1> 
			<div className="App"> 
        
				<div className="left"> 
					<h4>What is my IPv4 address?</h4> 
					<h1 id="ip">
            {ipDetails.ip}
          </h1> 
					<h4>Approximate location: </h4> 

					<p>{ipDetails.city}, {ipDetails.region}, 
						{ipDetails.country_name}.</p> 

					<h4>Internet Service Provider(ISP):</h4> 

					<p>{ipDetails.org}</p> 

				</div>
			</div> 
		</> 
	); 
} 

export default App;
