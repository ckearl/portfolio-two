// src/App.js

import React from "react";
import CodeLogoShootingStars from "./components/CodeLogoShootingStars.js";
import Hero from "./components/Hero.js";
import Games from "./components/Games.js";
import "./styles/App.css";

// FEATURES TO ADD NEXT
// https://codepen.io/delroyprithvi/pen/LYyJROR
// https://css-tricks.com/snippets/css/typewriter-effect/

function App() {
	return (
		<React.Fragment>
			<div className="App">
				<Hero />
				<CodeLogoShootingStars />
				<Games />
			</div>
		</React.Fragment>
	);
}

export default App;
