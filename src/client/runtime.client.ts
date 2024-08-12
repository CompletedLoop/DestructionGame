import { Workspace, Players, ReplicatedStorage, RunService, StarterGui } from "services"
import { Flamework } from "@flamework/core";
import { SetGlobalHook } from "shared/Modules/Logger";
import { CreateClient } from "@rbxts/wcs";
import { CmdrClient } from "@rbxts/cmdr";
import { GlobalEvents, GlobalFunctions } from "shared/network";
import { Events } from "./network";
import Iris from "@rbxts/iris";
import { Register, Start } from "@rbxts/refx";

RunService.Stepped.Wait()

// WCS & REFX
const Client = CreateClient();
Client.RegisterDirectory(ReplicatedStorage.TS.Movesets);
Client.RegisterDirectory(ReplicatedStorage.TS.Skills);
Client.RegisterDirectory(ReplicatedStorage.TS.StatusEffects);
Client.Start()

Register(ReplicatedStorage.TS.VFX)
Start()

// IRIS
Iris.Init()

// CMDR
CmdrClient.SetActivationKeys([ Enum.KeyCode.Semicolon ])

// TARGET FILTER
Players.LocalPlayer.GetMouse().TargetFilter = Workspace.FX.Hitboxes

// LOGGER
SetGlobalHook(() => {
	if (Workspace.GameConfig.GetAttribute("Debug")) return true
})

// NOTIFICATIONS
Events.SendNotificationToPlayer.connect((NotificationInfo: SendNotificationConfig) => {
	StarterGui.SetCore("SendNotification", NotificationInfo)
})

// FLAMEWORK
Flamework.addPaths("src/client/Components");
Flamework.addPaths("src/client/Controllers");
Flamework.ignite();