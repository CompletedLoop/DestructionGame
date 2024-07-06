import { OnStart } from "@flamework/core";
import { Component, BaseComponent } from "@flamework/components";
import { Players } from "services"
import { plr } from "types/plr";
import { BoomTool } from "types/BoomTool";
import { Events } from "client/network";

const player = Players.LocalPlayer as plr

@Component({tag: "BoomTool"})
export class BoomToolComponent extends BaseComponent<{}, BoomTool> implements OnStart {
	inputGui!: ScreenGui & { input: TextBox & { UICorner: UICorner; }; };

	onStart() {
		this.instance.Activated.Connect(() => this.activated())
		this.instance.Equipped.Connect(() => {this.equipped()})
		this.instance.Unequipped.Connect(() => this.unequipped())
		this.inputGui = this.instance.RadiusGui
	}
	
	activated() {
		Events.BoomTool.fire(player.GetMouse().Hit, tonumber(this.inputGui.input.Text) as number, .3)
	}

	equipped() {
		this.inputGui.Parent = player.PlayerGui
	}

	unequipped() {
		pcall(() => {
			if (this.instance.Parent) {
				this.inputGui.Parent = this.instance
			}
		})
	}
}