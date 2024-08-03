import { Components } from "@flamework/components";
import { Controller, Dependency, OnInit } from "@flamework/core";
import { Players, UserInputService } from "@rbxts/services";
import CharacterClient from "client/Components/CharacterClient";
import { Events } from "client/network";
import { plr } from "types/Instances/plr";

const player = Players.LocalPlayer as plr

@Controller({})
export default class InputController implements OnInit {
	public isTyping = false
	public WKeyMode = 0

	private LastWTap = tick()
	onInit(): void | Promise<void> {
		// Connect
		UserInputService.InputBegan.Connect(this.inputBegan)	
		UserInputService.InputEnded.Connect(this.inputEnded)

		// Add Character Component
		Events.AddCharacterComponent.connect(() => {
			Dependency<Components>().addComponent<CharacterClient>(player.Character)
		})
	}

	private inputBegan(input: InputObject, GameProcessed: boolean) {
		this.isTyping = GameProcessed
		if (!this.isTyping) {
			if (input.KeyCode === Enum.KeyCode.W) {
				if (this.WKeyMode === 0) {
					this.WKeyMode += 1
				} else if (tick() - this.LastWTap < .4) {
					this.WKeyMode += 1
					if (this.WKeyMode > 2) {
						this.WKeyMode = 2
					}
				}
				this.LastWTap = tick()
			}
		}
	}

	private inputEnded(input: InputObject, GameProcessed: boolean) {
		if (!GameProcessed) {
			if (input.KeyCode === Enum.KeyCode.W) {
				if (tick() - this.LastWTap > .4) {
					this.WKeyMode = 0
				}
			}
		}
	}
}