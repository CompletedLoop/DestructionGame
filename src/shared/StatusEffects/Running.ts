import { StatusEffect, StatusEffectDecorator } from "@rbxts/wcs";
import { Constants } from "shared/Constants";

@StatusEffectDecorator
export default class Running extends StatusEffect {
	protected OnStartServer(): void {
		print("wsg broski")
		this.SetHumanoidData({WalkSpeed: [Constants.RUN_SPEED * (this.Character.Instance.GetAttribute("SpeedMultiplier") as number), "Set"]})
	}
}