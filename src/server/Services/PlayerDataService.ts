import { Service, OnStart, OnInit } from "@flamework/core";
import { Character } from "@rbxts/wcs";
import { Players } from "services";
import { Base } from "shared/Movesets/Base";
import { plr } from "types/plr";
@Service({})
export class PlayerDataHandler implements OnStart {
	onStart() {
		Players.PlayerAdded.Connect((player) => this.playerAdded(player as plr))
	}

	playerAdded(player: plr) {
		player.CharacterAdded.Connect((character) => {
			character.AddTag(`character`)
		})
	}
}