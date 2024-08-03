import { OnRender, OnStart, OnTick } from "@flamework/core";
import { Component, BaseComponent, Components } from "@flamework/components";
import { character } from "types/Instances/character"
import { RunService, Players, UserInputService, Workspace } from "services";
import GetWCS_Character from "shared/Util/GetWSC_Character";
import { Character, UnknownSkill } from "@rbxts/wcs";
import { plr } from "types/Instances/plr";
import SettingsController from "client/Controllers/UIControllers/SettingsController";
import InputController from "client/Controllers/InputController";
import { Events } from "client/network";
import LoadCharacter from "shared/Util/LoadCharacter";
import TimedConnection from "shared/Modules/TimedConnection";

// Skills
import m1 from "shared/Skills/Base/m1";

// Status Effects
import Attacking from "shared/StatusEffects/Attacking";
import Running from "shared/StatusEffects/Running";
import Signal from "@rbxts/goodsignal";

const player = Players.LocalPlayer as plr

@Component({
	tag: "character",
	predicate: (instance) => instance === Players.LocalPlayer.Character
})
export default class CharacterClient extends BaseComponent<{}, character> implements OnStart, OnRender, OnTick {
	declare public WCS_Character: Character
	declare public RunningSE: Running

	private ReplicateTiltSignal = new Signal<(JointC0: CFrame) => void>()

	constructor(private readonly settingsController: SettingsController, private readonly inputController: InputController) { super() }

	///////////////////////////////////////////////////////////////////////////////////////////////
	onStart() {
		LoadCharacter(player).andThen(this.Initialize)
	}

	private Initialize() {
		// Get WSC Character first
		this.WCS_Character = GetWCS_Character(this.instance) as Character
		
		this.RunningSE = new Running(this.WCS_Character)
		new TimedConnection(this.ReplicateTiltSignal, (JointC0: CFrame) => Events.ReplicateCharacterTilt(JointC0), .1)

		this.WCS_Character.GetSkillFromConstructor(m1)?.Started.Connect(() => {
			this.RunningSE.RunningAnimation.TimePosition = .59
			this.RunningSE.RunningAnimation.AdjustSpeed( -.2 )
		})
		this.WCS_Character.GetSkillFromConstructor(m1)?.Ended.Connect(() => {
			this.RunningSE.RunningAnimation.AdjustSpeed( 1.1 )
		})
	}

	onTick(delta: number) {
		if (!this.WCS_Character) return
		if (!this.RunningSE) return
		if (!this.settingsController.CurrentSettings) return
		if (this.instance.GetAttribute("reloading")) {
			this.instance.HumanoidRootPart.Anchored = true
			return
		}

		/*
		*	Instead of connecting to an signal for when the play left-clicks, we check if the player is clicking
		*	every tick to allow the player to just hold down the mouse and m1 combo which other bg games do.
		*/
		if (UserInputService.IsMouseButtonPressed(Enum.UserInputType.MouseButton1)) {
			if (!this.inputController.isTyping) {
				if (!this.instance.FindFirstChildOfClass("Tool")) {
					this.WCS_Character.GetSkillFromConstructor(m1)?.Start()
				}
			}
		}
		
		/*
		*	Check on every frame if the player should be running and change the state of the character based on checks
		*/
		const running_state = this.RunningSE.GetState()
		if (this.WCS_Character.Humanoid.MoveDirection.Dot(Workspace.Camera.CFrame.LookVector.mul(new Vector3(1, 0, 1)).Unit) > .45) {
			if (this.settingsController.CurrentSettings.AutoRun || this.inputController.WKeyMode === 2) {
				const is_attacking = this.WCS_Character.GetAllActiveStatusEffectsOfType(Attacking).size()
				const is_running = running_state.IsActive 
				 
				// Determine the speed of the running animaton
				if (is_running) { 
					if (this.instance.Humanoid.FloorMaterial === Enum.Material.Air) {
						this.RunningSE.RunningAnimation.AdjustSpeed(.2)
					} else {
						this.RunningSE.RunningAnimation.AdjustSpeed(1.1)
					}
				}

				// Determine whether to start or end the run
				if (is_attacking > 0) {
					this.RunningSE.Stop()
				} else if (!is_running) {
					this.RunningSE.Start()
				}
			}
		} else {
			if (running_state.IsActive) {
				this.RunningSE.Stop()
			}
		}
	}

	///////////////////////////////////////////////////////////////////////////////////////////////
	target_tilt = 8.5
	joint_motor = this.instance.HumanoidRootPart.RootJoint;
	original_C0 = this.joint_motor.C0;
	onRender(delta: number) {
		let xdir = this.instance.Humanoid.MoveDirection.Dot(this.instance.HumanoidRootPart.CFrame.LookVector)
		let zdir = -this.instance.Humanoid.MoveDirection.Dot(this.instance.HumanoidRootPart.CFrame.RightVector)
		let target = this.original_C0.mul(CFrame.Angles(math.rad(this.target_tilt * xdir),math.rad(this.target_tilt * zdir),0))

		this.joint_motor.C0 = this.joint_motor.C0.Lerp(target, 30 * delta)
		this.ReplicateTiltSignal.Fire(this.joint_motor.C0)
	}
}