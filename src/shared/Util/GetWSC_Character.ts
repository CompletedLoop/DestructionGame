import { Players } from "@rbxts/services";
import { Character } from "@rbxts/wcs";
import { character } from "types/Instances/character";

/**
 * Returns a promise containing the requested WCS Character.
 * @param character 
 * @returns A promise for the WCS Character
 */
export default async function GetWCS_Character(character: character | Model) {
	assert(character, "Parameter @character is undefined")

	return Promise.retryWithDelay(() => new Promise<Character>(
		(resolve, reject) => {
			const WCS_Character = Character.GetCharacterFromInstance(character)
			if (WCS_Character)
				resolve(WCS_Character)
			else
				reject(`${character} does not have a WCS Character`)
		}
	), 20, .05)
}