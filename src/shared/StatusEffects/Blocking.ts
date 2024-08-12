import { StatusEffect, StatusEffectDecorator } from "@rbxts/wcs";

@StatusEffectDecorator
export default class Blocking extends StatusEffect {
	public OnStartServer() {
		this.SetHumanoidData({WalkSpeed: [5, "Set"], JumpHeight: [0, "Set"]})
	}
}