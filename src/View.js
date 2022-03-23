export default function View({
	value,
	onChange,
	onClick,
	weather,
	location,
	error
}) {
	return (
		<>
			<h1>Weather App</h1>
			<h2>{value}</h2>
			<input
				onChange={onChange}
				type="text"
				placeholder="Type name of city" />
			<button onClick={onClick}>GO!</button>
			{
				location && (
					<p>
						{location.name}<br />
						{location.region}, {location.country}
					</p>
				)
			}
			{
				weather && (
					<div className="weather">
						<div>
							<img src={weather.icon} alt="" />
						</div>
						<p>
							<span class="condition">
								{weather.timeOfDay === "day" ? "Today" : "Tonight"} is {weather.condition}
							</span>
							<span class="temperature">
								{weather.temperature}&deg;C
							</span>
						</p>
					</div>
				)
			}
			{
				error && (
					<p className="error">
						No match found. Try again.
					</p>
				)
			}
		</>
	);
}
