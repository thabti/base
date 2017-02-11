import React from 'react';
import style from './style.scss';

class App extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div className={style.main}>
				<h2>Hello World</h2>
			</div>
		);
	}
}

export default App;