import { Networking } from "@flamework/networking";
import { VoxelInfoPacket } from "types/VoxelInfoPacket";

interface ClientToServerEvents {
	BoomTool(cframe: CFrame, radius: number, power: number): void
}

interface ServerToClientEvents {
	Voxels: {
		HandleVoxels(voxel_packet: VoxelInfoPacket): void
		ClearVoxels(): void
	}
}

interface ClientToServerFunctions {
	Debug: {
		GetPing(): string
	}
}

interface ServerToClientFunctions {}

export const GlobalEvents = Networking.createEvent<ClientToServerEvents, ServerToClientEvents>();
export const GlobalFunctions = Networking.createFunction<ClientToServerFunctions, ServerToClientFunctions>();
