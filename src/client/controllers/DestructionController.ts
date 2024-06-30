import { Controller, OnStart } from "@flamework/core";
import { Events } from "client/network";
import { Workspace, ReplicatedStorage } from "services";
import { Constants } from "shared/Constants";

@Controller({})
export class DestructionClient implements OnStart {
	onStart() {
		Events.HandleVoxels.connect((replicated_voxels, cframe, power) => 
			this.handleVoxels(replicated_voxels, cframe, power))

		{}
		(ReplicatedStorage.COMMUNICATION.WaitForChild("ClearVoxels") as RemoteEvent).OnClientEvent.Connect(() =>
		Workspace.FX.Voxels.ClearAllChildren())
	}

	handleVoxels(replicated_voxels: Part[], cframe: CFrame, power: number) {
		let voxel_holder = this.cloneReplicatedVoxels(replicated_voxels)
		let voxels = voxel_holder.GetChildren() as Part[]
		// let voxels = replicated_voxels

		let voxel_count = 0

		voxels.forEach((voxel: Part) => {
			if (voxel_count >= Constants.MAX_DEBRIS) {
				voxel.Destroy()
				return
			}

			voxel_count += 1

			voxel.Size = voxel.Size.mul(.95)
			voxel.Anchored = false
			voxel.CanCollide = true

			this.applyForceToVoxel(voxel, cframe, power)
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
		let velocity = CFrame.lookAt(voxel.Position, cframe.Position).LookVector.mul((-60 * (voxel.Mass/2)))
		velocity = velocity.mul(new Vector3(1, 20, 1).mul(power))
		voxel.ApplyImpulse(velocity)
		// voxel.ApplyAngularImpulse(velocity.div(2))
	}
}