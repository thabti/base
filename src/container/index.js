import React from 'react';
import style from './style.scss';
import Example from '../components/Example';
class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data : {
				text: 'loading'
			}
		};
	}

	componentDidMount() {
		fetch('https://httpbin.org/get').then(res => res.json()).then(data => setTimeout(() => this.setState({ data: data }), 2000));
	}
	render() {
		return (
			<div className={style.main}>
				<h2>Hello World</h2>
				<Example data={this.state.data} />
			</div>
		);
	}
}

export default App;