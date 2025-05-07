"use client";

import React, { useEffect, useRef, useState } from "react";
import { Engine, Render, World, Bodies, Body, Runner } from "matter-js";

type Point = { x: number; y: number };

const initialLogos = [...Array(20)].map((_, i) => `${i + 1}`);
let logoNumbers: string[] = [...initialLogos];
const loadedImages: Record<string, HTMLImageElement> = {};

export default function BallCanvas() {
	const backgroundCanvasRef = useRef<HTMLCanvasElement | null>(null); // Matter.js canvas
	const overlayCanvasRef = useRef<HTMLCanvasElement | null>(null); // Drawing canvas
	const engineRef = useRef(Engine.create());
	const [start, setStart] = useState<Point | null>(null);
	const [currentMouse, setCurrentMouse] = useState<Point | null>(null);
	const [isDragging, setIsDragging] = useState(false);

	useEffect(() => {
		initialLogos.forEach((logoId) => {
			const img = new Image();
			img.src = `/logo/logo-${logoId}.png`;
			loadedImages[logoId] = img;
		});
	}, []);

	const bodyToLogo = useRef(new Map<Matter.Body, string>());

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

		const leftWall = Bodies.rectangle(-25, height / 2, 50, height, {
			isStatic: true,
			restitution: 0.2,
		});
		const rightWall = Bodies.rectangle(width + 25, height / 2, 50, height, {
			isStatic: true,
			restitution: 0.2,
		});

		World.add(engine.world, [floor, leftWall, rightWall]);

		const runner = Runner.create();
		Runner.run(runner, engine);

		const ctx = canvas.getContext("2d");
		const image = new Image();

		if (logoNumbers.length === 0) {
			logoNumbers = [...Array(20)].map((_, i) => `${i + 1}`);
		}

		const index = Math.floor(Math.random() * logoNumbers.length);
		const selectedLogo = logoNumbers[index];
		logoNumbers.splice(index, 1);
		image.src = `/logo/logo-${selectedLogo}.png`;

		image.onload = () => {
			const aspectRatio = image.width / image.height;
			const baseHeight = 70;
			const baseWidth = baseHeight * aspectRatio;

			const draw = () => {
				if (!ctx) return;
				ctx.clearRect(0, 0, width, height);

				engine.world.bodies.forEach((body) => {
					if (body.circleRadius) {
						const logoId = bodyToLogo.current.get(body);
						const image = logoId ? loadedImages[logoId] : null;
						if (!image || !image.complete) return;

						const x = body.position.x;
						const y = body.position.y;

						const aspectRatio = image.width / image.height;
						const baseHeight = 70;
						const baseWidth = baseHeight * aspectRatio;

						ctx.save();
						ctx.translate(x, y);
						ctx.rotate(body.angle);
						ctx.drawImage(
							image,
							-baseWidth / 2,
							-baseHeight / 2,
							baseWidth,
							baseHeight
						);
						ctx.restore();
					}
				});

				requestAnimationFrame(draw);
			};

			draw();
		};

		return () => {
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
				let vx = velocity.x * 60;
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

	const getEventPosition = (
		e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
	): Point | null => {
		const rect = overlayCanvasRef.current?.getBoundingClientRect();
		if (!rect) return null;

		if ("touches" in e) {
			const touch = e.touches[0];
			return { x: touch.clientX - rect.left, y: touch.clientY - rect.top };
		} else {
			return { x: e.clientX - rect.left, y: e.clientY - rect.top };
		}
	};

	const handleDown = (
		e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
	) => {
		const pos = getEventPosition(e);
		if (!pos) return;
		setStart(pos);
		setCurrentMouse(pos);
		setIsDragging(true);
	};

	const handleMove = (
		e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
	) => {
		if (!isDragging) return;
		const pos = getEventPosition(e);
		if (!pos) return;
		setCurrentMouse(pos);
	};

	const handleUp = (
		e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
	) => {
		setIsDragging(false);
		const pos = getEventPosition(e);
		if (!start || !pos) return;

		const dx = start.x - pos.x;
		const dy = start.y - pos.y;
		const power = Math.sqrt(dx * dx + dy * dy) * 0.05;
		const angle = Math.atan2(dy, dx);

		const velocity = {
			x: power * Math.cos(angle),
			y: power * Math.sin(angle),
		};

		if (logoNumbers.length === 0) {
			logoNumbers = [...initialLogos];
		}
		const index = Math.floor(Math.random() * logoNumbers.length);
		const selectedLogo = logoNumbers[index];
		logoNumbers.splice(index, 1);

		const ball = Bodies.circle(start.x, start.y, 35, {
			restitution: 0.6,
			friction: 0.05,
			density: 0.01,
			render: { visible: false },
		});

		Body.setVelocity(ball, velocity);
		const spin = 0.0001;
		Body.setAngularVelocity(ball, spin);
		bodyToLogo.current.set(ball, selectedLogo);
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
				onMouseDown={handleDown}
				onMouseMove={handleMove}
				onMouseUp={handleUp}
				onTouchStart={handleDown}
				onTouchMove={handleMove}
				onTouchEnd={handleUp}
				style={{
					width: "100vw",
					height: "100vh",
					position: "fixed",
					top: 0,
					left: 0,
					zIndex: 2,
					background: "transparent",
					pointerEvents: "auto",
					touchAction: "none",
				}}
			/>
		</>
	);
}
