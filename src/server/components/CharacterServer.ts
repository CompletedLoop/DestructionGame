import { Workspace } from "services";
import { OnStart } from "@flamework/core";
import { Component, BaseComponent } from "@flamework/components";

import { character } from "types/character";
import { Character } from "@rbxts/wcs";
import { Base } from "shared/Movesets/Base";
import { Stun } from "shared/StatusEffects/Stun";

@Component({tag: "character"})
export class CharacterServer extends BaseComponent<{}, character> implements OnStart {
	onStart() {
		this.instance.Parent = Workspace.Characters

		const WSC_Character = new Character(this.instance)

		// Apply base moveset
		WSC_Character.ApplySkillsFromMoveset(Base)

		// Destroy when player dies
		this.instance.Humanoid.Died.Connect(() => {WSC_Character.Destroy()})

		// Add all character parts to collision group
		this.instance.GetDescendants().forEach((part) => {
			if (part.IsA("BasePart")) part.CollisionGroup = "Players"
		})
	}
}