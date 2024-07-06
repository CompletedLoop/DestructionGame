import { ReplicatedStorage } from "@rbxts/services";
import { Flamework } from "@flamework/core";
import { CreateServer } from "@rbxts/wcs";

const Server = CreateServer();
Server.RegisterDirectory(ReplicatedStorage.TS.Movesets);
Server.RegisterDirectory(ReplicatedStorage.TS.Skills);
Server.RegisterDirectory(ReplicatedStorage.TS.StatusEffects);
Server.Start()

Flamework.addPaths("src/server/components");
Flamework.addPaths("src/server/services");
Flamework.addPaths("src/shared/components");
Flamework.ignite();
