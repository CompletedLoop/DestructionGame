import { CommandContext } from "@rbxts/cmdr";
import { Events } from "server/network";
import { Workspace, ReplicatedStorage } from "services";

export = (context: CommandContext) => {
	Workspace.FX.Voxels.ClearAllChildren()
	Events.Voxels.ClearVoxels.broadcast()
}