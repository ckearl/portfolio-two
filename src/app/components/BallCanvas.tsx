"use client";

import React, { useEffect, useRef, useState } from "react";
import { Engine, Render, World, Bodies, Body, Runner } from "matter-js";

type Point = { x: number; y: number };

export default function BallCanvas() {
	const backgroundCanvasRef = useRef<HTMLCanvasElement | null>(null); // Matter.js canvas
	const overlayCanvasRef = useRef<HTMLCanvasElement | null>(null); // Drawing canvas
	const engineRef = useRef(Engine.create());
	const [start, setStart] = useState<Point | null>(null);
	const [currentMouse, setCurrentMouse] = useState<Point | null>(null);
	const [isDragging, setIsDragging] = useState(false);

	useEffect(() => {
		const canvas = backgroundCanvasRef.current;
		const engine = engineRef.current;
		if (!canvas) return;

		const width = window.innerWidth;
		const height = window.innerHeight;
		canvas.width = width;
		canvas.height = height;

		const render = Render.create({
			canvas,
			engine,
			options: {
				width,
				height,
				background: "transparent",
				wireframes: false,
			},
		});

		const floor = Bodies.rectangle(width / 2, height + 25, width, 50, {
			isStatic: true,
			restitution: 0.2,
		});

		World.add(engine.world, floor);

		const leftWall = Bodies.rectangle(-25, height / 2, 50, height, {
			isStatic: true,
			restitution: 0.2,
		});
		const rightWall = Bodies.rectangle(width + 25, height / 2, 50, height, {
			isStatic: true,
			restitution: 0.2,
		});

		World.add(engine.world, [leftWall, rightWall]);

		const runner = Runner.create();
		Render.run(render);
		Runner.run(runner, engine);

		return () => {
			Render.stop(render);
			Runner.stop(runner);
			World.clear(engine.world, false);
			Engine.clear(engine);
		};
	}, []);

	useEffect(() => {
		const canvas = overlayCanvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		const width = window.innerWidth;
		const height = window.innerHeight;
		canvas.width = width;
		canvas.height = height;

		let raf: number;

		const draw = () => {
			const width = window.innerWidth;
			const height = window.innerHeight;

			ctx.clearRect(0, 0, width, height);

			if (isDragging && start && currentMouse) {
				// Calculate launch vector
				const dx = start.x - currentMouse.x;
				const dy = start.y - currentMouse.y;
				const power = Math.sqrt(dx * dx + dy * dy) * 0.005;
				const angle = Math.atan2(dy, dx);
				const velocity = {
					x: power * Math.cos(angle),
					y: power * Math.sin(angle),
				};

				// Simulate arc
				const g = 0.98 * 120; // gravity approximation in px/s^2
				let x = start.x;
				let y = start.y;
				let vx = velocity.x * 60; // convert to px/frame
				let vy = velocity.y * 60;

				ctx.fillStyle = "rgba(0,0,0,0.3)";

				const step = 0.1;

				ctx.fillStyle = "rgba(0,0,0,0.3)";
				for (let i = 0; i < 50; i++) {
					x += vx * step;
					y += vy * step;
					vy += g * 0.00725;

					if (y > height) break;

					ctx.beginPath();
					ctx.arc(x, y, 2, 0, Math.PI * 2);
					ctx.fill();
				}
			}

			raf = requestAnimationFrame(draw);
		};

		draw();
		return () => cancelAnimationFrame(raf);
	}, [isDragging, start, currentMouse]);

	const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
		const rect = overlayCanvasRef.current?.getBoundingClientRect();
		if (!rect) return;
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;
		setStart({ x, y });
		setCurrentMouse({ x, y });
		setIsDragging(true);
	};

	const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
		if (!isDragging) return;
		const rect = overlayCanvasRef.current?.getBoundingClientRect();
		if (!rect) return;
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;
		setCurrentMouse({ x, y });
	};

	const handleMouseUp = (e: React.MouseEvent<HTMLCanvasElement>) => {
		setIsDragging(false);
		const rect = overlayCanvasRef.current?.getBoundingClientRect();
		if (!rect || !start) return;
		const end = { x: e.clientX - rect.left, y: e.clientY - rect.top };

		const dx = start.x - end.x;
		const dy = start.y - end.y;
		const power = Math.sqrt(dx * dx + dy * dy) * 0.05;
		const angle = Math.atan2(dy, dx);

		const velocity = {
			x: power * Math.cos(angle),
			y: power * Math.sin(angle),
		};

		const ball = Bodies.circle(start.x, start.y, 35, {
			restitution: 0.6,
			friction: 0.05,
			density: 0.01,
		});

		Body.setVelocity(ball, velocity);
		ball.render.fillStyle = "#33333380";
		World.add(engineRef.current.world, ball);
	};

	return (
		<>
			<canvas
				ref={backgroundCanvasRef}
				style={{
					width: "100vw",
					height: "100vh",
					position: "fixed",
					top: 0,
					left: 0,
					zIndex: 1,
					background: "transparent",
				}}
			/>

			<canvas
				ref={overlayCanvasRef}
				onMouseDown={handleMouseDown}
				onMouseMove={handleMouseMove}
				onMouseUp={handleMouseUp}
				style={{
					width: "100vw",
					height: "100vh",
					position: "fixed",
					top: 0,
					left: 0,
					zIndex: 2,
					background: "transparent", // for good measure
					pointerEvents: "auto", // allow mouse events
				}}
			/>
		</>
	);
}
