import { Service, OnStart } from "@flamework/core";
import { Events } from "client/network";
import { Workspace } from "services";

@Service({})
export class DestructionClient implements OnStart {
	onStart() {
		Events.HandleVoxels.connect((replicated_voxels: Part[]) => {
			print("sup")
			print(replicated_voxels.size())
			let voxel_holder = this.cloneReplicatedVoxels(replicated_voxels)
			let voxels = voxel_holder.GetChildren()

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
		let velocity = CFrame.lookAt(voxel.Position, cframe.Position).LookVector.mul(-60 * (voxel.Mass/2))
		velocity.mul(power)
		velocity.mul(new Vector3(1, 2, 1))
		voxel.ApplyImpulse(velocity)
		voxel.ApplyAngularImpulse(velocity.div(2))
	}
}