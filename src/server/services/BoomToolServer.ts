import { Service, OnStart, OnInit } from "@flamework/core";
import { Events } from "server/network";
import { plr } from "types/plr";
import { DestructionModule } from "../Modules/DestructionServer";

@Service({})
export class BoomToolServer implements OnStart {
	onStart() {
		Events.BoomTool.connect((player: Player, cframe: CFrame, radius: number , power: number) => {
			let voxels = DestructionModule.VoxelizeInRadius(radius, cframe, 3)
			DestructionModule.PassVoxelsToClients(voxels, cframe, power)
		})
	}
}