import { Events } from "server/network";
import VoxBreaker from "shared/Luau/VoxBreaker"
import { ReplicatedStorage } from "services";
import { Constants } from "shared/Constants";

class DestructionModuleClass {
	VoxelizeInRadius(radius: number, cframe: CFrame, voxel_size: number) {
		let voxels = VoxBreaker.CreateHitbox(Vector3.one.mul(radius), cframe, Enum.PartType.Ball, voxel_size, Constants.VOXEL_LIFETIME)
		return voxels
	}

	PassVoxelsToClients(voxels: Part[], radius: number, cframe: CFrame, power: number) {
		if (voxels.size() < 1) {return}

		// Replicate over the voxels
		voxels.forEach((voxel: Part) => {voxel.CanCollide = false;voxel.Parent = ReplicatedStorage})
		Events.Voxels.HandleVoxels.broadcast(voxels, radius, cframe, power)

		// Destroy all voxels since the client will handel them
		voxels.forEach((voxel: Part) => {voxel.Destroy()})
	}
}

export const DestructionModule = new DestructionModuleClass()