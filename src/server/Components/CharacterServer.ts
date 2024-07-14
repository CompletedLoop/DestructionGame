import { RunService, Workspace } from "services";
import { OnStart } from "@flamework/core";
import { Component, BaseComponent } from "@flamework/components";

import { character } from "types/character";
import { Character } from "@rbxts/wcs";
import { Base } from "shared/Movesets/Base";
import { Stun } from "shared/StatusEffects/Stun";

@Component({tag: "character"})
export class CharacterServer extends BaseComponent<{}, character> implements OnStart {
	onStart() {
		RunService.Stepped.Wait()

		// Parent the Character instance to Characters folder
		this.instance.Parent = Workspace.Characters

		// Create WSC Character
		const WSC_Character = new Character(this.instance)

		// Apply base moveset
		WSC_Character.ApplySkillsFromMoveset(Base)

		// TODO Apply chosen moveset

		// Destroy when player dies and credit the killer
		this.instance.Humanoid.Died.Connect(() => {
			WSC_Character.Destroy()
		})

		// Add all character parts to collision group
		this.instance.GetDescendants().forEach((part) => {
			if (part.IsA("BasePart")) part.CollisionGroup = "Players"
		})
	}
}