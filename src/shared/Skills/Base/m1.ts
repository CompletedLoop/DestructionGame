import { ReplicatedStorage, RunService } from "services";
import { AnyStatus, Message, Skill, SkillDecorator, StatusEffect } from "@rbxts/wcs";
import { Constructor } from "@rbxts/wcs/out/source/utility";
import { Blocking } from "shared/StatusEffects/Blocking";
import { Stun } from "shared/StatusEffects/Stun";
import { Ragdolled } from "shared/StatusEffects/Ragdolled";
import { Attacking } from "shared/StatusEffects/Attacking";

const m1_anims = ReplicatedStorage.Animations.m1s

interface Metadata {
	Combo: number
}

@SkillDecorator
export class m1 extends Skill {
	declare protected CheckedByOthers: true;
	protected MutualExclusives: Constructor<AnyStatus>[] = [
		Stun, Blocking, Ragdolled, Attacking
	];
	///////////////////////////////////////////////////////////////////////////////////////////////

	combo: number = 1
	protected OnConstruct(): void {
		
	}

	last_m1: number = 0
	attackingSE: StatusEffect = new Attacking(this.Character)
	protected OnConstructServer(): void {

	}

	m1_anims!: AnimationTrack[]
	protected OnConstructClient(): void {
		// Load animations
		const animator = this.Character.Humanoid.FindFirstChildOfClass("Animator") as Animator
		RunService.Stepped.Wait()

		this.m1_anims = []
		m1_anims.GetChildren().forEach((m1) => {
			let anim = animator.LoadAnimation(m1 as Animation)
			anim.Priority = Enum.AnimationPriority.Action3
			this.m1_anims[tonumber(m1.Name.sub(2, 2)) as number - 1] = anim
		})

		// Metadata
		this.MetadataChanged.Connect((data) => {
			this.combo = (data as unknown as Metadata).Combo
		})
	}
	///////////////////////////////////////////////////////////////////////////////////////////////
	
	public OnStartServer(): void {
		if (this.Character.Humanoid.Health < 1) this.End()

		let last_m1 = tick() - this.last_m1
		if (last_m1 >= 1.5) {this.set_combo(1)}

		this.last_m1 = tick()
		this.attackingSE.Start()
		
		task.delay(.4, () => {
			this.attackingSE.Stop()
			
			this.set_combo(this.combo + 1)
			if (this.combo > m1_anims.GetChildren().size()) {
				this.set_combo(1)
			}
		})
		
		this.m1_accepted(this.combo)
		this.ApplyCooldown(.45)
	}

	private set_combo(value: number): void {
		this.combo = value
		// this.SetMetadata({Combo: this.combo} as never)
	}
	///////////////////////////////////////////////////////////////////////////////////////////////

	
	public OnStartClient(): void {
		//
	}
	///////////////////////////////////////////////////////////////////////////////////////////////
	
	@Message({Type: "Event", Destination: "Client"})
	protected m1_accepted(combo: number) {
		print(`Combo: ${combo}`)

		let anim = this.m1_anims[combo - 1]
		if (anim) {
			anim.Play()
		}
	}
}