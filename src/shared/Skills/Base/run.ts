import { AnyStatus, HoldableSkill, Skill, SkillDecorator, StatusEffect } from "@rbxts/wcs";
import { Constructor } from "@rbxts/wcs/out/source/utility";
import { Attacking } from "shared/StatusEffects/Attacking";
import { Blocking } from "shared/StatusEffects/Blocking";
import { Ragdolled } from "shared/StatusEffects/Ragdolled";
import Running from "shared/StatusEffects/Running";
import { Stun } from "shared/StatusEffects/Stun";

@SkillDecorator
export default class run extends HoldableSkill {
	// declare protected CheckedByOthers: false;
	// protected MutualExclusives: Constructor<AnyStatus>[] = [
	// 	Stun, Blocking, Ragdolled, Attacking
	// ];

	///////////////////////////////////////////////////////////////////////////////////////////////
	RunningStatus!: StatusEffect
	protected OnConstructServer(): void {
		this.RunningStatus = new Running(this.Character)
		this.SetMaxHoldTime(undefined)
	}

	protected OnStartServer(): void {
		print("wst")
		this.RunningStatus.Start()
	}

	protected OnEndServer(): void {
		this.RunningStatus.Stop()
	}

	///////////////////////////////////////////////////////////////////////////////////////////////
	protected OnConstructClient(): void {
		// Load animation
	}

	protected OnStartClient(): void {
		// Play running animation
	}

	protected OnEndClient(): void {
		// Stop animation
	}
}