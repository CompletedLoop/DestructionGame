import { CommandContext } from "@rbxts/cmdr";
import { Workspace } from "services";

export = (context: CommandContext) => {
	Workspace.GameConfig.SetAttribute("Visual_Voxels", !Workspace.GameConfig.GetAttribute("Visual_Voxels"))
}