import { Controller, OnStart } from "@flamework/core";
import { Events } from "client/network";
import { Workspace, ReplicatedStorage, TweenService } from "services";
import { Constants } from "shared/Constants";
import { VoxelInfoPacket } from "types/VoxelInfoPacket";

let oparams = new OverlapParams()
oparams.FilterDescendantsInstances = [Workspace.FX.Voxels]
oparams.FilterType = Enum.RaycastFilterType.Include

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
		let result = Workspace.GetPartBoundsInRadius(voxel_packet.origin.Position, voxel_packet.radius, oparams) as Part[]
		if (result) {
			result.forEach((voxel: Part) => {
				if (voxel.GetAttribute("_voxel")) {
					voxels.insert(1, voxel)
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

			voxel.SetAttribute("_voxel", true)

			if (voxel_packet.velocity === "default") {
				this.applyForceToVoxel(voxel, voxel_packet.origin, voxel_packet.power)
			} else {
				voxel.AssemblyLinearVelocity = voxel_packet.velocity
			}
		})

		// Freeze voxels after a moment to optimize
		task.delay(4, () => {
			voxels.forEach((voxel: Part) => {
				voxel.Anchored = true
			})
		})

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
		let velocity = CFrame.lookAt(voxel.Position, cframe.Position).LookVector.mul((-40 * (voxel.Mass/2)))
		velocity = velocity.mul(new Vector3(1, 2, 1))
		if (power) velocity = velocity.mul(power)
		voxel.AssemblyLinearVelocity = velocity.div(1)
		// voxel.ApplyImpulse(velocity)
	}
}