import { Players, ReplicatedStorage, Workspace } from "services";
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
import type Dummy from "server/Components/Dummy";

import GetWCS_Character from "shared/Util/GetWSC_Character";
import Hit from "shared/VFX/Hit";

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
    // private readonly Torso: () => Part = () => (this.Character.Instance as character).Torso
    
    private CalculateKnockback(On: character): {direction: Vector3, force: number} {
        const current_position = this.HumanoidRoot().Position
        const direction = CFrame.lookAt(current_position, On.GetPivot().Position).LookVector
        const force = 15

        return {direction, force}
    }

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
			Transparency: .6,
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

    /** Prevents laggy players and expoiters from hitting too far away */
    private HitboxDistanceCheck(position: Vector3): boolean {
        if (this.Player) {
            // const distance = this.character.GetPivot().Position.sub(this.HumanoidRoot().Position).Magnitude
            const distance = this.Player.DistanceFromCharacter(position)
            if (distance > 15) return false
            else return true
        } else return false // idk why player would be undefined but yuh
    }
	
	@Message({Type: "Event", Destination: "Server"})
	protected Hitbox(at: CFrame) {
		// Check provided cframe
        if (!this.HitboxDistanceCheck(at.Position)) return
		
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
	
	private OnHitboxHit(character: character) {
		// Sanity Check
		if (character === this.Character.Instance) return

        // Distance check
        if (!this.HitboxDistanceCheck(character.GetPivot().Position)) return
		
		// Finally register the hit
		this.registerHit(character)
	}
	
	private registerHit(On: character) {
		GetWCS_Character(On).andThen((WCS_Character: Character) => {
			if (!WCS_Character) return

            // Get Character Component
            const CharacterComponent = On.IsDescendantOf(Workspace.Characters.Dummies)?
            Dependency<Components>().getComponent<Dummy>(On) :
            Dependency<Components>().getComponent<CharacterServer>(On)

            if (!CharacterComponent) return

            // Create Punch Effect
            new Hit(On).Start(Players.GetPlayers())
            
            // Play Hit Sound
            SoundPlayer.PlaySoundAtPosition(
                m1_sound_folder.Hit,
                On.GetPivot().Position
            )
            
            // Deal Damage
            WCS_Character.Humanoid.TakeDamage(3.5)
            // WCS_Character.TakeDamage({Damage: 3.5, Source: })
            
            // Push both Characters
            const knockback = this.CalculateKnockback(On)

            // CharacterComponent.setNetworkOwnerForDuration(this.Player, .5)
            
            task.defer(() => {
                this.CharacterComponent?.push(knockback.direction, knockback.force, .1)
                CharacterComponent.push(knockback.direction, knockback.force, .1)
            })
		})

		log(`Hit ${On}`)
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
		const TargetPosition = HumanoindRootCFrame.Position.add(HumanoindRootCFrame.LookVector.mul(3))
		const finalCFrame = CFrame.lookAlong(TargetPosition, HumanoindRootCFrame.LookVector) 
		return finalCFrame
	}
	
	@Message({Type: "Event", Destination: "Client"})
	protected StartClient(combo: number) {
		log(`${combo}`, {Tag: "$combo: "})
		this.m1_animations[combo - 1].Play()
	}

	@Message({Type: "Event", Destination: "Client"})
	protected HitCharacter(On: character) {
		// const lookDirection = CFrame.lookAt(this.HumanoidRoot().Position, On.GetPivot().Position).LookVector
		// const MoveTo = this.HumanoidRoot().Position.add(lookDirection.mul(10))
		// this.Torso().AssemblyLinearVelocity = this.Torso().AssemblyLinearVelocity.add(velocity)
		// On.Torso.AssemblyLinearVelocity = On.Torso.AssemblyLinearVelocity.add(velocity)
	}
}
