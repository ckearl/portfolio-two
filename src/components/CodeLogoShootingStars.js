import React, { useState, useEffect, useRef, useMemo } from "react";
import "../styles/CodeLogoShootingStars.css";

const CodeLogoShootingStars = () => {
	const [stars, setStars] = useState([]);
	const containerRef = useRef(null);

	const logoImages = useMemo(() => {
		const context = require.context("../img", false, /\.(png|jpe?g|svg)$/);
		return context.keys().map((key) => ({
			name: key.replace("./", "").replace(/\.(png|jpe?g|svg)$/, ""),
			src: context(key),
		}));
	}, []);

	const createStar = () => {
		const randomLogo =
			logoImages[Math.floor(Math.random() * logoImages.length)];
		const randomDelay = Math.random() * 5;
		const randomDuration = 2 + Math.random() * 3;
		const randomAngle = -15 + Math.random() * 30;
		const randomRight = Math.random() * 100;
		const randomSize = Math.random() * 100 + 50;

		return {
			id: Date.now(),
			logo: randomLogo,
			style: {
				animationDelay: `${randomDelay}s`,
				animationDuration: `${randomDuration}s`,
				transform: `rotate(${randomAngle}deg)`,
				right: `${randomRight}%`,
				width: `${randomSize}px`,
				height: "auto",
			},
		};
	};

	useEffect(() => {
		const interval = setInterval(() => {
			setStars((prevStars) => [...prevStars, createStar()].slice(-10));
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	return (
		<div className="logo-shooting-stars-section" ref={containerRef}>
			<div className="logo-shooting-stars-container">
				{stars.map((star) => (
					<img
						key={star.id}
						src={star.logo.src}
						alt={`Falling ${star.logo.name} logo`}
						className="falling-logo"
						style={star.style}
					/>
				))}
			</div>
		</div>
	);
};

export default CodeLogoShootingStars;
