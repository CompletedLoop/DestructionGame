import { Players, ReplicatedStorage, LogService, UserInputService, Workspace } from "@rbxts/services";
import { Character, CreateClient } from "@rbxts/wcs";
import { SetGlobalHook } from "shared/Modules/Logger";

// Setup WCS
const Client = CreateClient();
Client.RegisterDirectory(ReplicatedStorage.TS.Movesets);
Client.RegisterDirectory(ReplicatedStorage.TS.Skills);
Client.RegisterDirectory(ReplicatedStorage.TS.StatusEffects);
Client.Start()

// Set Mouse TargetFilter
Players.LocalPlayer.GetMouse().TargetFilter = Workspace.FX.Hitboxes

// Set Global Hook for Logger
SetGlobalHook(() => {
	if (Workspace.GameConfig.GetAttribute("Debug")) return true
	else return false
})

// task.wait(.5)
// LogService.ClearOutput()
