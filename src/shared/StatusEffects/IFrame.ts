import { StatusEffect, StatusEffectDecorator } from "@rbxts/wcs";

@StatusEffectDecorator
export default class IFrame extends StatusEffect {
	protected OnStartServer(): void {
	}

	HandleDamage(Modified: number, Original: number): number {
		return 0
	}
}