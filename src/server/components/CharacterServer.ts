import { OnStart } from "@flamework/core";
import { Component, BaseComponent } from "@flamework/components";
import { character } from "types/character";
import { Character } from "@rbxts/wcs";
import { Base } from "shared/Movesets/Base";

@Component({tag: "Character"})
export class CharacterServer extends BaseComponent<{}, character> implements OnStart {
	onStart() {
		const WSC_Character = new Character(this.instance)

		// Apply base moveset
		WSC_Character.ApplySkillsFromMoveset(Base)

		// Apply chosen moveset

		this.instance.Humanoid.Died.Connect(() => {WSC_Character.Destroy()})
	}
}