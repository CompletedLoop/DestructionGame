import { StatusEffect, StatusEffectDecorator } from "@rbxts/wcs";

@StatusEffectDecorator
export class Stun extends StatusEffect {
	public OnStartServer() {
		this.SetHumanoidData({WalkSpeed: [0, "Set"]})
		this.SetHumanoidData({JumpHeight: [0, "Set"]})
	}
}