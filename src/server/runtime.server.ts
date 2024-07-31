import { ReplicatedStorage, RunService, ScriptContext, ServerScriptService } from "@rbxts/services";
import { GlobalEvents, GlobalFunctions } from "shared/network";
import { Flamework } from "@flamework/core";
import { CreateServer } from "@rbxts/wcs";
import { Cmdr, CommandContext } from "@rbxts/cmdr";

RunService.Stepped.Wait()

// WCS
const Server = CreateServer();
Server.RegisterDirectory(ReplicatedStorage.TS.Movesets);
Server.RegisterDirectory(ReplicatedStorage.TS.Skills);
Server.RegisterDirectory(ReplicatedStorage.TS.StatusEffects);
Server.Start()

// CMDR
Cmdr.RegisterDefaultCommands()
Cmdr.RegisterCommandsIn(ServerScriptService.TS.Commands)
Cmdr.RegisterHook("BeforeRun", (context: CommandContext) => {
	if (RunService.IsStudio()) return
	if (context.Group === "DefaultAdmin" && context.Executor.UserId !== game.CreatorId) {
		return "NO"
	}
})

// FLAMEWORK
Flamework.addPaths("src/server/Components");
Flamework.addPaths("src/server/Services");
Flamework.ignite();