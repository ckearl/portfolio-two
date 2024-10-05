import React, { useState, useEffect, useRef, useMemo } from "react";
import "../styles/CodeLogoShootingStars.css";

const CodeLogoShootingStars = () => {
	const [stars, setStars] = useState([]);
	const [particles, setParticles] = useState([]);
	const [randomDelay, setRandomDelay] = useState(0);
	const [randomDuration, setRandomDuration] = useState(0);
	const [randomAngle, setRandomAngle] = useState(0);
	const [randomRight, setRandomRight] = useState(0);
	const [randomSize, setRandomSize] = useState(0);

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
			trail: [],
		};
	};

	const createParticle = () => {
		return {
			style: {
				animationDelay: `${randomDelay}s`,
				animationDuration: `${randomDuration}s`,
				right: `${randomRight}%`,
				width: '25px',
				height: 'auto',
			},
		};
	};


	useEffect(() => {
		const interval = setInterval(() => {
			setRandomDelay(Math.random() * 5);
			setRandomDuration(2 + Math.random() * 3);
			setRandomAngle(-15 + Math.random() * 30);
			setRandomRight(Math.random() * 100);
			setRandomSize(Math.random() * 100 + 50);

			setParticles((prevParticles) => {
				const newParticle = createParticle();
				return [...prevParticles, newParticle].slice(-10);
			});
			setStars((prevStars) => {
				const newStar = createStar();
				return [...prevStars, newStar].slice(-10);
			});
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		const trailInterval = setInterval(() => {
			setStars((prevStars) =>
				prevStars.map((star) => {
					const newTrail = [
						...star.trail,
						{
							id: Date.now(),
							top: Math.random() * 100 + "%",
							left: Math.random() * 100 + "%",
						},
					].slice(-15);

					return { ...star, trail: newTrail };
				})
			);
		}, 500);

		return () => clearInterval(trailInterval);
	}, []);

	return (
		<div className="logo-shooting-stars-section" ref={containerRef}>
			<div className="logo-shooting-stars-container">
				{stars.map((star) => (
					<React.Fragment key={star.id}>
						<img
							src={star.logo.src}
							alt={`Falling ${star.logo.name} logo`}
							className="falling-logo"
							style={star.style}
						/>
						{star.trail.map((particle) => (
							<div
								key={particle.id}
								className="trail-particle"
								style={{
									top: particle.top,
									left: particle.left,
								}}
							/>
						))}
					</React.Fragment>
				))}
			</div>
		</div>
	);
};

export default CodeLogoShootingStars;
