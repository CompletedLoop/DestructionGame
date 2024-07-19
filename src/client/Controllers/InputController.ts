import { Controller, OnInit } from "@flamework/core";
import { UserInputService } from "@rbxts/services";

@Controller({})
export class InputController implements OnInit {
	public isTyping = false
	public WKeyMode = 0

	private LastWTap = tick()
	onInit(): void | Promise<void> {
		UserInputService.InputBegan.Connect((input: InputObject, GameProcessed: boolean) => {
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
		})	

		UserInputService.InputEnded.Connect((input: InputObject, GameProcessed: boolean) => {
			if (!GameProcessed) {
				if (input.KeyCode === Enum.KeyCode.W) {
					if (tick() - this.LastWTap > .4) {
						this.WKeyMode = 0
					}
				}
			}
		})
	}

	private inputBegan(input: InputObject, GameProcessed: boolean) {}
	private inputEnded(input: InputObject, GameProcessed: boolean) {}
}