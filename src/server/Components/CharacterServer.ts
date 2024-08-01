import { Players, RunService, Workspace } from "services";
import { OnStart } from "@flamework/core";
import { Component, BaseComponent, Components } from "@flamework/components";

import { character } from "types/Instances/character";
import { Character, UnknownSkill } from "@rbxts/wcs";
import { Base } from "shared/Movesets/Base";

import Attacking from "shared/StatusEffects/Attacking";
import { plr } from "types/Instances/plr";
import { LoadCharacter } from "shared/Util/LoadCharacter";

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
	declare public WSC_Character: Character
	declare public AttackingSE: Attacking

	onStart() {
		LoadCharacter(Players.GetPlayerFromCharacter(this.instance) as plr).andThen((character: character) => this.Initialize())
	}

	private Initialize() {
		// Parent the Character instance to Characters folder
		this.instance.Parent = Workspace.Characters
		
		// Create WSC Character
		this.WSC_Character = new Character(this.instance)

		// Create Status Effects
		this.AttackingSE = new Attacking(this.WSC_Character)

		// Apply base moveset
		this.WSC_Character.ApplySkillsFromMoveset(Base)
		
		// TODO Apply chosen moveset
		
		// Replicate to client that everything is setup on ther server
		this.instance.SetAttribute("Loaded", true)

		// Destroy when player dies and credit the killer
		this.instance.Humanoid.Died.Connect(() => {
			this.WSC_Character.Destroy()
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