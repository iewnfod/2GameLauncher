import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./main.css";
import { I18nProvider } from "@renderer/components/i18n";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<I18nProvider>
			<App />
		</I18nProvider>
	</React.StrictMode>,
);
