import { Controller, OnStart } from "@flamework/core";
import { Icon } from "@rbxts/topbar-plus";
import { SettingsController } from "./SettingsController";

@Controller({})
export class TopbarController implements OnStart {
    constructor(private SettingsController: SettingsController) {}

    onStart(): void {
        new Icon().setImage("13612120903").oneClick(true).selected.Connect(() => {
            this.SettingsController.toggleSettingsPanel()
        })
    }
}
