import { Networking } from "@flamework/networking";
import { character } from "types/Instances/character";
import { PlayerSettings} from "types/Interfaces/PlayerSettings";
import { VoxelInfoPacket } from "types/Interfaces/VoxelInfoPacket";

interface ClientToServerEvents {
	BoomTool(cframe: CFrame, radius: number, power: number): void
	UpdatePlayerSettings(PlayerSettings: PlayerSettings): void
	ChangeMoveset(Moveset: string): void
	ReplicateCharacterTilt: Networking.Unreliable<(JointC0: CFrame) => void>
}

interface ServerToClientEvents {
	Voxels: {
		HandleVoxels(voxel_packet: VoxelInfoPacket): void
		ClearVoxels(): void
	},

	SendNotificationToPlayer(NotificationInfo: SendNotificationConfig): void

	AddCharacterComponent(): void

	ReplicateCharacterTilt: Networking.Unreliable<(On: character, JointC0: CFrame) => void>
}

interface ClientToServerFunctions {
	GetLoadedPlayerSettings(): PlayerSettings

	Debug: {
		GetPing(): string
	}
}

interface ServerToClientFunctions {}

export const GlobalEvents = Networking.createEvent<ClientToServerEvents, ServerToClientEvents>();
export const GlobalFunctions = Networking.createFunction<ClientToServerFunctions, ServerToClientFunctions>();