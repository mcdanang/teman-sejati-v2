import ReactMarkdown from "react-markdown";
import Navbar from "./navbar";
import Footer from "./footer";

export default function TermsPrivacyPage({ title, content }: { title: string; content: string }) {
	return (
		<section>
			<Navbar />
			<main className="min-h-svh">
				<div className="container py-20 max-w-5xl mx-auto">
					<h2 className="mb-10 text-center font-bold text-4xl text-blue-dianne-500 dark:text-blue-dianne-300">
						{title}
					</h2>
					<div>
						<ReactMarkdown
							components={{
								h1: ({ children }) => (
									<h1 className="mb-6 mt-10 text-center font-bold text-3xl text-burnt-sienna-500">
										{children}
									</h1>
								),
								h2: ({ children }) => (
									<h2 className="mb-5 mt-10 text-center font-bold text-2xl text-burnt-sienna-500">
										{children}
									</h2>
								),
								h3: ({ children }) => (
									<h3 className="mb-5 mt-10 text-lg text-slate-500 dark:text-slate-400">
										{children}
									</h3>
								),
								h5: ({ children }) => (
									<h5 className="mb-5 mt-10 text-center text-slate-500 dark:text-slate-400">
										{children}
									</h5>
								),
								p: ({ children }) => (
									<p className="mb-4 text-slate-500 dark:text-slate-400 text-justify">{children}</p>
								),
								ul: ({ children }) => (
									<ul className="list-disc pl-6 mb-4 text-slate-500 dark:text-slate-400">
										{children}
									</ul>
								),
								li: ({ children }) => (
									<li className="mb-2 text-slate-500 dark:text-slate-400">{children}</li>
								),
								a: ({ href, children }) => (
									<a href={href} className="text-persian-green-500 hover:underline">
										{children}
									</a>
								),
								strong: ({ children }) => (
									<strong className="font-bold text-slate-500 dark:text-slate-400">
										{children}
									</strong>
								),
							}}
						>
							{content}
						</ReactMarkdown>
					</div>
				</div>
			</main>
			<Footer />
		</section>
	);
}
