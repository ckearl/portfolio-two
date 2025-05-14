"use client";

import { useEffect, useState } from "react";
import { createHighlighter } from "shiki";

const CODE_SNIPPETS = {
	json: `{
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
	yaml: `name: Christopher Kearl
hobbies:
  - music
  - running
  - gaming
  - programming
age: 25
location: Utah
currentPosition: Full Stack Developer
languages:
  - JavaScript
  - Python
  - C#
skills:
  programming: [React, Node.js, Express]
  design: [Figma, Photoshop]
  database: [MongoDB, PostgreSQL, MySQL]
personalMission: >
  Build thoughtful, accessible, and engaging web experiences
  that bridge the gap between user needs and business goals.`,
	xml: `<profile>
  <name>Christopher Kearl</name>
  <hobbies>
    <hobby>music</hobby>
    <hobby>running</hobby>
    <hobby>gaming</hobby>
    <hobby>programming</hobby>
  </hobbies>
  <age>25</age>
  <location>Utah</location>
  <currentPosition>Full Stack Developer</currentPosition>
  <languages>
    <language>JavaScript</language>
    <language>Python</language>
    <language>C#</language>
  </languages>
  <skills>
    <programming>React</programming>
    <programming>Node.js</programming>
    <programming>Express</programming>
    <design>Figma</design>
    <design>Photoshop</design>
    <database>MongoDB</database>
    <database>PostgreSQL</database>
    <database>MySQL</database>
  </skills>
  <personalMission>
    Build thoughtful, accessible, and engaging web experiences
    that bridge the gap between user needs and business goals.
  </personalMission>
</profile>`,
};

type Lang = keyof typeof CODE_SNIPPETS;

export default function CodeBlock() {
	const [html, setHtml] = useState<string>("");
	const [language, setLanguage] = useState<Lang>("json");
	const [highlighter, setHighlighter] = useState<any>(null);
	const [firstLoad, setFirstLoad] = useState(true);

	useEffect(() => {
		const detectTheme = window.matchMedia("(prefers-color-scheme: dark)")
			.matches
			? "nord"
			: "github-light";

		const initHighlighter = async () => {
			const instance = await createHighlighter({
				themes: ["nord", "github-light"],
				langs: ["json", "yaml", "xml"],
			});
			setHighlighter(instance);

			// Run typewriter on JSON load only
			if (language === "json") {
				for (let i = 0; i <= CODE_SNIPPETS.json.length; i++) {
					const partialCode = CODE_SNIPPETS.json.slice(0, i);
					const html = instance.codeToHtml(partialCode, {
						lang: "json",
						theme: detectTheme,
					});
					setHtml(html);
					await new Promise((r) => setTimeout(r, 3));
				}
				setFirstLoad(false);
			} else {
				const html = instance.codeToHtml(CODE_SNIPPETS[language], {
					lang: language,
					theme: detectTheme,
				});
				setHtml(html);
			}
		};

		initHighlighter();
	}, [language]);

	return (
		<div className="relative mb-8 max-w-1/2">
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
