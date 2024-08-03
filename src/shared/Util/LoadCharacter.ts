import { character } from "types/Instances/character";
import { plr } from "types/Instances/plr";

/**
 * Waits until the player's character has fully loaded and returns a promise
 * @param player 
 * @returns Character
 */
export default async function LoadCharacter(player: plr | Player) {
	if (!player.HasAppearanceLoaded()) {
		await Promise.fromEvent(player.CharacterAppearanceLoaded)
	}
	return Promise.delay(.5).andThenReturn(player.Character as character)
}