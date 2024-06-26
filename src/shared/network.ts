import { Networking } from "@flamework/networking";

interface ClientToServerEvents {
	BoomTool(cframe: CFrame, radius: number | undefined, power: number): void
}

interface ServerToClientEvents {
	// HandleVoxels(voxels: Part[]): void
}

interface ClientToServerFunctions {}

interface ServerToClientFunctions {}

export const GlobalEvents = Networking.createEvent<ClientToServerEvents, ServerToClientEvents>();
export const GlobalFunctions = Networking.createFunction<ClientToServerFunctions, ServerToClientFunctions>();
