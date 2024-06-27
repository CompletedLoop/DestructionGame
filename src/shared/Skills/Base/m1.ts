import { Message, Skill, SkillDecorator } from "@rbxts/wcs";

@SkillDecorator
export class m1 extends Skill {
	public OnStartServer(): void {
		print("attack initiated on server")
		
		this.serverSaidSomething(`Hello Client`)

		this.ApplyCooldown(1)
	}

	public OnStartClient(): void {
		print("attack initiated on client")
	}

	@Message({ Type: "Event", Destination: "Client", })
	protected serverSaidSomething(thing: string) {
		print(thing)
	}
}