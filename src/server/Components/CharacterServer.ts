import { Players, RunService, Workspace } from "services";
import { Dependency, OnStart } from "@flamework/core";
import { Component, BaseComponent, Components } from "@flamework/components";

import { character } from "types/Instances/character";
import { Character, UnknownSkill } from "@rbxts/wcs";
import { Base } from "shared/Movesets/Base";

import Attacking from "shared/StatusEffects/Attacking";
import { plr } from "types/Instances/plr";
import LoadCharacter from "shared/Util/LoadCharacter";
import { Events } from "server/network";
import Punched from "shared/VFX/Punched";

interface CharacterAttributes {
	SpeedMultiplier: number
}

@Component({
	tag: "character",
	defaults: {
		SpeedMultiplier: 1,
	}
})
export default class CharacterServer extends BaseComponent<CharacterAttributes, Model> implements OnStart {
	declare public WSC_Character: Character
	declare public AttackingSE: Attacking
	declare public character: character

	public player = Players.GetPlayerFromCharacter(this.instance) as plr 

	onStart() {
		this.character = this.instance as character
		
		LoadCharacter(this.player)
			.andThen(this.InitializeCharacter)
			.andThen(this.createWSC_Character)
			.andThen(this.applySkillsAndStatuses)
			.andThen(this.loadCharacterOnClient)
	}
	
	InitializeCharacter() {
		// Freeze Player
		this.character.HumanoidRootPart.Anchored = true

		// Parent the Character instance to Characters folder
		this.character.Parent = Workspace.Characters
		
		// Delete component when character is destroyed
		this.character.GetPropertyChangedSignal("Parent").Connect(() => {
			if (!this.character.Parent)
				Dependency<Components>().removeComponent<CharacterServer>(this.character)
		})
	}

	protected createWSC_Character() {
		this.WSC_Character = new Character(this.character)
	}

	private applySkillsAndStatuses() {
		// Create Status Effects
		this.AttackingSE = new Attacking(this.WSC_Character)

		// Apply base moveset
		this.WSC_Character.ApplySkillsFromMoveset(Base)

		// TODO Apply chosen moveset

	}

	protected setCollisionGroupOfBodyParts() {
		// Add all character parts to collision group
		this.character.GetDescendants().forEach((part) => {
			if (part.IsA("BasePart")) part.CollisionGroup = "Players"
		})
	}

	private loadCharacterOnClient() {
		// Replicate to client that everything is setup on ther server
		this.character.SetAttribute("Loaded", true)

		// Unfreeze and tell client to add its character component
		this.character.HumanoidRootPart.Anchored = false
		Events.AddCharacterComponent(this.player)

		// Destroy when player dies and credit the killer
		this.character.Humanoid.Died.Connect(() => {
			this.WSC_Character.Destroy()
		})
	}
}