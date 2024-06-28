import { StatusEffect, StatusEffectDecorator } from "@rbxts/wcs";

@StatusEffectDecorator
export class Blocking extends StatusEffect {
	public OnStartServer() {
		this.SetHumanoidData({WalkSpeed: [0, "Set"], JumpHeight: [0, "Set"]})
	}
}