import { Networking } from "@flamework/networking";
import { PlayerSettings} from "types/Interfaces/PlayerSettings";
import { VoxelInfoPacket } from "types/Interfaces/VoxelInfoPacket";

interface ClientToServerEvents {
	BoomTool(cframe: CFrame, radius: number, power: number): void,
	UpdatePlayerSettings(PlayerSettings: PlayerSettings): void
}

interface ServerToClientEvents {
	Voxels: {
		HandleVoxels(voxel_packet: VoxelInfoPacket): void
		ClearVoxels(): void
	}
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