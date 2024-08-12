import { Character } from "@rbxts/wcs";
import { character } from "types/Instances/character";

export default function GetWCS_Character(character: character) {
	assert(character, "Character is nil")
	
	let WSC_Character: Character | undefined = Character.GetCharacterFromInstance(character)

	while ((!WSC_Character) && task.wait()) {
		WSC_Character = Character.GetCharacterFromInstance(character)
	}

	return WSC_Character;
}