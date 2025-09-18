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
	const [showPlayPrompt, setShowPlayPrompt] = useState(false);
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
		audio.addEventListener("canplaythrough", () => {
			console.log("Audio can play through");
		});

		audio.addEventListener("playing", () => {
			setIsPlaying(true);
			setShowPlayPrompt(false);
			console.log("Audio is playing");
		});

		audio.addEventListener("pause", () => {
			setIsPlaying(false);
			console.log("Audio paused");
		});

		audio.addEventListener("error", e => {
			console.error("Audio error:", e);
		});

		// Auto-play when component mounts (if not in edit mode)
		if (!editMode) {
			// Try to play immediately
			const playPromise = audio.play();
			if (playPromise !== undefined) {
				playPromise
					.then(() => {
						setIsPlaying(true);
						console.log("Audio auto-played successfully");
					})
					.catch(error => {
						console.log("Auto-play prevented:", error);
						setShowPlayPrompt(true);

						// Auto-play was prevented, try again on user interaction
						const handleUserInteraction = () => {
							audio
								.play()
								.then(() => {
									setIsPlaying(true);
									setShowPlayPrompt(false);
									console.log("Audio played after user interaction");
								})
								.catch(err => {
									console.log("Still cannot play:", err);
								});
							// Remove listeners after first interaction
							document.removeEventListener("click", handleUserInteraction);
							document.removeEventListener("touchstart", handleUserInteraction);
							document.removeEventListener("keydown", handleUserInteraction);
						};

						// Listen for user interaction to start audio
						document.addEventListener("click", handleUserInteraction, { once: true });
						document.addEventListener("touchstart", handleUserInteraction, { once: true });
						document.addEventListener("keydown", handleUserInteraction, { once: true });
					});
			}
		}

		return () => {
			if (audio) {
				audio.pause();
				audio.src = "";
			}
		};
	}, [activeInvitation?.background_music, editMode]);

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
			onClick={() => {
				// If audio exists and is not playing, try to play it
				if (audioRef.current && !isPlaying && activeInvitation?.background_music) {
					audioRef.current.play().catch(err => console.log("Click to play failed:", err));
				}
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

			<div className="relative max-w-md mx-auto min-h-screen bg-white/95 shadow-lg backdrop-blur-sm">
				{modules.map(mod => {
					const id = mod.name.replace(/\s+/g, "");
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
						<div key={mod.name} id={id as string} className="relative group overflow-hidden">
							{editMode && ModuleForm && <ModuleForm activeInvitation={activeInvitation} />}
							<Component data={mod.content as ModuleData} invitationId={activeInvitation.id} />
						</div>
					);
				})}
			</div>
		</div>
	);
}
