import { Dependency, OnStart } from "@flamework/core";
import { Component, BaseComponent, Components } from "@flamework/components";
import { ServerStorage } from "@rbxts/services";
import { DummyService } from "server/Services/DummyService";
import { character } from "types/Instances/character";
import Dummy from "./Dummy";
import { Logger } from "shared/Modules/Logger";

const log = new Logger("DummySpawner").Logger

@Component({tag: "DummySpawner"})
export class DummySpawner extends BaseComponent<{}, Part> implements OnStart {
	declare public CurrentDummy: character;
	declare public CurrentDummyComponent: Dummy | undefined

	constructor(private readonly dummyService: DummyService) { super() }

	onStart() {
		this.instance.Transparency = 1

		this.spawnDummy()
	}

	private spawnDummy() {
		this.CurrentDummy = this.dummyService.CreateDummy(this.instance.CFrame)
		this.CurrentDummyComponent = Dependency<Components>().getComponent<Dummy>(this.CurrentDummy)

		this.CurrentDummyComponent?.onDeath.andThen(this.onDummyDeath)
	}

	private onDummyDeath() {
		if (this.CurrentDummyComponent) {
			log(`${this.CurrentDummy} has died. Respawning new Dummy`)
			Promise.delay(5).andThen(() => {
				this.CurrentDummyComponent?.CleanupDummy()
				this.spawnDummy()
			})
		}
	}
}