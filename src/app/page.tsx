import React from "react";
import Link from "next/link";

export default function Home() {
	return (
		<main className="min-h-screen bg-eggshell-600 text-gunmetal-800">
			<header className="w-full border-b border-cadet-300 px-6 py-4 flex justify-between items-center bg-columbia-600">
				<h1 className="text-xl font-bold text-charcoal-700">
					Christopher Kearl
				</h1>
				<nav className="space-x-4 text-charcoal-700">
					<Link href="/" className="hover:underline">
						Home
					</Link>
					<Link href="/resume" className="hover:underline">
						Resume
					</Link>
					<Link href="/projects" className="hover:underline">
						Projects
					</Link>
					<Link href="/contact" className="hover:underline">
						Contact
					</Link>
				</nav>
			</header>

			<section className="px-6 py-12 text-center">
				<h2 className="text-4xl font-bold mb-4 text-charcoal-700">
					Hi, I'm Christopher Kearl
				</h2>
				<p className="max-w-2xl mx-auto text-lg text-cadet-600">
					I'm a developer, problem-solver, and creative thinker who builds tools
					and experiences that make people's lives better. This site showcases
					some of the work I've done, the projects I've loved, and how to get in
					touch.
				</p>
			</section>

			<section className="bg-white py-16 px-6">
				<div className="max-w-4xl mx-auto">
					<h3 className="text-2xl font-bold mb-6 text-gunmetal-800">
						Featured Projects
					</h3>
					<ul className="space-y-8">
						<li className="border border-cadet-300 p-6 rounded-lg shadow-sm bg-columbia-100">
							<h4 className="text-xl font-semibold text-charcoal-700">
								BYU Egypt
							</h4>
							<p className="text-gunmetal-700">
								Dashboard for BYU’s archaeological research with complex
								artifact tracking. Won "Best Filtering Algorithm" at BYU IS
								Hackathon.
							</p>
						</li>
						<li className="border border-cadet-300 p-6 rounded-lg shadow-sm bg-columbia-100">
							<h4 className="text-xl font-semibold text-charcoal-700">
								Whealth
							</h4>
							<p className="text-gunmetal-700">
								Smart recipe searcher using Spoonacular API to generate meals
								from ingredients you already have.
							</p>
						</li>
						<li className="border border-cadet-900 p-6 rounded-lg shadow-sm bg-columbia-100">
							<h4 className="text-xl font-semibold text-charcoal-700">
								Spotify Playlist Builder
							</h4>
							<p className="text-gunmetal-700">
								Automatically generates playlists based on tempo, artist,
								listening habits, and more.
							</p>
						</li>
						<li className="border border-cadet-300 p-6 rounded-lg shadow-sm bg-columbia-100">
							<h4 className="text-xl font-semibold text-charcoal-700">
								RaspberryPi DNS Server
							</h4>
							<p className="text-gunmetal-700">
								Personal RaspberryPi project to host all portfolio projects
								affordably.
							</p>
						</li>
						<li className="border border-cadet-300 p-6 rounded-lg shadow-sm bg-columbia-100">
							<h4 className="text-xl font-semibold text-charcoal-700">
								Intercontinentle
							</h4>
							<p className="text-gunmetal-700">
								Trivia game challenging players to guess countries based on
								layered geographical clues.
							</p>
						</li>
					</ul>
				</div>
			</section>

			<section className="bg-cadet-900">
				<p className="text-cadet-900">hi example section</p>
			</section>

			<section className="py-12 bg-gradient-to-r from-gunmetal-800 via-charcoal-700 to-cadet-600 text-eggshell-100 text-center">
				<h3 className="text-3xl font-bold mb-4">
					Let's build something together
				</h3>
				<Link
					href="/contact"
					className="inline-block mt-4 px-6 py-3 bg-eggshell-200 text-gunmetal-800 font-semibold rounded shadow hover:bg-cadet-400 hover:text-white"
				>
					Contact Me
				</Link>
			</section>

			<footer className="text-center py-6 text-sm text-cadet-600">
				&copy; {new Date().getFullYear()} Christopher Kearl
			</footer>
		</main>
	);
}
