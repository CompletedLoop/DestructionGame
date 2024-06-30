import { Service, OnStart, OnInit } from "@flamework/core";
import { Events } from "server/network";
import { plr } from "types/plr";
import { DestructionModule } from "../Modules/DestructionServer";
import VoxelModule from "shared/Luau/VoxelModule";

@Service({})
export class BoomToolServer implements OnStart {
	onStart() {
		Events.BoomTool.connect((player: Player, cframe: CFrame, radius: number , power: number) => {
			let voxels = VoxelModule.DestroyInRadius(radius, cframe)
			voxels.forEach((voxel: Part) => {
				// voxel.Anchored = false
				voxel.Size = voxel.Size.mul(.95)
				let velocity = CFrame.lookAt(voxel.Position, cframe.Position).LookVector.mul(-(-60 * (voxel.Mass/2)))
				velocity = velocity.mul(new Vector3(1, 2, 1).mul(power))
				voxel.ApplyImpulse(velocity)
			})


			// let voxels = DestructionModule.VoxelizeInRadius(radius, cframe, 3)
			// DestructionModule.PassVoxelsToClients(voxels, cframe, power)
		})
	}
}