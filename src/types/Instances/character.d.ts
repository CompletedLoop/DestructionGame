export interface character extends Model {
	Humanoid: Humanoid & {
		Animator: Animator
	},
	Torso: Part,
	HumanoidRootPart: Part & {
		RootJoint: Motor6D
	},
	IsRagdoll: BoolValue
}