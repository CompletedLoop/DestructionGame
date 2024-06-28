local ReplicatedStorage = game:GetService("ReplicatedStorage")
local VoxelDestruct = require(ReplicatedStorage.Modules.VoxelDestruction)

local VoxelModule = {}

VoxelModule.DestroyInRadius = function(radius, cframe)
	VoxelDestruct.destroy(cframe, Vector3.one * radius)
end

return VoxelModule