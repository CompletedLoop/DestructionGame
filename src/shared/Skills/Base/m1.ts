import { Skill, SkillDecorator } from "@rbxts/wcs";

@SkillDecorator
export class m1 extends Skill {
	public OnStartServer(): void {
		print("m1")
		this.ApplyCooldown(.5)
	}
}