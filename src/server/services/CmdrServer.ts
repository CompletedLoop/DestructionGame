import { Cmdr, CommandContext } from "@rbxts/cmdr";
import { RunService } from "services";

Cmdr.RegisterDefaultCommands()
Cmdr.RegisterCommandsIn(((script.Parent as Folder).Parent as Folder & {Commands: Folder}).Commands)
Cmdr.RegisterHook("BeforeRun", (context: CommandContext) => {
	if (RunService.IsStudio()) return
	if (context.Group === "DefaultAdmin" && context.Executor.UserId !== game.CreatorId) {
		return "NO"
	}
})