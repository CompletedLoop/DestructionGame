import { Players } from "@rbxts/services";
import { Service } from "@flamework/core";
import ProfileService from "@rbxts/profileservice";
import { Profile } from "@rbxts/profileservice/globals";
import { plr } from "types/Instances/plr";
import { Logger } from "shared/Modules/Logger";
import Signal from "@rbxts/goodsignal";
import { PlayerSettings } from "types/Interfaces/PlayerSettings";

const log = new Logger("DataService").Logger

const PlayerSetttingsDefaults: PlayerSettings = {
	AutoRun: false,

	Shadows: true,
	DestructionFX: true,
	
	FXVolume: .5,
	
	KillSoundID: 0,
	FOV: 75,
	
	FPS: true,
	PING: false,
	REG: true
}
export const ProfileTemplateDefaults = {
	Kills: 0,
	Money: 0,
	
	Characters: [],
	
	PlayerSettings: PlayerSetttingsDefaults
}

export type ProfileTemplate = typeof ProfileTemplateDefaults
export type PlayerProfile = Profile<ProfileTemplate>

const ProfileStore = ProfileService.GetProfileStore("PlayerData", ProfileTemplateDefaults)

type keyof_Template = keyof typeof ProfileTemplateDefaults
type Connection = { index: keyof_Template, callback: (value: any) => void}

@Service({})
export class DataService {
	public Profiles: {[UserId: number]: PlayerProfile | undefined} = {}
	private Connections: {[UserId: number]: Connection[]} = {}

	///////////////////////////////////////////////////////////////////////////////////////////////
	public loadPlayerData(player: plr): PlayerProfile | undefined {
		const player_profile = ProfileStore.LoadProfileAsync(`Player_${player.UserId}`)

		if (player_profile !== undefined) {
			player_profile.AddUserId(player.UserId)
			player_profile.Reconcile()

			player_profile.ListenToRelease(() => { this.Profiles[player.UserId] = undefined })

			if (player.IsDescendantOf(Players)) {
				this.Profiles[player.UserId] = player_profile
				this.Connections[player.UserId] = []

				// log(player_profile)
				return player_profile
			} else {
				player_profile.Release()
			}
		} else {
			player.Kick("Error loading player data")
		}
	}

	public releasePlayerProfile(player: plr) {
		const player_profile = this.Profiles[player.UserId]
		if (player_profile) player_profile.Release()
	}

	///////////////////////////////////////////////////////////////////////////////////////////////
	public getProfileData(player: Player) {
		const player_profile = this.Profiles[player.UserId]
		assert(player_profile, `Profile for ${player.Name} does not exist`)
		return player_profile.Data
	}

	public setProfileData(player: Player, index: keyof_Template, value: any) {
		const player_profile = this.Profiles[player.UserId]
		assert(player_profile, `Profile for ${player.Name} does not exist`)

		player_profile.Data[index] = value

		// Fire connections
		let player_data_connections = this.Connections[player.UserId]
		player_data_connections.forEach((connection: Connection) => {
			if (connection.index === index) {
				connection.callback(value)
			}
		})
	}

	public bindToPlayerDataValue(player: Player, index: keyof_Template, callback: Callback) {
		let profile = this.Profiles[player.UserId]
		if (!profile) return

		let player_connections = this.Connections[player.UserId]
		let connection: Connection = {index: index, callback: callback}
		player_connections.insert(player_connections.size(), connection) 
	}
}