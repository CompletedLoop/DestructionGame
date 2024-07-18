import { Controller, Dependency, OnRender, OnStart, OnTick } from "@flamework/core";
import { Icon } from "@rbxts/topbar-plus";
import { SettingsController } from "./SettingsController";
import TimedConnection from "shared/Modules/TimedConnection";
import { Players, RunService, Workspace } from "@rbxts/services";
import { Functions } from "client/network";

@Controller({loadOrder: 0})
export class TopbarController implements OnStart {
    SettingsController!: SettingsController;

    // Meant to be access by other controllers
    public FPS_Icon!: Icon;
    public Ping_Icon!: Icon;
    public Region_Icon!: Icon;

    // Should move this into a util module or something
    public getPing() {
        const now = os.clock()
        Functions.Debug.GetPing().await()
        return os.clock() - now
    }

    onStart(): void {
        task.wait(1) // wait a sec
        this.SettingsController = Dependency<SettingsController>()

        new Icon().setImage("13612120903").oneClick(true).selected.Connect(() => this.SettingsController.toggleSettingsPanel())

        // Instantiate debug Icons
        this.FPS_Icon = new Icon().setEnabled(false).lock()
        this.Ping_Icon = new Icon().setEnabled(false).lock()
        this.Region_Icon = new Icon().setEnabled(false).setLabel((Workspace.GetAttribute("Region") as string) || "unavailabe").lock()

        new TimedConnection(RunService.RenderStepped, (dt: number) => this.render(dt), .2)
    }

    private render(dt: number) {
        this.FPS_Icon.setLabel(`FPS: ${tostring(math.round(1/dt))}`)

        const ping = math.round(this.getPing() * 1000)
        const icon_label = this.Ping_Icon.getInstance("IconLabel") as TextLabel

        if (ping < 75) icon_label.TextColor3 = Color3.fromRGB(73, 255, 131)
        else if (ping < 150) icon_label.TextColor3 = Color3.fromRGB(255, 214, 74)
        else if (ping > 150) icon_label.TextColor3 = Color3.fromRGB(255, 74, 74)

        this.Ping_Icon.setLabel(`${tostring(ping)}ms`)

        this.Region_Icon.setLabel((Workspace.GetAttribute("Region") as string) || "unavailabe")
    }
}