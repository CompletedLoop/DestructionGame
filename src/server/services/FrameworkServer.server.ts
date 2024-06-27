import { ReplicatedStorage } from "@rbxts/services";
import { CreateServer } from "@rbxts/wcs";

const Server = CreateServer();

Server.RegisterDirectory(ReplicatedStorage.TS.Movesets);
Server.RegisterDirectory(ReplicatedStorage.TS.Skills);
Server.RegisterDirectory(ReplicatedStorage.TS.StatusEffects);

Server.Start()