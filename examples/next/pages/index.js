import Head from "next/head";
import { variants } from "@catppuccin/palette";

export default function Home() {
	const changeColorscheme = (e) => {
		document.body.classList = e.target.value.toLowerCase();
	};

	return (
		<>
			<Head>
				<title>Catppuccin + TailwindCSS!</title>
			</Head>
			<div className="container max-w-lg mx-auto transition-colors space-y-2">
				<div className="space-y-2 text-center pt-8">
					<img
						className="mx-auto"
						src="https://raw.githubusercontent.com/catppuccin/catppuccin/main/assets/logos/exports/1544x1544_circle.png"
						width="100"
						alt="Logo"
					/>
					<h1>Catppuccin for Tailwind CSS</h1>
					<span className="mocha macchiato frappe latte"></span>
					<div className="flex max-w-fit border rounded border-overlay0 items-center mx-auto">
						<span className="rounded-l whitespace-nowrap px-2">
							Current flavour:
						</span>
						<select
							className="focus:rounded-r focus:ring-pink focus:border-pink bg-overlay0 w-full p-1 text-text"
							name="colorscheme"
							onChange={changeColorscheme}
						>
							<option>Mocha</option>
							<option>Macchiato</option>
							<option>Frappe</option>
							<option>Latte</option>
						</select>
					</div>
				</div>
				<div className="flex flex-wrap gap-2">
					{Object.keys(variants.mocha).map((key) => (
						<div
							className={
								"flex items-center shadow-md rounded justify-center h-24 w-24" +
								(" bg-" + key)
							}
							key={key}
						>
							<span className="bg-base/20 text-text rounded-lg p-1">
								{key}
							</span>
						</div>
					))}
				</div>
			</div>
		</>
	);
}
