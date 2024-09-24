// src/App.js

import './styles/App.css';
import './styles/CustomFont.css'

const customFontStyles = {
	fontFamily: "CustomFont, sans-serif",
};

// FEATURES TO ADD NEXT
// https://codepen.io/delroyprithvi/pen/LYyJROR
// https://css-tricks.com/snippets/css/typewriter-effect/

function App() {
  return (
		<div className="App" style={customFontStyles}>
      Hi, I'm still figuring this out.
			{/* <Game /> */}
		</div>
	);
}

export default App;
