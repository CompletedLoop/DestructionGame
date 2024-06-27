interface VoxBreaker {
	CreateHitbox(Size: Vector3, CFrame: CFrame, Shape: Enum.PartType, MinimumVoxelSize: number, TimeToReset: number): Part[]
}

declare const VoxBreaker: VoxBreaker
export = VoxBreaker