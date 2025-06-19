import { LucideProps } from "lucide-react";

export type Invitation = {
	slug: string;
	index: number;
	is_paid: boolean;
	is_published: boolean;
	modules: Module[];
};

export type Module = {
	order: number;
	name: string;
	url: string;
	icon: React.ForwardRefExoticComponent<
		Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
	>;
};
