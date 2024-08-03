import { Character } from "@rbxts/wcs";
import { character } from "types/Instances/character";

export default function GetWCS_Character(character: character) {
	if (!character) return;

	while (!Character.GetCharacterFromInstance(character)) { task.wait() }

	return Character.GetCharacterFromInstance(character);
}