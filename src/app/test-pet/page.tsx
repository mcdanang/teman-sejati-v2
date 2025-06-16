"use client";

import { useEffect, useRef, useState } from "react";

const Pet = () => {
	const [position, setPosition] = useState(50);
	const [direction, setDirection] = useState(1); // 1: right, -1: left
	const [sprite, setSprite] = useState("/pets/cat/akita_idle_8fps.gif");
	const petRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const walk = () => {
			setSprite("/pets/cat/akita_walk_8fps.gif");
			let step = 0;
			const interval = setInterval(() => {
				step += 1;
				setPosition(prev => {
					let newPos = prev + direction * 5;
					const max = window.innerWidth - 100;

					if (newPos < 0 || newPos > max) {
						setDirection(d => -d);
						newPos = Math.max(0, Math.min(max, newPos));
					}

					return newPos;
				});

				if (step > 60) {
					clearInterval(interval);
					setSprite("/pets/cat/akita_idle_8fps.gif");
				}
			}, 30);
		};

		const walkInterval = setInterval(walk, 5000);
		return () => clearInterval(walkInterval);
	}, [direction]);

	return (
		<div
			ref={petRef}
			className="fixed bottom-0 transition-all duration-100"
			style={{
				left: position,
				transform: `scaleX(${direction})`,
				width: "100px",
				pointerEvents: "none",
				userSelect: "none",
			}}
		>
			<img src={sprite} alt="Pet" />
		</div>
	);
};

export default Pet;
