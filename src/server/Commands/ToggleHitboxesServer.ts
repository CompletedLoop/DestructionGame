import { Workspace } from "@rbxts/services"

export = () => {
	Workspace.GameConfig.SetAttribute("Show_Hitboxes", !Workspace.GameConfig.GetAttribute("Show_Hitboxes"))
}