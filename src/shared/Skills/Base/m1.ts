import { ReplicatedStorage, RunService } from "services";
import { AnyStatus, Message, Skill, SkillDecorator } from "@rbxts/wcs";
import { Constructor } from "@rbxts/wcs/out/source/utility";
import { Blocking } from "shared/StatusEffects/Blocking";
import { Stun } from "shared/StatusEffects/Stun";
import { Ragdolled } from "shared/StatusEffects/Ragdolled";

const m1_anims = ReplicatedStorage.Animations.m1s

@SkillDecorator
export class m1 extends Skill {
	protected MutualExclusives: Constructor<AnyStatus>[] = [
		Stun, Blocking, Ragdolled
	];
	///////////////////////////////////////////////////////////////////////////////////////////////

	combo!: number
	humanoid!: Humanoid
	protected OnConstruct(): void {
		this.humanoid = this.Character.Instance.FindFirstChildOfClass("Humanoid") as Humanoid
		this.combo = 1
		
	}

	last_m1!: number
	protected OnConstructServer(): void {
		this.last_m1 = 0
	}

	m1_anims!: AnimationTrack[]
	protected OnConstructClient(): void {
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
	///////////////////////////////////////////////////////////////////////////////////////////////
	
	public OnStartServer(): void {
		let last_m1 = tick() - this.last_m1
		if (last_m1 >= 1.5) {this.combo = 1}

		this.last_m1 = tick()

		task.delay(.4, () => {
			this.combo += 1
			if (this.combo > m1_anims.GetChildren().size()) {
				this.combo = 1
			}
		})

		this.ApplyCooldown(1)
	}
	
	public OnStartClient(): void {
		// this.m1_anims[0].Play()
		let [worked, combo] = this.currentCombo().await()
		print(worked)
		if (worked) {
			print(combo)
		}
	}
	///////////////////////////////////////////////////////////////////////////////////////////////

	@Message({Type: "Request", Destination: "Server"})
	protected async currentCombo() {
		print("hey")
		return this.combo
	}
}