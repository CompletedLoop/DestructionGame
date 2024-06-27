import { StatusEffect, StatusEffectDecorator } from "@rbxts/wcs";

@StatusEffectDecorator
export class blocking extends StatusEffect {
	public OnStartServer() {
		this.SetHumanoidData({WalkSpeed: [3, "Set"]})
		this.SetHumanoidData({JumpHeight: [0, "Set"]})
	}
}