import { Service } from "@flamework/core";
import { Events } from "server/network";
import { ReplicatedStorage, Workspace } from "services";
import { Constants } from "shared/Constants";
import { VoxelInfoPacket } from "types/Interfaces/VoxelInfoPacket";
import VoxBreaker from "shared/Luau/VoxBreaker"
import PartCacheModule from "@rbxts/partcache";

const SoundPartCache = new PartCacheModule(ReplicatedStorage.SoundPart, 100)
SoundPartCache.SetCacheParent(Workspace.FX.SFX)

@Service({})
export class VoxelService {
	public VoxelizeInRadius(radius: number, cframe: CFrame, voxel_size: number, shape?: Enum.PartType): VoxelInfoPacket {
		let voxels = VoxBreaker.CreateHitbox(Vector3.one.mul(radius), cframe, shape || Enum.PartType.Ball, voxel_size, Constants.VOXEL_LIFETIME)
		return {
			voxels: voxels,
			origin: cframe,
			radius: radius,
			velocity: "default",
			power: 1
		}
	}

	public PlayDestructionSoundFromVoxels(position: Vector3, voxel_packet: VoxelInfoPacket) {
		let sound_table: { [x: string]: boolean; } = {}

		voxel_packet.voxels.forEach((voxel: Part) => {
			const voxel_material = voxel.Material.Name

			if (!sound_table[voxel_material]) {
				const SoundPart = SoundPartCache.GetPart()
				SoundPart.Position = position
				
				let sound_folder = SoundPart.FindFirstChild(voxel_material)
				if (!sound_folder) sound_folder = SoundPart.Concrete

				sound_table[voxel_material] = true

				const children = sound_folder.GetChildren() as Sound[]
				const sound = children[math.random(1, children.size()) - 1]
				sound.Play()
				
				task.delay(2, () => SoundPartCache.ReturnPart(SoundPart))
			}
		})
	}
	
	public PassVoxelsToClients(voxel_packet: VoxelInfoPacket) {
		// Replicate over the voxels
		voxel_packet.voxels.forEach((voxel: Part) => voxel.Parent = ReplicatedStorage)
		Events.Voxels.HandleVoxels.broadcast(voxel_packet)
	
		// Destroy all voxels since the client will handle them
		voxel_packet.voxels.forEach((voxel: Part) => {voxel.Destroy()})
	}
}
