import { StatusEffect, StatusEffectDecorator } from "@rbxts/wcs";
import { character } from "types/Instances/character";

@StatusEffectDecorator
export default class Ragdolled extends StatusEffect {
	private RagdollValue = (this.Character.Instance as character).IsRagdoll 

	public OnStartServer() {
		this.RagdollValue.Value = true
		this.SetHumanoidData({WalkSpeed: [0, "Set"], JumpHeight: [0, "Set"]})
	}
	
	public OnEndServer(): void {
		this.RagdollValue.Value = false
	}
}