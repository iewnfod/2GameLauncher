import { dialog, ipcMain, shell } from "electron";

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
}
