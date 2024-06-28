import { ReplicatedStorage, RunService } from "services";
import { AnyStatus, Message, Skill, SkillDecorator } from "@rbxts/wcs";
import { Constructor } from "@rbxts/wcs/out/source/utility";
import { Blocking } from "shared/StatusEffects/Blocking";
import { Stun } from "shared/StatusEffects/Stun";

const m1_anims = ReplicatedStorage.Animations.m1s

@SkillDecorator
export class m1 extends Skill {
	protected MutualExclusives: Constructor<AnyStatus>[] = [
		Stun, Blocking
	];

	protected OnConstructServer(): void {
		
	}

	m1_anims!: AnimationTrack[]
	humanoid!: Humanoid
	protected OnConstructClient(): void {
		this.humanoid = this.Character.Instance.FindFirstChildOfClass("Humanoid") as Humanoid
		const animator = this.humanoid.FindFirstChildOfClass("Animator") as Animator
		RunService.Stepped.Wait()

		// Load animations
		this.m1_anims = []
		m1_anims.GetChildren().forEach((m1) => {
			let anim = animator.LoadAnimation(m1 as Animation)
			anim.Priority = Enum.AnimationPriority.Action3
			this.m1_anims[tonumber(m1.Name.sub(2, 2)) as number - 1] = anim
		})
	}
	
	public OnStartServer(): void {
		// Validate m1 request

		

		this.ApplyCooldown(1)
	}
	
	public OnStartClient(): void {
		
	}
}