import React, { useEffect } from "react";
import "../styles/Hero.css";
import "../styles/CustomFont.css";

const customFontStyles = {
	fontFamily: "PressStart2P, sans-serif",
};

const PERSONAL_PHRASES = [
	"I'm a software engineer",
	"I'm a pianist",
	"I'm a mario fan",
	"I'm a music producer",
	"I'm a JavaScript truthiness hater",
	"I'm a JavaScript truthiness hater",
	"I'm a brother",
	"I'm a son",
	"I'm a friend",
	"I'm an uncle",
	"I'm a nephew",
	"I'm an artist",
	"I'm a creator",
	"I'm a problem solver",
	"I'm a vinyl collector",
];

const Hero = () => {
	useEffect(() => {
		let currentPhraseIndex = 0;
		const phraseElement = document.querySelector(".hero-typewriter span");

		const updatePhrase = () => {
			phraseElement.innerHTML = PERSONAL_PHRASES[currentPhraseIndex];
			currentPhraseIndex = (currentPhraseIndex + 1) % PERSONAL_PHRASES.length;
		};

		updatePhrase();
		setInterval(updatePhrase, 15000);
	});

	return (
		<div className="hero-container">
			<span className="hero-title-text" style={customFontStyles}>
				Hi, I'm still figuring this out
			</span>
			<div className="hero-typewriter">
				<span className="">I'm a software engineer</span>
			</div>
		</div>
	);
};

export default Hero;
