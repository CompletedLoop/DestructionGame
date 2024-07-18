import { Workspace, ReplicatedStorage, TweenService, RunService } from "services";
import { Controller, OnStart } from "@flamework/core";
import { Events } from "client/network";
import { Constants } from "shared/Constants";
import { Logger } from "shared/Modules/Logger";
import { VoxelInfoPacket } from "types/Interfaces/VoxelInfoPacket";
import TimedConnection from "shared/Modules/TimedConnection";
import SoundPlayer from "shared/Modules/SoundPlayer";

const DestructionSounds = ReplicatedStorage.Sounds.DestructionSounds

const oparams = new OverlapParams()
oparams.FilterDescendantsInstances = [Workspace.FX.Voxels]
oparams.FilterType = Enum.RaycastFilterType.Include

const log = new Logger("VoxelsController").Logger

@Controller({})
export default class VoxelsController implements OnStart {
	onStart() {
		Events.Voxels.HandleVoxels.connect((...args) => this.handleVoxels(...args))
		Events.Voxels.ClearVoxels.connect(() => Workspace.FX.Voxels.ClearAllChildren())
		new TimedConnection(RunService.Stepped, () => this.anchorDormantVoxels(), 1)
	}

	handleVoxels(voxel_packet: VoxelInfoPacket) {
		let voxel_holder = this.cloneReplicatedVoxels(voxel_packet.voxels)
		let voxels = voxel_holder.GetChildren() as Part[]

		let voxel_count = 0

		// Get surrounding voxels
		let result = Workspace.GetPartBoundsInRadius(
			voxel_packet.origin.Position,
			voxel_packet.radius, oparams
		) as Part[]
		if (result) {
			result.forEach((voxel: Part) => {
				if (voxel.GetAttribute("_voxel")) {
					voxels.insert(0, voxel)
				}
			})
		}

		voxel_packet.voxels = voxels

		this.playDestructionSoundsFromVoxelPacket(voxel_packet)

		// Loop through voxels
		voxel_packet.voxels.forEach((voxel: Part) => {
			if (voxel_count >= Constants.MAX_DEBRIS) {
				voxel.Destroy()
				return
			}

			voxel_count += 1

			voxel.Anchored = false
			voxel.CanCollide = true
			if (!voxel.GetAttribute("_voxel")) voxel.Size = voxel.Size.mul(.95)

			voxel.CustomPhysicalProperties = new PhysicalProperties(
				voxel.CurrentPhysicalProperties.Density,
				0.2,
				voxel.CurrentPhysicalProperties.Elasticity
			)

			voxel.SetAttribute("_voxel", true)

			if (voxel_packet.velocity === "default") {
				this.applyForceToVoxel(voxel, voxel_packet.origin, voxel_packet.power)
			} else {
				voxel.AssemblyLinearVelocity = voxel_packet.velocity
			}
		})
		
		// log(`Processed ${voxels.size()} voxels`)

		// Fade voxels out and destroy
		task.delay(Constants.VOXEL_LIFETIME, () => {
			if (!voxel_holder) return

			voxel_packet.voxels.forEach((voxel: Part) => {
				voxel.CollisionGroup = "Debris"
				TweenService.Create(voxel, new TweenInfo(1), {Transparency: 1}).Play()
			})

			task.wait(2)
			voxel_holder.Destroy()
		})
	}

	cloneReplicatedVoxels(voxels: Part[]): Model {
		let voxel_holder = new Instance("Model")
		if (voxels.size() < 1) return voxel_holder

		voxels.forEach((voxel: Part) => {
			let voxel_clone = voxel.Clone()
			voxel_clone.Parent = voxel_holder
		})
		voxel_holder.Parent = Workspace.FX.Voxels
		return voxel_holder
	}

	playDestructionSoundsFromVoxelPacket(voxel_packet: VoxelInfoPacket) {
		let sound_table: { [x: string]: boolean; } = {}

		voxel_packet.voxels.forEach((voxel: Part) => {
			const voxel_material = voxel.Material.Name

			if (!sound_table[voxel_material] && !voxel.GetAttribute("_voxel")) {
				let sound_folder = DestructionSounds.FindFirstChild(voxel_material)
				if (!sound_folder) sound_folder = DestructionSounds.Concrete
				
				sound_table[voxel_material] = true

				const children = sound_folder.GetChildren() as Sound[]
				const sound = children[math.random(1, children.size()) - 1]

				SoundPlayer.PlaySoundAtPosition(sound.SoundId, voxel_packet.origin.Position)
			}
		})
	}

	applyForceToVoxel(voxel: Part, cframe: CFrame, power?: number) {
		let velocity = CFrame.lookAt(cframe.Position, voxel.Position).LookVector.mul(( 10 * (voxel.Mass) ))
		if (power) velocity = velocity.mul( power || 1 )
		velocity = velocity.add(new Vector3(0, 20, 0))
		voxel.AssemblyLinearVelocity = velocity.mul(new Vector3(1, 1, 1))
	}

	anchorDormantVoxels() {
		let count = 0;
		(Workspace.FX.Voxels.GetDescendants() as Part[]).forEach((voxel: Part) => {
			if (voxel.GetAttribute("_voxel")) {
				if (!voxel.Anchored){
					if (voxel.AssemblyLinearVelocity.Magnitude < .1) {
						voxel.Anchored = true
						voxel.AssemblyLinearVelocity = Vector3.zero
						count += 1
					}
				}
			}
		})
		if (count > 0) log(`Anchored ${count} dormant voxels`)
	}
}