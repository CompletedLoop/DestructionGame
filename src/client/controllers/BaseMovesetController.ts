import { Controller, OnStart, OnTick } from "@flamework/core";
import { UserInputService, Players } from "services";
import { Character } from "@rbxts/wcs";
import { plr } from "types/plr";

import { m1 } from "shared/Skills/Base/m1";

const player = Players.LocalPlayer as plr

let not_typing = false;

@Controller({})
export class BaseMoveset implements OnStart, OnTick {
	onStart() {
		
	}

	onTick(dt: number): void {
		if (UserInputService.IsMouseButtonPressed(Enum.UserInputType.MouseButton1)) {
			if (!not_typing) return
			this.initiateM1()
		}
	}

	initiateM1() {
		if (!player.Character?.FindFirstChildOfClass("Tool")) {
			const character = this.getCurrentWCS_Character();
			character?.GetSkillFromConstructor(m1)?.Start();
		}
	}

	getCurrentWCS_Character() {
		const characterModel = player.Character;
		if (!characterModel) return;

		return Character.GetCharacterFromInstance(characterModel);
	}
}

// Handel holding down left click for m1's
UserInputService.InputBegan.Connect((Input, GameProcessed) => {
	if (GameProcessed) {not_typing = false; return};
	if (Input.UserInputType === Enum.UserInputType.MouseButton1) {
		if (Input.UserInputState === Enum.UserInputState.Begin) {not_typing = true}
	}
});