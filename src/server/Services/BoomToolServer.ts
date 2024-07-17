import { Service, OnStart, OnInit } from "@flamework/core";
import { Events } from "server/network";
import { plr } from "types/Instances/plr";
import { Players } from "services";
import VoxelDestruct from "shared/Luau/VoxelDestruct";
import { VoxelService } from "./VoxelService";

@Service({})
export class BoomToolServer implements OnStart {
	constructor(private readonly voxelsService: VoxelService) {}

	onStart() {
		Events.BoomTool.connect((player: Player, cframe: CFrame, radius: number , power: number) => {
			// let voxels = VoxelDestruct.DestroyInRadius(radius, cframe)
			// voxels.forEach((voxel: Part) => {
			// 	voxel.SetNetworkOwner(Players.GetPlayers()[math.random(1, Players.GetPlayers().size()) - 1])
			// 	voxel.Size = voxel.Size.mul(.95)

				
			// 	Events.HandleVoxels.broadcast(voxels, cframe, power)
			// })

			let voxel_packet = this.voxelsService.VoxelizeInRadius(radius, cframe, 3)
			voxel_packet.power = power
			this.voxelsService.PassVoxelsToClients(voxel_packet)
		})
	}
}