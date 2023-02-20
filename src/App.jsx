import React from "react";
import ReactDOM from "react-dom/client";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import "./App.css";

function App() {
	return (
		<div className="App">
			<p className="greeting">
				Hey <span className="wave">👋</span> I am
			</p>
			<h1
				className="name"
				onClick={() => {
					window.location.reload();
				}}
			>
				Karandeep Bhardwaj
			</h1>
			<p>
				Software Engineer @{" "}
				<strong
					onClick={() => {
						window.open(
							"https://www.linkedin.com/company/sun-life-financial/life/dd71f099-b701-41d1-aedb-923f89c36da6/",
							"_blank"
						);
					}}
				>
					Sun Life Financial
				</strong>{" "}
				☀️
			</p>
			<div className="card">
				<FaLinkedin
					className="icon"
					onClick={() => {
						window.open(
							"https://www.linkedin.com/in/karandeepbhardwaj/",
							"_blank"
						);
					}}
				/>
				<FaGithub
					className="icon"
					onClick={() => {
						window.open(
							"https://github.com/karandeepbhardwaj",
							"_blank"
						);
					}}
				/>
			</div>
		</div>
	);
}

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
