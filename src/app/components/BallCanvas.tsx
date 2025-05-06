import React, { useRef, useEffect, useState } from "react";

type Point = { x: number; y: number };

export default function BallCanvas() {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [start, setStart] = useState<Point | null>(null);
	const [launch, setLaunch] = useState<{
		velocity: Point;
		position: Point;
	} | null>(null);
	const [startTime, setStartTime] = useState<number | null>(null);
	const [isDragging, setIsDragging] = useState(false);
	const [currentMouse, setCurrentMouse] = useState<Point | null>(null);

	const gravity = 500; // px/s^2

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const dpr = window.devicePixelRatio || 1;

		const resizeCanvas = () => {
			canvas.width = window.innerWidth * dpr;
			canvas.height = window.innerHeight * dpr;
			canvas.style.width = "100vw";
			canvas.style.height = "100vh";

			const ctx = canvas.getContext("2d");
			if (ctx) ctx.scale(dpr, dpr);
		};

		resizeCanvas();
		window.addEventListener("resize", resizeCanvas);

		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		let animationFrame: number;

		const draw = (timestamp: number) => {
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			if (launch && startTime !== null) {
				const t = (timestamp - startTime) / 1000;
				const { velocity, position } = launch;

				const x = position.x + velocity.x * t;
				const y = position.y + velocity.y * t + 0.5 * gravity * t * t;

				if (y < canvas.height) {
					ctx.beginPath();
					ctx.arc(x, y, 10, 0, Math.PI * 2);
					ctx.fill();
				}
			}

			if (isDragging && start && currentMouse) {
				ctx.beginPath();
				ctx.moveTo(start.x, start.y);
				ctx.lineTo(currentMouse.x, currentMouse.y);
				ctx.strokeStyle = "red";
				ctx.lineWidth = 2;
				ctx.stroke();
			}

			animationFrame = requestAnimationFrame(draw);
		};

		animationFrame = requestAnimationFrame(draw);

		return () => {
			window.removeEventListener("resize", resizeCanvas);
			cancelAnimationFrame(animationFrame);
		};
	}, [launch, startTime]);

	const handleMouseDown = (e: React.MouseEvent) => {
		const rect = canvasRef.current?.getBoundingClientRect();
		if (!rect) return;
		const startPoint = { x: e.clientX - rect.left, y: e.clientY - rect.top };
		setStart(startPoint);
		setCurrentMouse(startPoint);
		setIsDragging(true);
	};

	const handleMouseMove = (e: React.MouseEvent) => {
		if (!isDragging) return;
		const rect = canvasRef.current?.getBoundingClientRect();
		if (!rect) return;
		setCurrentMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top });
	};

	const handleMouseUp = (e: React.MouseEvent) => {
		setIsDragging(false);
		const rect = canvasRef.current?.getBoundingClientRect();
		if (!rect || !start) return;
		const end = { x: e.clientX - rect.left, y: e.clientY - rect.top };

		const dx = start.x - end.x;
		const dy = start.y - end.y;
		const power = Math.sqrt(dx * dx + dy * dy) * 4;
		const angle = Math.atan2(dy, dx);

		const v0x = power * Math.cos(angle);
		const v0y = power * Math.sin(angle);

		setLaunch({
			velocity: { x: v0x, y: v0y },
			position: { x: start.x, y: start.y },
		});
		setStartTime(performance.now());
	};

	return (
		<canvas
			ref={canvasRef}
			style={{
				width: "100vw",
				height: "100vh",
				position: "fixed",
				top: 0,
				left: 0,
			}}
			onMouseDown={handleMouseDown}
			onMouseMove={handleMouseMove}
			onMouseUp={handleMouseUp}
		/>
	);
}
