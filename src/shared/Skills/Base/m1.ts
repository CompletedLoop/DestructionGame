import { ReplicatedStorage, RunService } from "services";
import { AnyStatus, Message, Skill, SkillDecorator, StatusEffect } from "@rbxts/wcs";
import { Components } from "@flamework/components";
import { Constructor } from "@rbxts/wcs/out/source/utility";
import { Dependency } from "@flamework/core"

import { Blocking } from "shared/StatusEffects/Blocking";
import { Stun } from "shared/StatusEffects/Stun";
import { Ragdolled } from "shared/StatusEffects/Ragdolled";
import { character } from "types/Instances/character";
import { Logger } from "shared/Modules/Logger";
import { Make } from "@rbxts/altmake";
import Attacking from "shared/StatusEffects/Attacking";
import Hitbox from "shared/Luau/Hitbox";
import SoundPlayer from "shared/Modules/SoundPlayer";

import type VoxelService from "server/Services/VoxelService";
import type CharacterServer from "server/Components/CharacterServer";

const log = new Logger("M1").Logger
const m1_anims = ReplicatedStorage.Animations.m1s

const m1_sound_folder = ReplicatedStorage.Sounds.Base.M1

@SkillDecorator
export default class m1 extends Skill {
    // Skill config
	declare protected CheckedByOthers: false
	protected MutualExclusives: Constructor<AnyStatus>[] = [
		Stun, Blocking, Ragdolled, Attacking
	]

	///////////////////////////////////////////////////////////////////////////////////////////////
	private Combo: number = 1
    private readonly HumanoidRoot: Part = (this.Character.Instance as character).HumanoidRootPart
	protected OnConstruct(): void {}

	///////////////////////////////////////////////////////////////////////////////////////////////
	private LastM1: number = 0

	declare private AttackingSE: StatusEffect 
	declare private VoxelService: VoxelService

    declare private HitboxPart: Part
    declare private HitboxClass: Hitbox;

	protected OnConstructServer(): void {
		// Get Server Dependencies
		this.VoxelService = Dependency<VoxelService>()
		this.AttackingSE = Dependency<Components>().getComponent<CharacterServer>(this.Character.Instance)?.AttackingSE as Attacking

		// Create and Connect Hitbox
        this.HitboxPart = Make("Part", { Transparency: .8, BrickColor: BrickColor.Red(), Size: new Vector3(3, 6, 4) })
        this.HitboxClass = new Hitbox([this.HitboxPart])
        this.HitboxClass.PlayerEntered.Connect((...args) => this.OnHitboxHit(...args))
	}

	public OnStartServer(): void {
		this.Combo = tick() - this.LastM1 > 1.5? 1 : this.Combo 
		const cooldown = this.Combo === m1_anims.GetChildren().size()? 1 : .45	

		this.LastM1 = tick()
		this.AttackingSE.Start()

		SoundPlayer.PlaySoundAtPosition(
			m1_sound_folder.Swing.SoundId,
			this.HumanoidRoot.Position
		)

		this.StartClient(this.Combo)
		this.ApplyCooldown(cooldown)
		
		task.delay(.4, () => {
			this.AttackingSE.Stop()
			this.Combo = this.Combo + 1 > m1_anims.GetChildren().size()? 1 : this.Combo + 1
		})
	}

    private OnHitboxHit(character: character, part: Part) {
        if (character !== this.Character.Instance) {
			log(`Hit ${character}`)
		}
    }

	@Message({Type: "Event", Destination: "Server"})
	protected Hitbox() {
		// Calculate Hitbox Coordinate Frame
		let root_cf = this.HumanoidRoot.CFrame
		let target = root_cf.Position.add(root_cf.LookVector.mul(4)).add(new Vector3(0, 1, 0))
		let cf = CFrame.lookAlong(target, root_cf.LookVector)

		// Trigger Hitbox
        this.HitboxPart.CFrame = cf
        this.HitboxClass.Enable(.2)

        // If the last m1 in combo then trigger voxel hitbox
		if (this.Combo === m1_anims.GetChildren().size()) {
			let voxel_packet = this.VoxelService.VoxelizeInRadius(5, cf, 2)
			voxel_packet.velocity = this.HumanoidRoot.CFrame.LookVector.mul(20)
			this.VoxelService.PassVoxelsToClients(voxel_packet)
		}
	}

	///////////////////////////////////////////////////////////////////////////////////////////////
	declare private m1_anims: AnimationTrack[]
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
	}

	@Message({Type: "Event", Destination: "Client"})
	protected StartClient(combo: number) {
		log(`${combo}`, {Tag: "$combo: "})
		this.m1_anims[combo - 1].Play()
	}
}