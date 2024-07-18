import { character } from "./character"

export interface plr extends Player {
	leaderstats: Folder & {
		Money: NumberValue,
		Kills: NumberValue,
	},

	PlayerGui: PlayerGui

	Character: character
}