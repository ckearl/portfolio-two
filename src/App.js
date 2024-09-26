// src/App.js

import "./styles/App.css";
import "./components/Hero.js";
import Hero from "./components/Hero.js";
import React from "react";

// FEATURES TO ADD NEXT
// https://codepen.io/delroyprithvi/pen/LYyJROR
// https://css-tricks.com/snippets/css/typewriter-effect/

function App() {
	return (
		<React.Fragment>
			<div className="App">
				<Hero />
			</div>
		</React.Fragment>
	);
}

export default App;
