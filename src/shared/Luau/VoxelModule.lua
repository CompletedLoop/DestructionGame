local ReplicatedStorage = game:GetService("ReplicatedStorage")
local VoxelDestruct = require(ReplicatedStorage.Modules.VoxelDestruction)

local VoxelModule = {}

VoxelModule.DestroyInRadius = function(radius, cframe)
	local voxels, walls = VoxelDestruct.destroy(cframe, Vector3.one * radius)
	return voxels
end

return VoxelModule