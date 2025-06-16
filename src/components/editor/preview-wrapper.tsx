export function PreviewWrapper({ children }: { children: React.ReactNode }) {
	return (
		<div className={`border h-screen overflow-scroll rounded shadow bg-white w-full p-4`}>
			{children}
		</div>
	);
}
