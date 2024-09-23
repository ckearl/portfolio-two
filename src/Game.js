// src/Game.js

import React, { useState, useEffect, useCallback } from "react";

const GRID_SIZE = 9;
const CIRCLE_RADIUS = 25; // 50px diameter

const Game = () => {
	const [position, setPosition] = useState({ x: 0, y: 0 });
	const [gridOffset, setGridOffset] = useState({ x: 0, y: 0 });
	const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });

	useEffect(() => {
		const updateScreenSize = () => {
			setScreenSize({ width: window.innerWidth, height: window.innerHeight });
		};
		updateScreenSize();
		window.addEventListener("resize", updateScreenSize);
		return () => window.removeEventListener("resize", updateScreenSize);
	}, []);

	const moveCircle = useCallback(
		(dx, dy) => {
			setPosition((prev) => {
				const newX = prev.x + dx;
				const newY = prev.y + dy;
				const halfWidth = screenSize.width / 2;
				const halfHeight = screenSize.height / 2;

				// Update grid offset if circle reaches screen edge
				setGridOffset((prevOffset) => ({
					x: Math.max(
						Math.min(prevOffset.x - dx, halfWidth),
						-halfWidth * (GRID_SIZE - 1)
					),
					y: Math.max(
						Math.min(prevOffset.y - dy, halfHeight),
						-halfHeight * (GRID_SIZE - 1)
					),
				}));

				// Keep circle within bounds
				return {
					x: Math.max(
						Math.min(newX, halfWidth - CIRCLE_RADIUS),
						-halfWidth + CIRCLE_RADIUS
					),
					y: Math.max(
						Math.min(newY, halfHeight - CIRCLE_RADIUS),
						-halfHeight + CIRCLE_RADIUS
					),
				};
			});
		},
		[screenSize]
	);

	useEffect(() => {
		const handleKeyDown = (e) => {
			const step = 10;
			switch (e.key) {
				case "ArrowUp":
				case "w":
					moveCircle(0, -step);
					break;
				case "ArrowDown":
				case "s":
					moveCircle(0, step);
					break;
				case "ArrowLeft":
				case "a":
					moveCircle(-step, 0);
					break;
				case "ArrowRight":
				case "d":
					moveCircle(step, 0);
					break;
				default:
					break;
			}
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [moveCircle]);

	const gridSquares = Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, i) => {
		const x = i % GRID_SIZE;
		const y = Math.floor(i / GRID_SIZE);
		const hue = ((i * 360) / (GRID_SIZE * GRID_SIZE)) % 360;
		return (
			<div
				key={i}
				style={{
					position: "absolute",
					left: `${x * 100}%`,
					top: `${y * 100}%`,
					width: "100%",
					height: "100%",
					backgroundColor: `hsl(${hue}, 70%, 80%)`,
					border: "1px solid #000",
				}}
			/>
		);
	});

	return (
		<div
			style={{
				width: "100vw",
				height: "100vh",
				overflow: "hidden",
				position: "relative",
			}}
		>
			<div
				style={{
					position: "absolute",
					width: `${GRID_SIZE * 100}%`,
					height: `${GRID_SIZE * 100}%`,
					transform: `translate(${gridOffset.x}px, ${gridOffset.y}px)`,
				}}
			>
				{gridSquares}
			</div>
			<div
				style={{
					position: "absolute",
					width: CIRCLE_RADIUS * 2,
					height: CIRCLE_RADIUS * 2,
					borderRadius: "50%",
					backgroundColor: "red",
					left: "50%",
					top: "50%",
					transform: `translate(${position.x - CIRCLE_RADIUS}px, ${
						position.y - CIRCLE_RADIUS
					}px)`,
				}}
			/>
		</div>
	);
};

export default Game;
