"use client";

import { useEffect, useState } from "react";
import { createHighlighter } from "shiki";

export default function CodeBlock() {
	const [html, setHtml] = useState<string>("");

	useEffect(() => {
		const detectTheme = window.matchMedia("(prefers-color-scheme: dark)")
			.matches
			? "nord"
			: "github-light";

		const loadHighlighter = async () => {
			const highlighter = await createHighlighter({
				themes: ["nord", "github-light"],
				langs: ["json", "yaml", "xml"],
			});

			const code = highlighter.codeToHtml(
				`{
  "name": "Christopher Kearl",
  "hobbies": ["music", "running", "gaming", "programming"],
  "age": 25,
  "location": "Utah",
  "currentPosition": "Full Stack Developer",
  "languages": ["JavaScript", "Python", "C#"],
  "skills": {
    "programming": ["React", "Node.js", "Express"],
    "design": ["Figma", "Photoshop"],
    "database": ["MongoDB", "PostgreSQL", "MySQL"]
  },
  "personalMission": "Build thoughtful, accessible, and engaging web experiences that bridge the gap between user needs and business goals."
}`,
				{ lang: "json", theme: detectTheme }
			);

			setHtml(code);
		};

		loadHighlighter();
	}, []);

	return (
		<div className="relative">
			<style>
				{`
        .shiki code, .shiki pre {
          white-space: pre-wrap !important;
          word-break: break-word !important;
          overflow-wrap: break-word !important;
        }
      `}
			</style>
			<div
				className="prose prose-sm dark:prose-invert rounded-lg overflow-x-auto bg-[#2E3440] dark:bg-[#2E3440] p-4"
				dangerouslySetInnerHTML={{ __html: html }}
			/>
		</div>
	);
}
