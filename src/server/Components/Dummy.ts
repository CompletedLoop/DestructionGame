import { OnStart } from "@flamework/core";
import { Component, BaseComponent } from "@flamework/components";
import { character } from "types/Instances/character";
import CharacterServer from "./CharacterServer";
import IFrame from "shared/StatusEffects/IFrame";

@Component({tag: "Dummy"})
export default class Dummy extends CharacterServer implements OnStart {
	declare public onDeath: Promise<void>

	onStart() {
		this.character = this.instance as character
		this.onDeath = Promise.fromEvent(this.character.Humanoid.Died)

		this.torso_weld.Part0 = this.character.Torso

		this.InitializeCharacter()
			.andThen(this.createWSC_Character)
			.andThen(this.setCollisionGroupOfBodyParts)
			// .andThen(this.setNetworkOwnerOfBodyParts)

		new IFrame(this.WSC_Character)
	}
	
	override async InitializeCharacter() {
		
	}
	
	private setNetworkOwnerOfBodyParts() {
		this.character.GetChildren().forEach((bodypart: Instance) => {
			if (bodypart.IsA("Part")) {
				bodypart.SetNetworkOwner(undefined)
			}
		}) 
	}

	public CleanupDummy() {
		this.instance.Destroy()
		this.destroy()
	}
}