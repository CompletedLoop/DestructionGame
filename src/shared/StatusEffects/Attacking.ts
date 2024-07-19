import { StatusEffect, StatusEffectDecorator } from "@rbxts/wcs";

@StatusEffectDecorator
export default class Attacking extends StatusEffect {
	DestroyOnEnd: boolean = false;
	public OnStartServer() {
		this.Character.Instance.SetAttribute("Attacking", true)
	}

	protected OnEndServer(): void {
		this.Character.Instance.SetAttribute("Attacking", false)
	}
}