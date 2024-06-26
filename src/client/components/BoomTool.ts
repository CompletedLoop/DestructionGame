import { OnStart } from "@flamework/core";
import { Component, BaseComponent } from "@flamework/components";
import { Players } from "services"
import { plr } from "types/plr";

const player = Players.LocalPlayer as plr

export interface BoomTool extends Tool {
	RadiusGui: ScreenGui & {
		input: TextBox
	}
}

@Component({tag: "BoomTool"})
export class BoomTool extends BaseComponent<{}, BoomTool> implements OnStart {
	inputGui!: ScreenGui
	onStart() {
		// this.instance.Activated.Connect(() => this.activated())
		// this.instance.Equipped.Connect(() => this.equipped())
		// this.instance.Unequipped.Connect(() => this.unequipped())

		// this.inputGui = this.instance.RadiusGui
	}
	
	activated() {

	}

	equipped() {
		this.inputGui.Parent = player.PlayerGui
	}

	unequipped() {
		this.inputGui.Parent = this.instance
	}
}