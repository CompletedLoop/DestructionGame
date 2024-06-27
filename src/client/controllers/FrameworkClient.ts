import { ReplicatedStorage, LogService } from "@rbxts/services";
import { CreateClient } from "@rbxts/wcs";

const Client = CreateClient();

Client.RegisterDirectory(ReplicatedStorage.TS.Movesets);
Client.RegisterDirectory(ReplicatedStorage.TS.Skills);
Client.RegisterDirectory(ReplicatedStorage.TS.StatusEffects);

Client.Start()

task.wait(.5)
LogService.ClearOutput()