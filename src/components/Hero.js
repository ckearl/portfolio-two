import React, { useState, useEffect, useCallback } from "react";
import "../styles/Hero.css";
import "../styles/CustomFont.css";

const customFontStyles = {
	fontFamily: "PressStart2P, sans-serif",
};

// TODO: update personal phrases to be more creative

const PERSONAL_PHRASES = [
	"I'm a software engineer",
	"I'm a pianist",
	"I'm a mario fan",
	"I'm a music producer",
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
	const [text, setText] = useState("");
	const [isDeleting, setIsDeleting] = useState(false);
	const [loopNum, setLoopNum] = useState(0);
	const [typingSpeed, setTypingSpeed] = useState(150);

	const tick = useCallback(() => {
		let i = loopNum % PERSONAL_PHRASES.length;
		let fullText = PERSONAL_PHRASES[i];
		let updatedText = isDeleting
			? fullText.substring(0, text.length - 1)
			: fullText.substring(0, text.length + 1);

		setText(updatedText);

		if (isDeleting) {
			setTypingSpeed(75);
		}

		if (!isDeleting && updatedText === fullText) {
			setIsDeleting(true);
			setTypingSpeed(3000);
		} else if (isDeleting && updatedText === "") {
			setIsDeleting(false);
			setLoopNum(loopNum + 1);
			setTypingSpeed(500);
		} else {
			setTypingSpeed(150);
		}
	}, [isDeleting, loopNum, text]);

	useEffect(() => {
		let ticker = setInterval(() => {
			tick();
		}, typingSpeed);

		return () => {
			clearInterval(ticker);
		};
	}, [text, tick, typingSpeed]);

	return (
		<div className="hero-container">
			<span className="hero-title-text" style={customFontStyles}>
				Hi, my name is Christopher Kearl.
				Welcome to my portfolio!
			</span>
			<div className="hero-typewriter">
				<span>{text}</span>
			</div>
		</div>
	);
};

export default Hero;
