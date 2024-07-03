import { Service, OnStart, OnInit } from "@flamework/core";
import { Events } from "server/network";
import { plr } from "types/plr";
import { DestructionModule } from "../ServerModules/VoxelsServer";
import { Players } from "services";
import VoxelDestruct from "shared/Luau/VoxelDestruct";

@Service({})
export class BoomToolServer implements OnStart {
	onStart() {
		Events.BoomTool.connect((player: Player, cframe: CFrame, radius: number , power: number) => {
			// let voxels = VoxelDestruct.DestroyInRadius(radius, cframe)
			// voxels.forEach((voxel: Part) => {
			// 	voxel.SetNetworkOwner(Players.GetPlayers()[math.random(1, Players.GetPlayers().size()) - 1])
			// 	voxel.Size = voxel.Size.mul(.95)

				
			// 	Events.HandleVoxels.broadcast(voxels, cframe, power)
			// })


			let voxels = DestructionModule.VoxelizeInRadius(radius, cframe, 3)
			DestructionModule.PassVoxelsToClients(voxels, radius, cframe, power)
		})
	}
}