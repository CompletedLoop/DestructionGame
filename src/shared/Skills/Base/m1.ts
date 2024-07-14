import { ReplicatedStorage, RunService } from "services";
import { AnyStatus, Message, Skill, SkillDecorator, StatusEffect } from "@rbxts/wcs";
import { Constructor } from "@rbxts/wcs/out/source/utility";
import { Blocking } from "shared/StatusEffects/Blocking";
import { Stun } from "shared/StatusEffects/Stun";
import { Ragdolled } from "shared/StatusEffects/Ragdolled";
import { Attacking } from "shared/StatusEffects/Attacking";
import { character } from "types/character";
import { Dependency } from "@flamework/core"
import type { VoxelService } from "server/Services/VoxelService";
import { Logger } from "shared/Modules/Logger";
import { Make } from "@rbxts/altmake";
import Hitbox from "shared/Luau/Hitbox";

const log = new Logger("M1").Logger
const m1_anims = ReplicatedStorage.Animations.m1s

interface Metadata {
	Combo: number
}

@SkillDecorator
export class m1 extends Skill {
    // Skill config
	declare protected CheckedByOthers: true;
	protected MutualExclusives: Constructor<AnyStatus>[] = [
		Stun, Blocking, Ragdolled, Attacking
	];

	///////////////////////////////////////////////////////////////////////////////////////////////
	combo: number = 1
    HumanoidRoot: Part = (this.Character.Instance as character).HumanoidRootPart
	protected OnConstruct(): void {}

	///////////////////////////////////////////////////////////////////////////////////////////////
	last_m1: number = 0
	attackingSE: StatusEffect = new Attacking(this.Character)
	voxelService!: VoxelService

    HitboxPart!: Part
    HitboxClass!: Hitbox;

	protected OnConstructServer(): void {
		this.voxelService = Dependency<VoxelService>()

        this.HitboxPart = Make("Part", { Transparency: .8, BrickColor: BrickColor.Red(), Size: new Vector3(3, 6, 4) })
        this.HitboxClass = new Hitbox([this.HitboxPart])
        this.HitboxClass.PlayerEntered.Connect((...args) => this.OnHitboxHit(...args))
	}

	public OnStartServer(): void {
		if (this.Character.Humanoid.Health < 1) this.End()
			
		let last_m1 = tick() - this.last_m1
		if (last_m1 >= 1.5) {this.set_combo(1)}
		
		let cooldown = .45	
		if (this.combo === m1_anims.GetChildren().size()) cooldown = 1

		this.last_m1 = tick()
		this.attackingSE.Start()

		this.StartClient(this.combo)
		this.ApplyCooldown(cooldown)
		
		task.delay(.4, () => {
			this.attackingSE.Stop()
			
			this.set_combo(this.combo + 1)
			if (this.combo > m1_anims.GetChildren().size()) {
				this.set_combo(1)
			}
		})
	}

    private OnHitboxHit(character: character, part: Part) {
        if (character === this.Character.Instance) return
        print(character)
    }

	@Message({Type: "Event", Destination: "Server"})
	protected Hitbox() {
		let root_cf = this.HumanoidRoot.CFrame
		let target = root_cf.Position.add(root_cf.LookVector.mul(4)).add(new Vector3(0, 1, 0))
		let cf = CFrame.lookAlong(target, root_cf.LookVector)

        this.HitboxPart.CFrame = cf
        this.HitboxClass.Enable(.2)

        // If last m1 in combo then trigger voxel hitbox
		if (this.combo === m1_anims.GetChildren().size()) {
			let voxel_packet = this.voxelService.VoxelizeInRadius(5, cf, 2)
			voxel_packet.velocity = this.HumanoidRoot.CFrame.LookVector.mul(20)
			this.voxelService.PassVoxelsToClients(voxel_packet)
		}
	}

	private set_combo(value: number): void {
		this.combo = value
		this.SetMetadata({Combo: this.combo} as never)
	}

	///////////////////////////////////////////////////////////////////////////////////////////////
	m1_anims!: AnimationTrack[]

	protected OnConstructClient(): void {
		// Load animations
		const animator = this.Character.Humanoid.FindFirstChildOfClass("Animator") as Animator
		RunService.Stepped.Wait()
		RunService.Stepped.Wait()

		this.m1_anims = []
		m1_anims.GetChildren().forEach((m1) => {
			let anim = animator.LoadAnimation(m1 as Animation)
			anim.Priority = Enum.AnimationPriority.Action3
			this.m1_anims[tonumber(m1.Name.sub(2, 2)) as number - 1] = anim

			// Trigger event to server to fire hitbox
			anim.GetMarkerReachedSignal("Hitbox").Connect(() => this.Hitbox())
		})

		// Metadata
		this.MetadataChanged.Connect((data) => {
			this.combo = (data as unknown as Metadata).Combo
		})
	}

	@Message({Type: "Event", Destination: "Client"})
	protected StartClient(combo: number) {
		log(`${combo}`, {Tag: "$combo: "})
		this.m1_anims[combo - 1].Play()
	}
}
