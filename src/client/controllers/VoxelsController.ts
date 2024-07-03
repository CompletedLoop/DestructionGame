import { Controller, OnStart } from "@flamework/core";
import { Events } from "client/network";
import { Workspace, ReplicatedStorage, TweenService } from "services";
import { Constants } from "shared/Constants";

let oparams = new OverlapParams()
oparams.FilterDescendantsInstances = [Workspace.FX.Voxels]
oparams.FilterType = Enum.RaycastFilterType.Include

@Controller({})
export class DestructionClient implements OnStart {
	onStart() {
		Events.Voxels.HandleVoxels.connect((...args) => this.handleVoxels(...args))
		Events.Voxels.ClearVoxels.connect(() => Workspace.FX.Voxels.ClearAllChildren())
	}

	handleVoxels(replicated_voxels: Part[], radius: number, cframe: CFrame, power: number) {
		let voxel_holder = this.cloneReplicatedVoxels(replicated_voxels)
		let voxels = voxel_holder.GetChildren() as Part[]

		let voxel_count = 0

		// Get surrounding voxels
		let result = Workspace.GetPartBoundsInRadius(cframe.Position, radius, oparams) as Part[]
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

			this.applyForceToVoxel(voxel, cframe, power)
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
		voxels.forEach((voxel: Part) => {
			let voxel_clone = voxel.Clone()
			voxel_clone.Parent = voxel_holder
		})
		voxel_holder.Parent = Workspace.FX.Voxels
		return voxel_holder
	}

	applyForceToVoxel(voxel: Part, cframe: CFrame, power: number) {
		let velocity = CFrame.lookAt(voxel.Position, cframe.Position).LookVector.mul((-40 * (voxel.Mass/2)))
		velocity = velocity.mul(new Vector3(1, 2, 1).mul(power))
		// voxel.AssemblyLinearVelocity = velocity.div(1)
		voxel.ApplyImpulse(velocity)
	}
}