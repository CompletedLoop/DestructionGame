import { character } from "types/Instances/character";
import { plr } from "types/Instances/plr";

export async function LoadCharacter(player: plr | Player) {
	while (!player.HasAppearanceLoaded()) {
		task.wait()
	}

	task.wait(1)
	return player.Character as character
}