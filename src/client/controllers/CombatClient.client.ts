import { Players, ReplicatedStorage, LogService, UserInputService } from "@rbxts/services";
import { Character, CreateClient } from "@rbxts/wcs";
import { m1 } from "shared/Skills/Base/m1";

// Setup WCS
const Client = CreateClient();

Client.RegisterDirectory(ReplicatedStorage.TS.Movesets);
Client.RegisterDirectory(ReplicatedStorage.TS.Skills);
Client.RegisterDirectory(ReplicatedStorage.TS.StatusEffects);

Client.Start()

task.wait(.5)
LogService.ClearOutput()

// Setup base moves
function getCurrentWCS_Character() {
	const characterModel = Players.LocalPlayer.Character;
	if (!characterModel) return;

	return Character.GetCharacterFromInstance(characterModel);
}

UserInputService.InputBegan.Connect((Input, GameProcessed) => {
	if (GameProcessed) return;
	if (Input.UserInputType === Enum.UserInputType.MouseButton1) {
		const character = getCurrentWCS_Character();
		character?.GetSkillFromConstructor(m1)?.Start();
	}
});