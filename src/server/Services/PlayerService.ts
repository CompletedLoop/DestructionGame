import { Service, OnStart } from "@flamework/core";
import { Players } from "services";
import { plr } from "types/Instances/plr";
import { DataService, PlayerProfile } from "./DataService";
import { Make } from "@rbxts/altmake";
import { Logger } from "shared/Modules/Logger";
import { Events, Functions } from "server/network";
import { PlayerSettings } from "types/Interfaces/PlayerSettings";

const log = new Logger("PlayerService").Logger

@Service({})
export class PlayerDataHandler implements OnStart {
	constructor(private readonly dataService: DataService) {}

	public onStart() {
		task.spawn(() => Players.GetPlayers().forEach((player: Player) => this.playerAdded(player as plr)))
		Players.PlayerAdded.Connect((player) => this.playerAdded(player as plr))
		Players.PlayerRemoving.Connect((player) => this.playerLeaving(player as plr))

		// Allow players to load and save their settings
		Functions.GetLoadedPlayerSettings.setCallback((player: Player) => {
			return this.dataService.getProfileData(player).PlayerSettings
		})

		Events.UpdatePlayerSettings.connect((player: Player, PlayerSettings: PlayerSettings) => {
			this.dataService.setProfileData(player, "PlayerSettings", PlayerSettings)
		})
    }

	private playerAdded(player: plr) {
		player.CharacterAdded.Connect((character) => {
			character.AddTag(`character`)
		})

		const player_profile = this.dataService.loadPlayerData(player) as PlayerProfile
		this.generateLeaderstatsForPlayer(player, player_profile)
	}

    private playerLeaving(player: plr) {
		this.dataService.releasePlayerProfile(player)
    }

	private generateLeaderstatsForPlayer(player: plr, player_profile: PlayerProfile) {
		if (!player_profile) return
		const leaderstats = Make("Folder", {
			Name: "leaderstats",
			Parent: player,
			Children: [
				Make("NumberValue", { Name: "Kills", Value: player_profile.Data.Kills })
			] 
		})

		this.dataService.bindToPlayerDataValue(player, "Kills", () => {
			const kills = this.dataService.getProfileData(player).Kills
			player.leaderstats.Kills.Value = kills
			log(kills)
		})
	}
}