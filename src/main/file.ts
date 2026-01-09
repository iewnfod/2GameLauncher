import { app, dialog, ipcMain, shell } from "electron";
import axios from "axios";

export function loadFileEvents() {
	ipcMain.handle(
		"selectFile",
		async (
			_event,
			args: {
				filters: { name: string; extensions: string[] }[];
			},
		) => {
			const { canceled, filePaths } = await dialog.showOpenDialog({
				properties: ["openFile"],
				filters: args.filters,
			});

			if (!canceled) {
				return filePaths[0];
			} else {
				return "";
			}
		},
	);

	ipcMain.handle("showFileInFolder", (_event, args: { filePath: string }) => {
		shell.showItemInFolder(args.filePath);
	});

	ipcMain.handle("getFileIcon", async (_event, args: { filePath: string }) => {
		try {
			const icon = await app.getFileIcon(args.filePath);
			return icon.toDataURL();
		} catch (error) {
			console.error("Failed to get icon:", error);
			throw error;
		}
	});

	ipcMain.handle("openExternal", (_event, args: { url: string }) => {
		shell.openExternal(args.url);
	});
}

export async function downloadImageToBase64(url: string) {
	try {
		const response = await axios.get(url, {
			responseType: "arraybuffer",
			headers: {
				"User-Agent":
					"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
			},
		});

		const contentType = response.headers["content-type"] || "image/png";
		const base64 = Buffer.from(response.data).toString("base64");

		return `data:${contentType};base64,${base64}`;
	} catch (error) {
		console.error(`Failed to download image from ${url}:`, error);
		return null;
	}
}
