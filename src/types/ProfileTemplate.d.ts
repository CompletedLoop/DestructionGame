import { PlayerSettings } from "./PlayerSettings"

export interface ProfileTemplate {
	Money: number, 
	Kills: number,

    Characters: string[]

    PlayerSettings: PlayerSettings
}
