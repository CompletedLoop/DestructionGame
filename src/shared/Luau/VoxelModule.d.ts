interface VoxelModule {
	DestroyInRadius(this: void, radius: number, cframe: CFrame): Part[]
}

declare const VoxelModule: VoxelModule
export = VoxelModule