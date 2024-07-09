import { Service } from "@flamework/core";
import { Events } from "server/network";
import { ReplicatedStorage } from "services";
import { Constants } from "shared/Constants";
import { VoxelInfoPacket } from "types/VoxelInfoPacket";
import VoxBreaker from "shared/Luau/VoxBreaker"

@Service({})
export class VoxelService {
	VoxelizeInRadius(radius: number, cframe: CFrame, voxel_size: number, shape?: Enum.PartType): VoxelInfoPacket {
		let voxels = VoxBreaker.CreateHitbox(Vector3.one.mul(radius), cframe, shape || Enum.PartType.Ball, voxel_size, Constants.VOXEL_LIFETIME)
		return {
			voxels: voxels,
			origin: cframe,
			radius: radius,
			velocity: "default",
			power: 1
		}
	}
	
	PassVoxelsToClients(voxel_packet: VoxelInfoPacket) {
		// Replicate over the voxels
		voxel_packet.voxels.forEach((voxel: Part) => voxel.Parent = ReplicatedStorage)
		Events.Voxels.HandleVoxels.broadcast(voxel_packet)
	
		// Destroy all voxels since the client will handle them
		voxel_packet.voxels.forEach((voxel: Part) => {voxel.Destroy()})
	}
}
