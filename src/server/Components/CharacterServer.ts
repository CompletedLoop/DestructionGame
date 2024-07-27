import { RunService, Workspace } from "services";
import { OnStart } from "@flamework/core";
import { Component, BaseComponent, Components } from "@flamework/components";

import { character } from "types/Instances/character";
import { Character, UnknownSkill } from "@rbxts/wcs";
import { Base } from "shared/Movesets/Base";

import Attacking from "shared/StatusEffects/Attacking";

interface CharacterAttributes {
	SpeedMultiplier: number
}

@Component({
	tag: "character",
	defaults: {
		SpeedMultiplier: 1,
	}
})
export default class CharacterServer extends BaseComponent<CharacterAttributes, character> implements OnStart {
	declare public AttackingSE: Attacking

	onStart() {
		RunService.Stepped.Wait()
		
		// Parent the Character instance to Characters folder
		this.instance.Parent = Workspace.Characters
		
		// Create WSC Character
		const WSC_Character = new Character(this.instance)

		// Create Attacking Status Effect
		this.AttackingSE = new Attacking(WSC_Character)

		// Apply base moveset
		WSC_Character.ApplySkillsFromMoveset(Base)
		
		// TODO Apply chosen moveset
		
		// Replicate to client
		this.instance.SetAttribute("Loaded", true)

		// Destroy when player dies and credit the killer
		this.instance.Humanoid.Died.Connect(() => {
			WSC_Character.Destroy()
		})
		
		// Add all character parts to collision group
		this.instance.GetDescendants().forEach((part) => {
			if (part.IsA("BasePart")) part.CollisionGroup = "Players"
		})
		
		// Delete component when character is destroyed
		this.instance.GetPropertyChangedSignal("Parent").Connect(() => {
			if (!this.instance.Parent)
				this.destroy()
		})
	}
}