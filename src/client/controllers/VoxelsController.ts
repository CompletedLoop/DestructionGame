import { Controller, OnStart } from "@flamework/core";
import { Events } from "client/network";
import { Workspace, ReplicatedStorage, TweenService } from "services";
import { Constants } from "shared/Constants";
import { LogClass } from "shared/Modules/Logger";
import { VoxelInfoPacket } from "types/VoxelInfoPacket";

const oparams = new OverlapParams()
oparams.FilterDescendantsInstances = [Workspace.FX.Voxels]
oparams.FilterType = Enum.RaycastFilterType.Include

const debug = false
const log = new LogClass("VoxelsController", "Brackets", () => {
	if (debug) return true
	else return false
}).Logger

@Controller({})
export class DestructionClient implements OnStart {
	onStart() {
		Events.Voxels.HandleVoxels.connect((...args) => this.handleVoxels(...args))
		Events.Voxels.ClearVoxels.connect(() => Workspace.FX.Voxels.ClearAllChildren())
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
					voxels.push(voxel)
				}
			})
		}

		// Loop through voxels
		voxels.forEach((voxel: Part) => {
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
				0.3,
				voxel.CurrentPhysicalProperties.Elasticity
			)

			voxel.SetAttribute("_voxel", true)

			if (voxel_packet.velocity === "default") {
				this.applyForceToVoxel(voxel, voxel_packet.origin, voxel_packet.power)
			} else {
				voxel.AssemblyLinearVelocity = voxel_packet.velocity
			}
		})
		
		log(`Processed ${voxels.size()} voxels`)

		// Freeze voxels after a moment to optimize
		// task.delay(.2, () => {
		// 	voxels.forEach((voxel: Part) => {
		// 		voxel.Anchored = true
		// 	})
		// })

		// Fade voxels out
		task.delay(Constants.VOXEL_LIFETIME, () => {
			if (!voxel_holder) return

			voxels.forEach((voxel: Part) => {
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

	applyForceToVoxel(voxel: Part, cframe: CFrame, power?: number) {
		let velocity = CFrame.lookAt(voxel.Position, cframe.Position).LookVector.mul((-10 * (voxel.Mass)))
		if (power) velocity = velocity.mul(power || 1)
		velocity = velocity.add(new Vector3(0, 2, 0))
		voxel.AssemblyLinearVelocity = velocity
		// voxel.ApplyImpulse(velocity)
	}
}