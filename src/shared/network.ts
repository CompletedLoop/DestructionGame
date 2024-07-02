import { Networking } from "@flamework/networking";

interface ClientToServerEvents {
	BoomTool(cframe: CFrame, radius: number, power: number): void
}

interface ServerToClientEvents {
	Voxels: {
		HandleVoxels(voxels: Part[], cframe: CFrame, power: number): void
		ClearVoxels(): void
	}
}

interface ClientToServerFunctions {}

interface ServerToClientFunctions {}

export const GlobalEvents = Networking.createEvent<ClientToServerEvents, ServerToClientEvents>();
export const GlobalFunctions = Networking.createFunction<ClientToServerFunctions, ServerToClientFunctions>();
