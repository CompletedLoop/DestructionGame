import { Players } from "@rbxts/services";
import { Service } from "@flamework/core";
import ProfileService from "@rbxts/profileservice";
import { Profile } from "@rbxts/profileservice/globals";
import { plr } from "types/plr";
import { Logger } from "shared/Modules/Logger";

const log = new Logger("DataService").Logger

export const ProfileTemplateDefaults = {
	Kills: 0,
	Money: 0,
	
	Characters: [],
	
	PlayerSettings: {
		Shadows: true,
		DestructionFX: true,
		
		FXVolume: .5,
		
		KillSoundID: 0,
		FOV: 75,
		
		FPS: true,
		PING: false,
		REG: true
	}
}

export type ProfileTemplate = typeof ProfileTemplateDefaults
export type PlayerProfile = Profile<ProfileTemplate> | undefined

const ProfileStore = ProfileService.GetProfileStore("PlayerData", ProfileTemplateDefaults)

@Service({})
export class DataService {
	public Profiles: {[UserId: number]: PlayerProfile} = {}

	public loadPlayerData(player: plr): PlayerProfile {
		const player_profile = ProfileStore.LoadProfileAsync(`Player_${player.UserId}`)

		if (player_profile !== undefined) {
			player_profile.AddUserId(player.UserId)
			player_profile.Reconcile()

			player_profile.ListenToRelease(() => {this.Profiles[player.UserId] = undefined})

			if (player.IsDescendantOf(Players)) {
				this.Profiles[player.UserId] = player_profile

				log(player_profile)
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
}