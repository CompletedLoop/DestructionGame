import { OnStart } from "@flamework/core";
import { Component, BaseComponent } from "@flamework/components";
import { character } from "types/character";
import { Character } from "@rbxts/wcs";
import { Base } from "shared/Movesets/Base";
import { m1 } from "shared/Skills/Base/m1";

@Component({tag: "character"})
export class CharacterServer extends BaseComponent<{}, character> implements OnStart {
	onStart() {
		const WSC_Character = new Character(this.instance)

		// Apply base moveset
		WSC_Character.ApplySkillsFromMoveset(Base)
		// new m1(WSC_Character)

		this.instance.Humanoid.Died.Connect(() => {WSC_Character.Destroy()})
	}
}