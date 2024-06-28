import { AnyStatus, Message, Skill, SkillDecorator } from "@rbxts/wcs";
import { Constructor } from "@rbxts/wcs/out/source/utility";
import { Blocking } from "shared/StatusEffects/Blocking";
import { Stun } from "shared/StatusEffects/Stun";

@SkillDecorator
export class m1 extends Skill {
	protected MutualExclusives: Constructor<AnyStatus>[] = [
		Stun, Blocking
	];

	protected OnConstructServer(): void {
		
	}

	protected OnConstructClient(): void {
		// Load animations

	}
	
	public OnStartServer(): void {
		print("m1_s")
		// Validate m1 request

		

		this.ApplyCooldown(1)
	}
	
	public OnStartClient(): void {
		print("m1_c")
	}
}