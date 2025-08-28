import { Switch } from "@/components/ui/switch";
// import Image from "next/image";

export const RSVP = () => {
	return (
		<section className="text-center py-12 bg-[#660033]">
			<h1 className="text-4xl font-bold font-shadows">RSVP</h1>
			<p className="mt-2 text-lg text-gray-500 font-shadows">Will you attend our wedding?</p>
			<div className="flex justify-center">
				<p>No</p>
				<Switch className="disabled:opacity-100" />
				<p>Yes</p>
			</div>
			<p className="mt-2 text-lg text-gray-500 font-shadows">People you bring including you?</p>
		</section>
	);
};
