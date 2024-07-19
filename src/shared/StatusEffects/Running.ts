import { ReplicatedStorage, RunService } from "@rbxts/services";
import { StatusEffect, StatusEffectDecorator } from "@rbxts/wcs";
import { Constants } from "shared/Constants";
import { character } from "types/Instances/character";

@StatusEffectDecorator
export default class Running extends StatusEffect {
	public readonly DestroyOnEnd = false

	declare public RunningAnimation: AnimationTrack;
	protected OnConstructClient(): void {
		RunService.Stepped.Wait() // Roblox goofiness
		RunService.Stepped.Wait()

		this.RunningAnimation = (this.Character.Instance as character).Humanoid.Animator.LoadAnimation(ReplicatedStorage.Animations.Run)
	}

	protected OnStartClient(): void {
		const SpeedMultiplier = (this.Character.Instance.GetAttribute("SpeedMultiplier") as number)
		this.SetHumanoidData({WalkSpeed: [Constants.RUN_SPEED * SpeedMultiplier, "Set"]})
		this.RunningAnimation.Play(undefined, undefined, 1 * SpeedMultiplier)
	}

	protected OnEndClient(): void {
		this.RunningAnimation.Stop()
	}
}