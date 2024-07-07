import { ReplicatedStorage } from "@rbxts/services";
import { Flamework } from "@flamework/core";
import { CreateServer } from "@rbxts/wcs";

const Server = CreateServer();
Server.RegisterDirectory(ReplicatedStorage.TS.Movesets);
Server.RegisterDirectory(ReplicatedStorage.TS.Skills);
Server.RegisterDirectory(ReplicatedStorage.TS.StatusEffects);
Server.Start()

Flamework.addPaths("src/server/Components");
Flamework.addPaths("src/server/Services");
Flamework.ignite();
