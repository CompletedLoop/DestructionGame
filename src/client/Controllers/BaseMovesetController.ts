import { Controller, OnStart, OnTick } from "@flamework/core";
import { UserInputService, Players, Workspace } from "services";
import { Character } from "@rbxts/wcs";
import { plr } from "types/Instances/plr";

import { SettingsController } from "./UIControllers/SettingsController";

import { character } from "types/Instances/character";
import GetWCS_Character from "shared/Util/GetWSC_Character";

import m1 from "shared/Skills/Base/m1";
import run from "shared/Skills/Base/run";

@Controller({loadOrder: 2})
export default class BaseMovesetController implements OnStart, OnTick {
	player = Players.LocalPlayer as plr
	isTyping = false

	initialized = false

	constructor(private readonly settingsController: SettingsController) {}

	onStart() {
		task.wait(2)
		this.initialized = true

		UserInputService.InputBegan.Connect((Input, GameProcessed) => this.InputBegan(Input, GameProcessed));
	}

	onTick(dt: number): void {
		if (!this.initialized) return
		if (UserInputService.IsMouseButtonPressed(Enum.UserInputType.MouseButton1)) {
			if (this.isTyping) return
			this.initiateM1()
		}

		// TODO Fix this
		if (this.settingsController.CurrentSettings.AutoRun) {
			const runSkill = GetWCS_Character(this.player.Character)?.GetSkillFromConstructor(run)
			// print(runSkill)
			if (this.player.Character.Humanoid.MoveDirection.Dot(Workspace.Camera.CFrame.LookVector.mul(new Vector3(1, 0, 1)).Unit) > .45) {
				if (!runSkill?.GetState().IsActive) {
					// print("start")
					runSkill?.Start()
				}
			} else {
				if (runSkill?.GetState().IsActive) {
					// print("stop")
					runSkill?.Stop()
				}
			}
		}
	}
	
	private initiateM1() {
		if (!this.player.Character.FindFirstChildOfClass("Tool")) {
			GetWCS_Character(this.player.Character)?.GetSkillFromConstructor(m1)?.Start();
		}
	}

	private InputBegan(Input: InputObject, GameProcessed: boolean) {
		if (GameProcessed) {
			this.isTyping = true
			return
		}

		if (Input.UserInputType === Enum.UserInputType.MouseButton1) {
			if (Input.UserInputState === Enum.UserInputState.Begin)
				this.isTyping = false
		}
	}
}