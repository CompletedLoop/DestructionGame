import { OnRender, OnStart, OnTick } from "@flamework/core";
import { Component, BaseComponent, Components } from "@flamework/components";
import { character } from "types/character"
import { RunService, Players } from "services";

@Component({
	tag: "character",
	predicate: (instance) => instance === Players.LocalPlayer.Character
})
export class CharacterClient extends BaseComponent<{}, character> implements OnStart, OnRender, OnTick {
	humanoid!: Humanoid;
	torso!: Part;
	humanoid_root!: Part;

	constructor(private readonly components: Components) {
		super();
	}
	onStart() {
		this.humanoid = this.instance.Humanoid
		this.torso = this.instance.Torso
		this.humanoid_root = this.instance.HumanoidRootPart

		this.joint = this.instance.HumanoidRootPart.RootJoint
		this.original_C0 = this.joint.C0
	}

	onTick(delta: number) {

	}

	// Camera and tilting stuff
	tilt = 8
	joint!: Motor6D;
	original_C0!: CFrame;
	onRender(delta: number) {
		let xdir = this.humanoid.MoveDirection.Dot(this.humanoid_root.CFrame.LookVector)
		let zdir = -this.humanoid.MoveDirection.Dot(this.humanoid_root.CFrame.RightVector)
		let target = this.original_C0.mul(CFrame.Angles(math.rad(this.tilt * xdir),math.rad(this.tilt * zdir),0))

		this.joint.C0 = this.joint.C0.Lerp(target, 25 * delta)
	}
}