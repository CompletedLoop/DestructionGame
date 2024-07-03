local ReplicatedStorage = game:GetService("ReplicatedStorage")
local VoxelDestruction = require(ReplicatedStorage.Modules.VoxelDestruction)

local VoxelDestruct = {}

VoxelDestruct.DestroyInRadius = function(radius, cframe)
	local voxels, walls = VoxelDestruction.destroy(
		cframe, Vector3.one * radius,
		Enum.PartType.Ball,
		OverlapParams.new(),
		2
	)
	return voxels
end

return VoxelDestruct