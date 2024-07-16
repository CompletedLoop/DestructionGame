/**
*	Used to communicate voxels between server -> client and between methods.
*/
export interface VoxelInfoPacket {
	voxels: Part[],
	origin: CFrame,
	radius: number,
	velocity: "default" | Vector3,
	power?: number
}