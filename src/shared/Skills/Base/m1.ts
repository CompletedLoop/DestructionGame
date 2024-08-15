import { Players, ReplicatedStorage, RunService, Workspace } from "services";
import { AnyStatus, Character, Message, Skill, SkillDecorator, StatusEffect } from "@rbxts/wcs";
import { Components } from "@flamework/components";
import { Constructor } from "@rbxts/wcs/out/source/utility";
import { Dependency } from "@flamework/core"

// Status Effects
import Attacking from "shared/StatusEffects/Attacking";
import Blocking from "shared/StatusEffects/Blocking";
import Ragdolled from "shared/StatusEffects/Ragdolled";
import Stun from "shared/StatusEffects/Stun";

import { character } from "types/Instances/character";
import { Constants } from "shared/Constants";

// Modules
import { Logger } from "shared/Modules/Logger";
import { Make } from "@rbxts/altmake";
import SoundPlayer from "shared/Modules/SoundPlayer";
import Hitbox from "shared/Luau/Hitbox";

// Server Dependencies
import type VoxelService from "server/Services/VoxelService";
import type CharacterServer from "server/Components/CharacterServer";
import GetWCS_Character from "shared/Util/GetWSC_Character";
import Punched from "shared/VFX/Punched";

const log = new Logger("M1").Logger

const m1_animations_folder = ReplicatedStorage.Animations.m1s
const m1_sound_folder = ReplicatedStorage.Sounds.Base.M1

@SkillDecorator
export default class m1 extends Skill {
    // Skill config
	declare protected static readonly CheckedByOthers: false
	protected MutualExclusives: Constructor<AnyStatus>[] = [
		Stun, Blocking, Ragdolled, Attacking
	]

	///////////////////////////////////////////////////////////////////////////////////////////////
	private Combo: number = 1
	private LastM1: number = 0

    private readonly HumanoidRoot: () => Part = () => (this.Character.Instance as character).HumanoidRootPart
    private readonly Torso: () => Part = () => (this.Character.Instance as character).Torso

	protected OnConstruct(): void {}

	///////////////////////////////////////////////////////////////////////////////////////////////
	declare private AttackingSE: StatusEffect 
	declare private VoxelService: VoxelService

    declare private HitboxPart: Part
    declare private HitboxClass: Hitbox;

	declare private CharacterComponent: CharacterServer | undefined

	protected OnConstructServer(): void {
		// Get Server Dependencies
		this.VoxelService = Dependency<VoxelService>()
		this.CharacterComponent = Dependency<Components>().getComponent<CharacterServer>(this.Character.Instance)
		this.AttackingSE = this.CharacterComponent?.AttackingSE as Attacking

		// Create and Connect Hitbox
        this.HitboxPart = Make("Part", {
			Transparency: .5,
			BrickColor: BrickColor.Blue(),
			Size: new Vector3(6, 6, 7),
			Anchored: true,
			CanCollide: false,
		})
        this.HitboxClass = new Hitbox([this.HitboxPart])
        this.HitboxClass.PlayerEntered.Connect(this.OnHitboxHit)
	}

	public OnStartServer(): void {
		// Determine the current combo and the cooldown length
		this.Combo = tick() - this.LastM1 > 1.5? 1 : this.Combo 
		const cooldown = this.Combo === m1_animations_folder.GetChildren().size()? 1 : .45

		// Track the last m1 and apply the attacking status
		this.LastM1 = tick()
		this.AttackingSE.Start()

		// Play a swing sound
		SoundPlayer.PlaySoundAtPosition(
			m1_sound_folder.Swing,
			this.HumanoidRoot().Position
		)

		// Tell client that the m1 is approved and initiate the m1
		this.StartClient(this.Combo)
		this.ApplyCooldown(cooldown)
		
		Promise.delay(.4).andThen(this.advanceCombo)
	}
	
	/** After a delay, remove the Attacking status and increment the combo */
	private advanceCombo() {
		this.AttackingSE.Stop()
		this.Combo = this.Combo + 1 > m1_animations_folder.GetChildren().size()? 1 : this.Combo + 1
	}
	
	@Message({Type: "Event", Destination: "Server"})
	protected Hitbox(at: CFrame) {
		// Check provided cframe
		
		// Trigger Hitbox
        this.HitboxPart.CFrame = at
		this.HitboxPart.Orientation = this.HitboxPart.Orientation.mul(new Vector3(1, 1, 0))
        this.HitboxClass.Enable(Constants.HITBOX_LIFETIME)
		
		// Show Htibox
		if (Workspace.GameConfig.GetAttribute("Show_Hitboxes")) {
			this.HitboxPart.Parent = Workspace
			task.delay(Constants.HITBOX_LIFETIME, () => this.HitboxPart.Parent = undefined)
		}
		
        // If the last m1 in combo then trigger voxel hitbox
		if (this.Combo === m1_animations_folder.GetChildren().size()) {
			let voxel_packet = this.VoxelService.VoxelizeInRadius(5, at, 2)
			voxel_packet.velocity = this.HumanoidRoot().CFrame.LookVector.mul(20)
			this.VoxelService.PassVoxelsToClients(voxel_packet)
		}
	}
	
	private OnHitboxHit(character: character, BodyPart: Part) {
		// Checks
		if (character === this.Character.Instance) return

		const distance = character.GetPivot().Position.sub(this.HumanoidRoot().Position).Magnitude
		if (distance > 15) return
		
		this.registerHit(character, BodyPart)
	}
	
	private registerHit(On: character, BodyPart: Part) {
		// Play Hit Sound
		SoundPlayer.PlaySoundAtPosition(
			m1_sound_folder.Hit,
			On.GetPivot().Position
		)

		log(`Hit ${On}`)
		
		// Get WSC Character and do the rest
		GetWCS_Character(On).andThen((WCS_Character: Character) => {
			if (WCS_Character) {
				// Create Punch Effect
				new Punched(WCS_Character.Instance as character).Start(Players.GetPlayers())
				
				// Deal Damage
				WCS_Character.Humanoid.TakeDamage(3.5)
				// WCS_Character.TakeDamage({Damage: 3.5, Source: })

				// Push players forwards/back
				const velocity = CFrame.lookAt(this.HumanoidRoot().Position, On.GetPivot().Position).LookVector.mul(60)
				// On.Torso.AssemblyLinearVelocity = On.Torso.AssemblyLinearVelocity.add(velocity)
				this.HitCharacter(On, velocity)
			}
		})
	}
	
	///////////////////////////////////////////////////////////////////////////////////////////////
	declare private m1_animations: AnimationTrack[]
	protected OnConstructClient(): void {
		const animator = this.Character.Humanoid.FindFirstChildOfClass("Animator") as Animator
		if (!animator) return;
		
		// Load animations into a array that can be indexed by the current combo
		this.m1_animations = []
		m1_animations_folder.GetChildren().forEach((m1) => {
			let anim = animator.LoadAnimation(m1 as Animation)
			anim.Priority = Enum.AnimationPriority.Action3
			this.m1_animations[tonumber(m1.Name.sub(2, 2)) as number - 1] = anim
			
			// Trigger event to server to fire hitbox
			anim.GetMarkerReachedSignal("Hitbox").Connect(
				() => this.Hitbox(this.calculateHitboxCFrame())
			)
		})
	}

	private calculateHitboxCFrame() {
		const HumanoindRootCFrame = this.HumanoidRoot().CFrame
		const TargetPosition = HumanoindRootCFrame.Position.add(HumanoindRootCFrame.LookVector.mul(3))//.sub(new Vector3(0, 1, 0))
		const finalCFrame = CFrame.lookAlong(TargetPosition, HumanoindRootCFrame.LookVector) 
		return finalCFrame
	}
	
	@Message({Type: "Event", Destination: "Client"})
	protected StartClient(combo: number) {
		log(`${combo}`, {Tag: "$combo: "})
		this.m1_animations[combo - 1].Play()
	}

	@Message({Type: "Event", Destination: "Client"})
	protected HitCharacter(char: character, velocity: Vector3) {
		this.Torso().AssemblyLinearVelocity = this.Torso().AssemblyLinearVelocity.add(velocity)
	}
}