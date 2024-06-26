import { Service, OnStart, OnInit } from "@flamework/core";
import { Events } from "server/network";
import { plr } from "types/plr";

@Service({})
export class BoomToolServer implements OnStart {
	onStart() {
		Events.BoomTool.connect((player: Player, cframe: CFrame, radius: number | undefined, power: number) => {
			print(radius)
		})
	}
}