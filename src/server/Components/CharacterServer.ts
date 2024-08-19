import { Debris, Players, RunService, Workspace } from "services";
import { Dependency, OnStart } from "@flamework/core";
import { Component, BaseComponent, Components } from "@flamework/components";

import { character } from "types/Instances/character";
import { Character, UnknownSkill } from "@rbxts/wcs";
import { Base } from "shared/Movesets/Base";

import Attacking from "shared/StatusEffects/Attacking";
import { plr } from "types/Instances/plr";
import LoadCharacter from "shared/Util/LoadCharacter";
import { Events } from "server/network";
import { Make } from "@rbxts/altmake";

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

	public torso_weld = Make("WeldConstraint")

	public setNetworkOwner(to: Player | undefined) {
		this.character.GetChildren().forEach((bodypart: Part | Instance) => {
			if (classIs(bodypart, "Part"))
				bodypart.SetNetworkOwner(to)
		})
	}

	public setNetworkOwnerForDuration(to: Player | undefined, duration: number) {
		// Get the current newtork owner
		const current_network_owner = this.character.Torso.GetNetworkOwner()

		// Set new Network Owner
		this.setNetworkOwner(to)

		// Asychronously wait to set back the Network Owner
		Promise.delay(duration).andThenCall(this.setNetworkOwner, current_network_owner)
	}

	public push(direction: Vector3, force: number, duration?: number) {
		const a0 = Make("Attachment", {
			Axis: new Vector3(0, 0, -90), 
			Parent: this.character.HumanoidRootPart
		})

		const LinearVelocity = Make("LinearVelocity", {
			VelocityConstraintMode: Enum.VelocityConstraintMode.Line,
			LineDirection: direction,
			LineVelocity: force,
			MaxForce: math.huge,

			Attachment0: a0,
			RelativeTo: Enum.ActuatorRelativeTo.World,
			Parent: this.character.HumanoidRootPart
		})

		Debris.AddItem(LinearVelocity, duration || .15)
		Debris.AddItem(a0, duration || .15)
	}

	onStart() {
		this.character = this.instance as character
		
		LoadCharacter(this.player)
			.andThen(this.InitializeCharacter)
			.andThen(this.createWSC_Character)
			.andThen(this.applySkillsAndStatuses)
			.andThen(this.loadCharacterOnClient)
	}
	
	async InitializeCharacter() {
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
		this.character.GetDescendants().forEach((part) => {
			if (part.IsA("BasePart"))
				part.CollisionGroup = "Players"
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