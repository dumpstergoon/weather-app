import { Component } from 'react';
import View from './View.js';

class Weather {
	constructor(condition, temperature, timeOfDay, icon) {
		condition = condition.toLowerCase();
		if (typeof timeOfDay == "number")
			timeOfDay = timeOfDay === 1 ? "day" : "night";

		Object.assign(this, {
			condition,
			temperature,
			timeOfDay,
			icon
		});
	}
}

class App extends Component {
	static API = "http://api.weatherapi.com";
	static ENDPOINT = "/v1/current.json";
	static KEY = "4a3cf7a270404081bb2171211222303";

	state = {
		query: "",
		weather: null,
		error: false,
	};

	render() {
		return (
			<View
				value={this.state.query}
				weather={this.state.weather}
				error={this.state.error}
				onChange={e => this.onChange(e)}
				onClick={() => this.citySearch()}
			/>
		);
	}

	citySearch() {
		const { query } = this.state;

		let req = new XMLHttpRequest();
		req.addEventListener("load", () => {

			if (req.response.error) {
				// Do something else...
				this.setState({
					query: "",
					weather: null,
					error: true,
				});

				return;
			}

			const {
				temp_c: temperature,
				is_day: timeOfDay,
				condition: {
					text: condition,
					icon
				}
			} = req.response.current;

			this.setState({
				error: false,
				weather: new Weather(
					condition,
					temperature,
					timeOfDay,
					icon
				)
			});
		});

		req.open("GET", `${App.API}${App.ENDPOINT}?key=${App.KEY}&q=${query}`);
		req.responseType = "json";
		req.send();
	}

	// ***********
	onChange({ target: { value: query } }) {
		this.setState({
			query,
		});
	}
}

export default App;
