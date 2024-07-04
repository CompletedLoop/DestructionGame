interface VoxelDestruct {
	DestroyInRadius(this: void, radius: number, cframe: CFrame): Part[]
}

declare const VoxelDestruct: VoxelDestruct
export = VoxelDestruct