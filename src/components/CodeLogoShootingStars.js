import React, { useState, useEffect, useRef } from "react";
import "../styles/CodeLogoShootingStars.css";

const FILE_NAMES = ["aws.png", "git.png", "js.png", "rust.png"];

const CodeLogoShootingStars = () => {
	const [stars, setStars] = useState([]);
	const containerRef = useRef(null);

	const createStar = () => {
		const randomImage =
			FILE_NAMES[Math.floor(Math.random() * FILE_NAMES.length)];
		const randomDelay = Math.random() * 5; // Random delay up to 5 seconds
		const randomDuration = 2 + Math.random() * 3; // Random duration between 2 and 5 seconds
		const randomAngle = -15 + Math.random() * 30; // Random angle between -15 and 15 degrees
		const randomRight = Math.random() * 100; // Random starting position from right (0% to 100%)

		return {
			id: Date.now(),
			image: randomImage,
			style: {
				animationDelay: `${randomDelay}s`,
				animationDuration: `${randomDuration}s`,
				transform: `rotate(${randomAngle}deg)`,
				right: `${randomRight}%`,
			},
		};
	};

	useEffect(() => {
		const interval = setInterval(() => {
			setStars((prevStars) => [...prevStars, createStar()].slice(-10)); // Keep max 10 stars
		}, 1000); // Create a new star every second

		return () => clearInterval(interval);
	}, []);

	return (
		<div className="logo-shooting-stars-section" ref={containerRef}>
			<div className="logo-shooting-stars-container">
				{stars.map((star) => (
					<img
						key={star.id}
						src={`/path/to/your/images/${star.image}`}
						alt="Falling logo"
						className="falling-logo"
						style={star.style}
					/>
				))}
			</div>
		</div>
	);
};

export default CodeLogoShootingStars;
