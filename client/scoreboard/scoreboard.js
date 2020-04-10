const loadDomosFromServer = (csrf) => {
	sendAjax('GET', '/getDomosByAge', null, (data) => {
		ReactDOM.render(
			<DomoList domos={data.domos} csrf={csrf} />,
			document.querySelector("#domos")
		);
	});
};

const DomoList = (props) => {
	if(props.domos.length === 0) {
		return (
			<div className="domoList">
				<h3 className="emptyDomo">No Domos Yet!</h3>
			</div>
		);
	}
	
	const domoNodes = props.domos.map((domo) => {
		return (
			<div key={domo._id} className="domo">
				<img src="/assets/img/domoface.jpeg" alt="domo face" className="domoFace" />
				<h3 className="domoName"> Name: {domo.name} </h3>
				<h3 className="domoAge"> Age: {domo.age} </h3>
				<h3 className="domoScore"> Score: {domo.score} </h3>
			</div>
		);
	});
	
	return (
		<div className="domoList">
			{domoNodes}
			<input type="hidden" name="_csrf" value={props.csrf} />
		</div>
	);
};

const setup = (csrf) => {	
	ReactDOM.render(
		<DomoList domos={[]} csrf={csrf} />,
		document.querySelector("#domos")
	);
	
	loadDomosFromServer(csrf);
};

const getToken = () => {
	sendAjax('GET', '/getToken', null, (result) => {
		setup(result.csrfToken);
	});
};

$(document).ready(function() {
	getToken();
});