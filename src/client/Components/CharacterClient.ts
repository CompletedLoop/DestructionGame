import { OnRender, OnStart, OnTick } from "@flamework/core";
import { Component, BaseComponent, Components } from "@flamework/components";
import { character } from "types/Instances/character"
import { RunService, Players } from "services";

@Component({
	tag: "character",
	predicate: (instance) => instance === Players.LocalPlayer.Character
})
export class CharacterClient extends BaseComponent<{}, character> implements OnStart, OnRender, OnTick {
	onStart() {
	}

	onTick(delta: number) {
	}

	// Movement Angles
	target_tilt = 8
	joint_motor = this.instance.HumanoidRootPart.RootJoint;
	original_C0 = this.joint_motor.C0;
	onRender(delta: number) {
		let xdir = this.instance.Humanoid.MoveDirection.Dot(this.instance.HumanoidRootPart.CFrame.LookVector)
		let zdir = -this.instance.Humanoid.MoveDirection.Dot(this.instance.HumanoidRootPart.CFrame.RightVector)
		let target = this.original_C0.mul(CFrame.Angles(math.rad(this.target_tilt * xdir),math.rad(this.target_tilt * zdir),0))

		this.joint_motor.C0 = this.joint_motor.C0.Lerp(target, 25 * delta)
	}
}