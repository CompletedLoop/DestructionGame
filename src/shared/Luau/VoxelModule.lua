local ReplicatedStorage = game:GetService("ReplicatedStorage")
local VoxelDestruct = require(ReplicatedStorage.Modules.VoxelDestruction)

local VoxelModule = {}

VoxelModule.DestroyInRadius = function(radius, cframe)
	local voxels, walls = VoxelDestruct.destroy(
		cframe, Vector3.one * radius,
		Enum.PartType.Ball,
		OverlapParams.new(),
		2,
		nil,
		nil,
		nil,
		true,
		10
	)

	-- if true then
	-- 	for _, voxel: Part in voxels do
	-- 		voxel.BrickColor = BrickColor.random()
	-- 	end
	-- 	for _, voxel: Part in walls do
	-- 		voxel.BrickColor = BrickColor.random()
	-- 	end
	-- end
	return voxels
end

return VoxelModule