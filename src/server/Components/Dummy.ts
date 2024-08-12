import { OnStart } from "@flamework/core";
import { Component, BaseComponent } from "@flamework/components";
import { character } from "types/Instances/character";
import CharacterServer from "./CharacterServer";

@Component({tag: "Dummy"})
export default class Dummy extends CharacterServer implements OnStart {
	declare public onDeath: Promise<void>

	onStart() {
		this.character = this.instance as character
		this.onDeath = Promise.fromEvent(this.character.Humanoid.Died)

		this.InitializeCharacter()
			.andThen(this.createWSC_Character)
			.andThen(this.setCollisionGroupOfBodyParts)
	}
	
	override async InitializeCharacter() {
		
	}

	public CleanupDummy() {
		this.instance.Destroy()
		this.destroy()
	}
}