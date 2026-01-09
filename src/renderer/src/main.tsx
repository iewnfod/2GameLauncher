import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./main.css";
import { I18nProvider } from "@renderer/providers/i18n";
import { SettingsProvider } from "@renderer/providers/settings";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<I18nProvider>
			<SettingsProvider>
				<App/>
			</SettingsProvider>
		</I18nProvider>
	</React.StrictMode>,
);
