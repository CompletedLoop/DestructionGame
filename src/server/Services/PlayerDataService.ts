import { Service, OnStart } from "@flamework/core";
import { Players } from "services";
import { plr } from "types/plr";

@Service({})
export class PlayerDataHandler implements OnStart {
	onStart() {
		Players.PlayerAdded.Connect((player) => this.playerAdded(player as plr))
		Players.PlayerRemoving.Connect((player) => this.playerLeaving(player as plr))
    }

	playerAdded(player: plr) {
		player.CharacterAdded.Connect((character) => {
			character.AddTag(`character`)
		})
	}

    playerLeaving(player: plr) {

    }
}
