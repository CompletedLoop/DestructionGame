import { Events } from "server/network";
import VoxBreaker from "../../shared/VoxBreaker"
import { ReplicatedStorage } from "services";

const VOXEL_LIFETIME = 25

class DestructionModuleClass {
	VoxelizeInRadius(radius: number, cframe: CFrame, voxel_size: number) {
		let voxels = VoxBreaker.CreateHitbox(Vector3.one.mul(radius), cframe, Enum.PartType.Ball, voxel_size, VOXEL_LIFETIME)
		return voxels
	}

	PassVoxelsToClients(voxels: Part[]) {
		if (!voxels[0]) {return}
		voxels[0].Parent = ReplicatedStorage // Replicate over the voxels
		Events.HandleVoxels.broadcast(voxels)

		// Destroy all voxels since the client will handel them
		voxels.forEach((voxel: Part) => {voxel.Destroy()})
	}
}

export const DestructionModule = new DestructionModuleClass()