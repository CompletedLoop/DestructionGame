import { CommandContext, CommandDefinition } from "@rbxts/cmdr";

const ClearVoxels: CommandDefinition = {
	Name: "ClearVoxels",
	Aliases: ["cv"],
	Description: "Clear Voxels",
	Group: "DefaultAdmin",
	Args: [],

	// ClientRun: (context: CommandContext) => {
	// 	if (false) {
	// 		return ""
	// 	}
	// }
}

export = ClearVoxels