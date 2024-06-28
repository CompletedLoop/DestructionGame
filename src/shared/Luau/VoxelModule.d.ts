interface VoxelModule {
	DestroyInRadius(radius: number, cframe: CFrame): LuaTuple<Part[]>
}

declare const VoxelModule: VoxelModule
export = VoxelModule