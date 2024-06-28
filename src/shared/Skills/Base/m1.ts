import { Message, Skill, SkillDecorator } from "@rbxts/wcs";

@SkillDecorator
export class m1 extends Skill {
	combo!: 1
	protected OnConstructServer(): void {
		this.combo = 1
	}

	protected OnConstructClient(): void {

	}
	
	public OnStartServer(): void {
		print(this.combo)
		this.printSomethingFromServer("wsg fam")
		this.ApplyCooldown(1)
	}

	public OnStartClient(): void {
		// this.getCombo().andThen((value: number) => {print(value)})
		let [worked, combo] = this.getCombo().await()
		if (worked) {
			print(combo)
		}
	}

	@Message({Type: "Event", Destination: "Client"})
	protected printSomethingFromServer(thing: string) {
		print(thing)
	}

	@Message({Type: "Request", Destination: "Server"})
	protected async getCombo() {
		return this.combo
	}
}