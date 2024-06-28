import { Players, ReplicatedStorage, LogService, UserInputService } from "@rbxts/services";
import { Character, CreateClient } from "@rbxts/wcs";

// Setup WCS
const Client = CreateClient();

Client.RegisterDirectory(ReplicatedStorage.TS.Movesets);
Client.RegisterDirectory(ReplicatedStorage.TS.Skills);
Client.RegisterDirectory(ReplicatedStorage.TS.StatusEffects);

Client.Start()

task.wait(.5)
// LogService.ClearOutput()
