import { StatusEffect, StatusEffectDecorator } from "@rbxts/wcs";

@StatusEffectDecorator
export class Attacking extends StatusEffect {
	DestroyOnEnd: boolean = false;
	public OnStartServer() {

	}
}