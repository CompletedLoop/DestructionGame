import { Service, OnStart, Dependency } from "@flamework/core";
import { Players } from "services";
import { plr } from "types/Instances/plr";
import { DataService, PlayerProfile } from "./DataService";
import { Make } from "@rbxts/altmake";
import { Logger } from "shared/Modules/Logger";
import { Events, Functions } from "server/network";
import { PlayerSettings } from "types/Interfaces/PlayerSettings";
import { character } from "types/Instances/character";
import GetWCS_Character from "shared/Util/GetWSC_Character";
import { Components } from "@flamework/components";
import CharacterServer from "server/Components/CharacterServer";
import LoadCharacter from "shared/Util/LoadCharacter";

const log = new Logger("PlayerService").Logger

@Service({})
export class PlayerDataHandler implements OnStart {
	constructor(private readonly dataService: DataService) {}

	onStart() {
		task.spawn(() => Players.GetPlayers().forEach(this.playerAdded))
		Players.PlayerAdded.Connect(this.playerAdded)
		Players.PlayerRemoving.Connect(this.playerLeaving)

		// Allow players to load and save their settings
		Functions.GetLoadedPlayerSettings.setCallback((player: Player) => {
			return this.dataService.getProfileData(player).PlayerSettings
		})

		Events.UpdatePlayerSettings.connect((player: Player, PlayerSettings: PlayerSettings) => {
			this.dataService.setProfileData(player, "PlayerSettings", PlayerSettings)
		})

		Events.ReplicateCharacterTilt.connect(this.replicateCharacterTilt)
		Events.ChangeMoveset.connect(this.onMovesetChangeRequest)
    }

	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	private playerAdded(player: Player) {
		player.CharacterAdded.Connect((character) => {
			LoadCharacter(player).andThen(() => character.AddTag(`character`))
		})

		const player_profile = this.dataService.loadPlayerData(player as plr) as PlayerProfile
		this.generateLeaderstatsForPlayer(player as plr, player_profile)
		
		player.SetAttribute("LastMovesetChange", 0)
	}

    private playerLeaving(player: Player) {
		this.dataService.releasePlayerProfile(player as plr)
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

	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	/**
	 *	Reloads the player's character and ensures that the old character is deleted and does not cause a memory leak 
	 */
	public reloadPlayerCharacter(player: Player | plr) {
		if (!player.Character) return
		player.Character?.SetAttribute("reloading", true)

		// Destroy the wsc character
		GetWCS_Character(player.Character as character)?.Destroy()

		// Destroy Character
		player.Character.Destroy()
		player.Character = undefined

		// Finally load the new character
		player.LoadCharacter()
	}

	private onMovesetChangeRequest(player: Player, Moveset: string) {
		// Verify that the player is allowed to switch movesets
		const difference = tick() - (player.GetAttribute("LastMovesetChange") as number)
		if (difference < 10) {
			log("Moveset Change Denied")
			Events.SendNotificationToPlayer(player, {
				Text: `Please wait ${tostring(math.round(10 - difference))} seconds.`,
				Title: "Switching too Fast!",
			})
			return
		}

		player.SetAttribute("LastMovesetChange", tick())
		
		const profile = this.dataService.getProfileData(player)
		profile.CurrentMoveset = Moveset
		
		task.wait(.5)
		this.reloadPlayerCharacter(player)
	}

	private replicateCharacterTilt(player: Player, JointC0: CFrame) {
		const character = player.Character as character
		if (character) {
			// TODO make another event that fires to all clients except this one so they can make them tilt on their screen
		}
	}
}