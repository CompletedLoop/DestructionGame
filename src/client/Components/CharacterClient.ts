import { OnRender, OnStart, OnTick } from "@flamework/core";
import { Component, BaseComponent, Components } from "@flamework/components";
import { character } from "types/Instances/character"
import { RunService, Players, UserInputService, Workspace } from "services";
import GetWCS_Character from "shared/Util/GetWSC_Character";
import { Character, UnknownSkill } from "@rbxts/wcs";
import { plr } from "types/Instances/plr";
import { SettingsController } from "client/Controllers/UIControllers/SettingsController";
import { InputController } from "client/Controllers/InputController";

// Skills
import m1 from "shared/Skills/Base/m1";

// Status Effects
import Attacking from "shared/StatusEffects/Attacking";
import Running from "shared/StatusEffects/Running";

const player = Players.LocalPlayer as plr

@Component({
	tag: "character",
	predicate: (instance) => instance === Players.LocalPlayer.Character
})
export default class CharacterClient extends BaseComponent<{}, character> implements OnStart, OnRender, OnTick {
	declare public WCS_Character: Character
	declare public RunningSE: Running

	private Initialized = false

	constructor(private readonly settingsController: SettingsController, private readonly inputController: InputController) { super() }

	///////////////////////////////////////////////////////////////////////////////////////////////
	onStart() {
		while (!(this.instance.Parent === Workspace.Characters) && !(this.instance.GetAttribute("Loaded"))) { task.wait() }
		task.wait(2)
		
		this.WCS_Character = GetWCS_Character(this.instance) as Character
		this.RunningSE = new Running(this.WCS_Character)

		this.Initialized = true
	}

	onTick(delta: number) {
		if (!this.Initialized) return
		if (!this.WCS_Character) return

		// M1's
		if (UserInputService.IsMouseButtonPressed(Enum.UserInputType.MouseButton1)) {
			if (!this.inputController.isTyping) {
				if (!this.instance.FindFirstChildOfClass("Tool")) {
					this.WCS_Character.GetSkillFromConstructor(m1)?.Start()
				}
			}
		}
		
		// Running
		if (this.WCS_Character.Humanoid.MoveDirection.Dot(Workspace.Camera.CFrame.LookVector.mul(new Vector3(1, 0, 1)).Unit) > .45) {
			if (this.settingsController.CurrentSettings.AutoRun || this.inputController.WKeyMode === 2) {
				const is_attacking = this.WCS_Character.GetAllActiveStatusEffectsOfType(Attacking).size()
				if (is_attacking > 0) {
					this.RunningSE.Stop()
				} else if (this.RunningSE.GetState().IsActive === false) {
					this.RunningSE.Start()
				}
			}
		} else {
			if (this.RunningSE.GetState().IsActive) {
				this.RunningSE.Stop()
			}
		}
	}

	///////////////////////////////////////////////////////////////////////////////////////////////
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