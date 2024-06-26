export interface plr extends Player {
	leaderstats: Folder & {
		Money: NumberValue,
		Kills: NumberValue,
	}
}