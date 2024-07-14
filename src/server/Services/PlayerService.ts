import { Service, OnStart } from "@flamework/core";
import { Players } from "services";
import { plr } from "types/plr";
import { DataService } from "./DataService";

@Service({})
export class PlayerDataHandler implements OnStart {
	constructor(private DataService: DataService, private readonly dataService: DataService) {}

	onStart() {
		task.spawn(() => Players.GetPlayers().forEach((player: Player) => this.playerAdded(player as plr)))
		Players.PlayerAdded.Connect((player) => this.playerAdded(player as plr))
		Players.PlayerRemoving.Connect((player) => this.playerLeaving(player as plr))
    }

	playerAdded(player: plr) {
		player.CharacterAdded.Connect((character) => {
			character.AddTag(`character`)
		})

		const profile = this.dataService.loadPlayerData(player)
	}

    playerLeaving(player: plr) {
		this.DataService.releasePlayerProfile(player)
    }
}