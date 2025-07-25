"use client";

import { useState, useEffect, useRef } from "react";
import { Github, Mail, FileText, Linkedin, Menu, X } from "lucide-react";
import dynamic from "next/dynamic";
import CodeBlock from "./components/CodeBlock";
import Image from "next/image";

const BallCanvas = dynamic(() => import("./components/BallCanvas"), {
	ssr: false,
});

export default function Home() {
	const [activeSection, setActiveSection] = useState("about");
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
	const [isHovering, setIsHovering] = useState(false);
	const [showAllExperiences, setShowAllExperiences] = useState(false);
	const [toggleBallCanvas, setToggleBallCanvas] = useState(false);

	const aboutRef = useRef<HTMLElement | null>(null);
	const experienceRef = useRef<HTMLElement | null>(null);
	const projectsRef = useRef<HTMLElement | null>(null);
	const contactRef = useRef<HTMLElement | null>(null);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const sectionRefs = {
		about: aboutRef,
		experience: experienceRef,
		projects: projectsRef,
		contact: contactRef,
	};

	type SectionId = keyof typeof sectionRefs;

	// Custom cursor effect
	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			setCursorPosition({ x: e.clientX, y: e.clientY });
		};

		window.addEventListener("mousemove", handleMouseMove);
		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
		};
	}, []);

	// Intersection observer for section detection
	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setActiveSection(entry.target.id);
					}
				});
			},
			{ threshold: 0.5 }
		);

		Object.values(sectionRefs).forEach(
			(ref) => ref.current && observer.observe(ref.current)
		);

		return () => {
			Object.values(sectionRefs).forEach(
				(ref) => ref.current && observer.unobserve(ref.current)
			);
		};
	}, [sectionRefs]);

	// Scroll to section function
	const scrollToSection = (sectionId: SectionId) => {
		sectionRefs[sectionId].current?.scrollIntoView({ behavior: "smooth" });
		setActiveSection(sectionId);
		setMobileMenuOpen(false);
	};

	const projects = [
		{
			title: "KeyCoach",
			description:
				"An AI-powered typing tutor that tracks the hands of a typist to detect technique errors.",
			tech: ["Next.JS", "ML5.JS", "Typescript React", "3D CAD Modeling"],
			link: "https://keycoa.ch/",
		},
		{
			title: "KeyCoach",
			description:
				"An AI-powered typing tutor that tracks the hands of a typist to detect technique errors.",
			tech: ["Next.JS", "ML5.JS", "Typescript React", "3D CAD Modeling"],
			link: "https://keycoa.ch/",
		},
		{
			title: "Go",
			description: "A Mobile game of the board game Go (wéiqí, Baduk, cờ vây).",
			tech: ["React Native"],
			link: "https://github.com/ckearl/Go",
		},
		{
			title: "Claude CLI Application",
			description:
				"A terminal application to interact with the Anthropic/Claude API.",
			tech: ["Rust", "reqwest"],
			link: "https://github.com/ckearl",
		},
	];

	const experiences = [
		{
			role: "Cloud Compliance Engineer",
			company: "Marriott International",
			period: "2024 - Present",
			description:
				"Develop interactive glossary of security controls for enterprise cloud platform. Maintain security and compliance protocols for all production cloud service environments. Aided in remediation efforts during the largest international IT outage in company history; personally restored 20 properties and 39 remote servers and devices, ensuring transaction processing for thousands of guests",
		},
		{
			role: "Adjust Professor",
			company: "BYU Marriott School of Business",
			period: "2024 - Present",
			description:
				"Engineered new curriculum for Introduction to Web Development course in the Information Systems program. Prepared lecture materials, assignments, classroom activities, projects, and exams for classroom of 25 students across two different semesters.",
		},
		{
			role: "Full-Stack Software Engineer",
			company: "KeyCoach",
			period: "2024 - Present",
			description: ".",
		},
		{
			role: "Data Engineer Intern",
			company: "Pattern",
			period: "Summer 2023",
			description:
				"Developed dynamic search keyword filters to categorize keywords by tracking period, resulting in an aggregate average of $0.50 in savings per advertisement space bid for partners while improving internal ROI analysis. Reduced Amazon ad metrics dashboard load times by ~3 seconds by optimizing SQL generation and access controls.",
		},
		{
			role: "Teaching Assistant",
			company: "BYU Marriott School of Business",
			period: "2022 - 2023",
			description:
				"Managed course curriculum, grading standards, and academic progress for 60+ students. Aided professor in piloting new course by exploring management tools, learning resources, and teaching methods. Minimized grade entry times by 4 hours by automating submission requests from students.",
		},
		{
			role: "Web Developer",
			company: "Contour Software",
			period: "2021 - 2022",
			description:
				"Launched paperless work environment transition for client by engineering AWS-compatible information entry platform. Streamlined client new-hire onboarding experience by building custom HRM application. Presented new features and upcoming requirements in bimonthly demos with client executives.",
		},
	];

	return (
		<div className="bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-100 min-h-screen relative overflow-x-hidden font-light">
			{/* ball canvas game */}
			{toggleBallCanvas && <BallCanvas />}

			{/* Custom cursor */}
			<div
				className={`fixed w-8 h-8 rounded-full border border-neutral-800 dark:border-neutral-100 pointer-events-none z-50 mix-blend-difference transition-transform duration-300 ${
					isHovering ? "scale-150" : "scale-100"
				}`}
				style={{
					left: `${cursorPosition.x}px`,
					top: `${cursorPosition.y}px`,
					transform: "translate(-50%, -50%)",
				}}
			/>

			{/* Navigation - Desktop */}
			<nav className="fixed top-0 left-0 w-full h-16 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm z-40 hidden md:block">
				<div className="container mx-auto px-4 md:px-6 h-full flex items-center justify-between">
					<div
						className="text-lg font-medium cursor-pointer"
						onMouseEnter={() => setIsHovering(true)}
						onMouseLeave={() => setIsHovering(false)}
						onClick={() => scrollToSection("about")}
					>
						Christopher Kearl
					</div>
					<div className="flex gap-6 md:gap-8">
						{(Object.keys(sectionRefs) as SectionId[]).map((section) => (
							<div
								key={section}
								className={`capitalize cursor-pointer transition-colors duration-300 px-2 py-1 md:px-3 md:py-2 rounded-md md:rounded-full text-base md:text-lg ${
									activeSection === section ? "text-neutral-800 bg-neutral-200 dark:bg-neutral-800" : "text-neutral-400"
								}`}
								onClick={() => scrollToSection(section)}
								onMouseEnter={() => setIsHovering(true)}
								onMouseLeave={() => setIsHovering(false)}
							>
								{section}
							</div>
						))}
					</div>
				</div>
			</nav>

			{/* Navigation - Mobile */}
			<nav className="fixed top-0 left-0 w-full h-16 bg-white/80 backdrop-blur-sm z-40 flex md:hidden items-center justify-between px-4 md:px-6">
				<div className="text-lg font-medium">Christopher Kearl</div>
				<button
					className="focus:outline-none p-2 rounded-md hover:bg-neutral-200"
					onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
				>
					{mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
				</button>
			</nav>

			{/* Mobile Menu */}
			{mobileMenuOpen && (
				<div className="fixed inset-0 bg-white z-30 pt-20 px-6 flex flex-col items-center justify-center md:hidden">
					<div className="flex flex-col gap-10 items-center w-full">
						{(Object.keys(sectionRefs) as SectionId[]).map((section) => (
							<div
								key={section}
								className={`capitalize text-2xl font-medium cursor-pointer w-full text-center py-4 rounded-lg transition-colors duration-300 ${
									activeSection === section ? "text-neutral-800 bg-neutral-200" : "text-neutral-400"
								}`}
								onClick={() => scrollToSection(section)}
							>
								{section}
							</div>
						))}
					</div>
				</div>
			)}

			{/* Main Content */}
			<main className="container mx-auto px-6 pt-24 pb-16">
				{/* About Section */}
				<section
					id="about"
					ref={aboutRef}
					className="min-h-screen flex flex-col align-start justify-start space-around"
				>
					<div className="min-w-3/4">
						{/* <h1 className="text-5xl md:text-7xl font-light mb-8 leading-tight">
								<span className="block">Hello, I'm Christopher.</span>
								<span className="block text-neutral-400">
									Full Stack Developer.
								</span>
							</h1> */}
						<div className="relative mx-auto flex flex-col md:flex-row justify-center items-center max-w-4xl w-full min-h-[18rem] pr-0 md:pr-96 gap-6 md:gap-0">
							<CodeBlock />
							<div className="relative w-60 h-60 md:w-96 md:h-96 mt-6 md:mt-0 md:absolute md:right-0 md:top-1/2 md:-translate-y-1/2">
								<Image
									src="/memoji_hi_res.png"
									alt="Memoji"
									fill
									className="object-contain"
									sizes="(min-width: 768px) 24rem, 15rem"
									priority
								/>
							</div>
						</div>

						<div className="flex flex-wrap gap-4">
							<a
								href="https://github.com/ckearl"
								target="_blank"
								rel="noopener noreferrer"
								className="group flex items-center gap-2 border border-neutral-200 dark:border-neutral-700 px-4 py-2 rounded-full hover:bg-neutral-800 hover:text-white transition-colors duration-300 z-10"
								onMouseEnter={() => setIsHovering(true)}
								onMouseLeave={() => setIsHovering(false)}
							>
								<Github size={16} />
								<span>GitHub</span>
							</a>
							<a
								href="https://www.linkedin.com/in/christopher-kearl/"
								target="_blank"
								rel="noopener noreferrer"
								className="group flex items-center gap-2 border border-neutral-200 dark:border-neutral-700 px-4 py-2 rounded-full hover:bg-neutral-800 hover:text-white transition-colors duration-300 z-10"
								onMouseEnter={() => setIsHovering(true)}
								onMouseLeave={() => setIsHovering(false)}
							>
								<Linkedin size={16} />
								<span>LinkedIn</span>
							</a>
							<a
								href="#"
								className="group flex items-center gap-2 border border-neutral-200 dark:border-neutral-700 px-4 py-2 rounded-full hover:bg-neutral-800 hover:text-white transition-colors duration-300 z-10"
								onMouseEnter={() => setIsHovering(true)}
								onMouseLeave={() => setIsHovering(false)}
							>
								<FileText size={16} />
								<span>Resume</span>
							</a>
						</div>
					</div>
				</section>

				{/* Toggle Ball Canvas*/}
				<section
					id="ball-canvas"
					className="min-h-24 flex flex-col justify-center items-center"
					ref={experienceRef}
				>
					<button
						onClick={() => setToggleBallCanvas(!toggleBallCanvas)}
						className="mt-8 border border-neutral-200 dark:border-neutral-700 px-4 py-2 rounded-full hover:bg-neutral-800 hover:text-white transition-colors duration-300 z-10"
						onMouseEnter={() => setIsHovering(true)}
						onMouseLeave={() => setIsHovering(false)}
					>
						{toggleBallCanvas ? "Hide Skills" : "Show Skills"}
					</button>
					<p className="text-lg text-neutral-600 dark:text-neutral-400 mt-4">
						Click and drag to see my skills!
					</p>
				</section>

				{/* Experience Section */}
				<section
					id="experience"
					ref={experienceRef}
					className="min-h-screen flex flex-col justify-center py-8 md:py-16"
				>
					<h2 className="text-2xl md:text-4xl font-light mb-8 md:mb-12">Experience</h2>
					<div className="flex flex-col gap-8 md:grid md:gap-12 md:grid-cols-1">
						{(showAllExperiences ? experiences : experiences.slice(0, 3)).map(
							(exp, index) => (
								<div
									key={index}
									className="border-t border-neutral-200 pt-6 md:pt-8 grid md:grid-cols-4 gap-4 md:gap-6"
									onMouseEnter={() => setIsHovering(true)}
									onMouseLeave={() => setIsHovering(false)}
								>
									<div className="md:col-span-1">
										<p className="text-neutral-400 dark:text-neutral-400 text-sm md:text-base">
											{exp.period}
										</p>
									</div>
									<div className="md:col-span-3">
										<h3 className="text-lg md:text-xl font-medium mb-1 md:mb-2">{exp.role}</h3>
										<p className="text-neutral-600 dark:text-neutral-300 mb-2 md:mb-4 text-base md:text-lg">
											{exp.company}
										</p>
										<p className="text-neutral-600 dark:text-neutral-300 text-sm md:text-base">
											{exp.description}
										</p>
									</div>
								</div>
							)
						)}
					</div>
					{experiences.length > 3 && (
						<button
							onClick={() => setShowAllExperiences(!showAllExperiences)}
							className="mt-6 md:mt-8 self-center border border-neutral-200 dark:border-neutral-700 px-4 py-2 rounded-full hover:bg-neutral-800 hover:text-white transition-colors duration-300 z-10 hover:pointer text-base md:text-lg"
							onMouseEnter={() => setIsHovering(true)}
							onMouseLeave={() => setIsHovering(false)}
						>
							{showAllExperiences ? "View Less" : "View More"}
						</button>
					)}
				</section>

				{/* Projects Section */}
				<section
					id="projects"
					ref={projectsRef}
					className="min-h-screen flex flex-col justify-center py-8 md:py-16"
				>
					<h2 className="text-2xl md:text-4xl font-light mb-8 md:mb-12">Projects</h2>
					<div className="flex flex-col gap-6 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8">
						{projects.map((project, index) => (
							<a
								key={index}
								href={project.link}
								target="_blank"
								rel="noopener noreferrer"
								className="border border-neutral-200 dark:border-neutral-700 z-10 p-4 md:p-6 rounded-lg transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col"
								onMouseEnter={() => setIsHovering(true)}
								onMouseLeave={() => setIsHovering(false)}
							>
								<h3 className="text-lg md:text-xl font-medium mb-2 md:mb-3">{project.title}</h3>
								<p className="text-neutral-600 dark:text-neutral-400 mb-4 md:mb-6 text-sm md:text-base">
									{project.description}
								</p>
								<div className="flex flex-wrap gap-2 mb-2 md:mb-4">
									{project.tech.map((tech, techIndex) => (
										<span
											key={techIndex}
											className="text-xs bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded"
										>
											{tech}
										</span>
									))}
								</div>
							</a>
						))}
					</div>
				</section>

				{/* Contact Section */}
				<section
					id="contact"
					ref={contactRef}
					className="min-h-screen flex flex-col justify-center py-8 md:py-16"
				>
					<h2 className="text-2xl md:text-4xl font-light mb-6 md:mb-8">Contact</h2>
					<div className="max-w-xl w-full">
						<p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 mb-6 md:mb-8">
							It&apos;s nice to meet you! Reach out to connect or collaborate on a
							project.
						</p>
						<a
							href="mailto:hello@example.com"
							className="inline-flex items-center gap-2 z-10 border border-neutral-800 bg-neutral-800 text-white px-4 md:px-6 py-2 md:py-3 rounded-full hover:bg-white hover:text-neutral-800 transition-colors duration-300 text-base md:text-lg"
							onMouseEnter={() => setIsHovering(true)}
							onMouseLeave={() => setIsHovering(false)}
						>
							<Mail size={16} />
							<span>Send me an email</span>
						</a>
					</div>
				</section>
			</main>

			{/* Footer */}
			<footer className="container mx-auto px-4 md:px-6 py-6 md:py-8 border-t border-neutral-200">
				<div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">
					<p className="text-neutral-600 dark:text-neutral-400 text-sm md:text-base text-center md:text-left">
						© {new Date().getFullYear()} Christopher Kearl. All rights reserved.
					</p>
					<div className="flex gap-4 md:gap-6">
						<a
							href="https://github.com/ckearl"
							target="_blank"
							rel="noopener noreferrer"
							className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 transition-colors duration-300 z-10 p-2 md:p-0"
							onMouseEnter={() => setIsHovering(true)}
							onMouseLeave={() => setIsHovering(false)}
						>
							<Github size={20} />
						</a>
						<a
							href="https://www.linkedin.com/in/christopher-kearl/"
							target="_blank"
							rel="noopener noreferrer"
							className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 transition-colors duration-300 z-10 p-2 md:p-0"
							onMouseEnter={() => setIsHovering(true)}
							onMouseLeave={() => setIsHovering(false)}
						>
							<Linkedin size={20} />
						</a>
						<a
							href="mailto:ctrkearl@gmail.com"
							className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 transition-colors duration-300 z-10 p-2 md:p-0"
							onMouseEnter={() => setIsHovering(true)}
							onMouseLeave={() => setIsHovering(false)}
						>
							<Mail size={20} />
						</a>
					</div>
				</div>
			</footer>
		</div>
	);
}
