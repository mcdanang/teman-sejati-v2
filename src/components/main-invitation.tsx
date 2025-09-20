import { designs } from "@/lib/designs";
import { InvitationWithModules, ModuleData } from "@/types";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export function MainInvitation({
	activeInvitation,
	editMode = false,
}: {
	activeInvitation: InvitationWithModules | null;
	editMode?: boolean;
}) {
	const [isPlaying, setIsPlaying] = useState(false);
	const [hasClicked, setHasClicked] = useState(false);

	// const [showPlayPrompt, setShowPlayPrompt] = useState(false); // Commented out since prompt is disabled
	const audioRef = useRef<HTMLAudioElement | null>(null);

	// Background music functionality
	useEffect(() => {
		if (!activeInvitation?.background_music) return;

		const audio = new Audio(activeInvitation.background_music);
		audio.loop = true;
		audio.volume = 0.3; // Set volume to 30%
		audio.autoplay = true;
		audio.preload = "auto";
		audioRef.current = audio;

		// Set up audio event listeners
		audio.addEventListener("canplaythrough", () => {});

		audio.addEventListener("playing", () => {
			setIsPlaying(true);
			// setShowPlayPrompt(false); // Commented out since prompt is disabled
		});

		audio.addEventListener("pause", () => {
			setIsPlaying(false);
		});

		audio.addEventListener("error", e => {
			console.error("Audio error:", e);
		});

		// Auto-play on first click (if not in edit mode)
		if (!editMode && !hasClicked) {
			const handleFirstClick = () => {
				if (!hasClicked) {
					setHasClicked(true);

					const playPromise = audio.play();
					if (playPromise !== undefined) {
						playPromise
							.then(() => {
								setIsPlaying(true);
							})
							.catch(error => {
								console.error("Auto-play still prevented:", error);
								// User can still use the play button
							});
					}
				}
			};

			// Add click listener to the document
			setTimeout(() => {
				document.addEventListener("click", handleFirstClick, { once: true });
			}, 100); // Small delay to ensure DOM is ready
		}

		return () => {
			if (audio) {
				audio.pause();
				audio.src = "";
			}
		};
	}, [activeInvitation?.background_music, editMode, hasClicked]);

	if (!activeInvitation) {
		return (
			<div className="flex items-center justify-center h-full">
				<p className="text-lg text-muted-foreground">Tidak ada undangan yang ditemukan.</p>
			</div>
		);
	}

	activeInvitation.Modules.sort((a, b) => a.order - b.order);

	const modules = activeInvitation.Modules;
	const design = designs[activeInvitation.design];

	console.log("design", design);

	console.log("modules", modules);

	// Validate the background image URL
	const isValidImageUrl = (url: string) => {
		if (!url || url.length < 5) return false;
		return url.startsWith("http") || url.startsWith("/");
	};

	const backgroundImageUrl =
		activeInvitation.desktop_bg && isValidImageUrl(activeInvitation.desktop_bg)
			? activeInvitation.desktop_bg
			: "/designs/bg.webp";

	const togglePlay = () => {
		if (!audioRef.current) return;

		if (isPlaying) {
			audioRef.current.pause();
			setIsPlaying(false);
		} else {
			audioRef.current.play().catch(error => {
				console.error("Error playing audio:", error);
			});
			setIsPlaying(true);
		}
	};

	return (
		<div
			className="relative min-h-screen w-full"
			style={{
				backgroundImage: `url(${backgroundImageUrl})`,
				backgroundSize: "cover",
				backgroundPosition: "center",
				backgroundRepeat: "no-repeat",
				backgroundAttachment: "fixed",
			}}
		>
			{/* Background Music Controls */}
			{activeInvitation.background_music && (
				<div className="fixed bottom-1 ml-2 z-50">
					<button
						type="button"
						onClick={togglePlay}
						className="p-0 border-none bg-transparent cursor-pointer relative"
					>
						<Image
							src="/images/vinyl.png"
							alt="Vinyl Record"
							width={48}
							height={48}
							className={`h-12 w-12 transition-transform duration-1000 hover:cursor-pointer ${
								isPlaying ? "animate-spin" : ""
							}`}
						/>
						{/* Play prompt when auto-play is blocked */}
						{/* {showPlayPrompt && (
							<div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap shadow-lg">
								🎵 Tap anywhere to play music
								<div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-black/80"></div>
							</div>
						)} */}
					</button>
				</div>
			)}

			<div
				className="relative max-w-md mx-auto min-h-screen bg-white/95 shadow-lg backdrop-blur-sm snap-y snap-mandatory h-screen overflow-y-auto pb-20"
				style={{
					paddingBottom: "max(5rem, env(safe-area-inset-bottom))",
				}}
			>
				{modules.map(mod => {
					const id = mod.name.replace(/\s+/g, "");
					console.log("mod.name", mod.name);
					const moduleData = design.modules[mod.name as keyof typeof design.modules];
					if (!moduleData) return null;
					const Component = moduleData;
					if (!Component) return null;
					if (mod.content === null) return null;

					// Get the design-specific ModuleForm component from the design definition
					const ModuleForm = editMode
						? design.forms?.[mod.name as keyof typeof design.forms]
						: null;

					return (
						<div
							key={mod.name}
							id={id as string}
							className="relative group overflow-hidden snap-start snap-always"
						>
							{editMode && ModuleForm && <ModuleForm activeInvitation={activeInvitation} />}
							<Component data={mod.content as ModuleData} invitationId={activeInvitation.id} />
						</div>
					);
				})}
			</div>
		</div>
	);
}
