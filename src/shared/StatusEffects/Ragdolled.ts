import { StatusEffect, StatusEffectDecorator } from "@rbxts/wcs";

@StatusEffectDecorator
export class Ragdolled extends StatusEffect {
	public OnStartServer() {
		// this.Character.Instance.Ragdolled.Value = true
		this.SetHumanoidData({WalkSpeed: [0, "Set"], JumpHeight: [0, "Set"]})
	}
}