import { Workspace, Players, ReplicatedStorage } from "services"
import { Flamework } from "@flamework/core";
import { SetGlobalHook } from "shared/Modules/Logger";
import { CreateClient } from "@rbxts/wcs";
import Iris from "@rbxts/iris";

const Client = CreateClient();
Client.RegisterDirectory(ReplicatedStorage.TS.Movesets);
Client.RegisterDirectory(ReplicatedStorage.TS.Skills);
Client.RegisterDirectory(ReplicatedStorage.TS.StatusEffects);
Client.Start()

Iris.Init()

Players.LocalPlayer.GetMouse().TargetFilter = Workspace.FX.Hitboxes

SetGlobalHook(() => {
	if (Workspace.GameConfig.GetAttribute("Debug")) return true
})

Flamework.addPaths("src/client/Components");
Flamework.addPaths("src/client/Controllers");
Flamework.ignite();
