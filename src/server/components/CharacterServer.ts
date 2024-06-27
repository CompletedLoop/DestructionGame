import { OnStart } from "@flamework/core";
import { Component, BaseComponent } from "@flamework/components";
import { character } from "types/character";
import { Character } from "@rbxts/wcs";
import { m1 } from "shared/Skills/Base/m1";

@Component({tag: "Character"})
export class CharacterServer extends BaseComponent<{}, character> implements OnStart {
	onStart() {
		const WSC_Character = new Character(this.instance)

		// Apply basic abilities
		new m1(WSC_Character)

		// Apply chosen moveset

		this.instance.Humanoid.Died.Connect(() => {WSC_Character.Destroy()})
	}
}