import { designs } from "@/lib/designs";
import { InvitationWithModules, ModuleData } from "@/types";
import { useEffect, useRef, useState } from "react";
import { Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";

export function MainInvitation({
	activeInvitation,
	editMode = false,
}: {
	activeInvitation: InvitationWithModules | null;
	editMode?: boolean;
}) {
	const [isPlaying, setIsPlaying] = useState(false);
	const audioRef = useRef<HTMLAudioElement | null>(null);

	// Background music functionality
	useEffect(() => {
		if (!activeInvitation?.background_music) return;

		const audio = new Audio(activeInvitation.background_music);
		audio.loop = true;
		audio.volume = 0.3; // Set volume to 30%
		audioRef.current = audio;

		// Auto-play when component mounts (if not in edit mode)
		if (!editMode) {
			const playPromise = audio.play();
			if (playPromise !== undefined) {
				playPromise
					.then(() => {
						setIsPlaying(true);
					})
					.catch(error => {
						console.log("Auto-play prevented:", error);
						// Auto-play was prevented, but we don't show error to user
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
		>
			{/* Background Music Controls */}
			{activeInvitation.background_music && (
				<div className="fixed bottom-4 ml-4 z-50 flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg">
					<Button
						type="button"
						variant="ghost"
						size="sm"
						onClick={togglePlay}
						className="h-10 w-10 p-0"
					>
						{isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
					</Button>
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
						<div key={mod.name} id={id as string} className="relative group">
							{editMode && ModuleForm && <ModuleForm activeInvitation={activeInvitation} />}
							<Component data={mod.content as ModuleData} />
						</div>
					);
				})}
			</div>
		</div>
	);
}
