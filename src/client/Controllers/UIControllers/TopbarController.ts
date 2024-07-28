import { Controller, Dependency, OnRender, OnStart, OnTick } from "@flamework/core";
import { Icon } from "@rbxts/topbar-plus";
import SettingsController from "./SettingsController";
import TimedConnection from "shared/Modules/TimedConnection";
import { Players, ReplicatedStorage, RunService, StarterGui, Workspace } from "@rbxts/services";
import { Events, Functions } from "client/network";
import { Logger } from "shared/Modules/Logger";

const log = new Logger("TopbarController").Logger

@Controller({})
export class TopbarController implements OnStart {
    SettingsController!: SettingsController;

    // Meant to be access by other controllers
    declare public FPS_Icon: Icon;
    declare public Ping_Icon: Icon;
    declare public Region_Icon: Icon;

    // Should move this into a util module or something
    public getPing() {
        const now = os.clock()
        Functions.Debug.GetPing().await()
        return os.clock() - now
    }

    private MovesetSelectionIcon = new Icon().setLabel("Movesets")
    onStart(): void {
        task.wait(1) // wait a sec
        this.SettingsController = Dependency<SettingsController>()

        // Movesets Selection Icon
        this.loadMovesetSelectionList()

        // Settings icon
        new Icon().setImage("13612120903").oneClick(true).selected.Connect(() => this.SettingsController.toggleSettingsPanel())

        // Instantiate debug Icons
        this.FPS_Icon = new Icon().setEnabled(false).lock()
        this.Ping_Icon = new Icon().setEnabled(false).lock()
        this.Region_Icon = new Icon().setEnabled(false).setLabel((Workspace.GetAttribute("Region") as string) || "unavailabe").lock()

        new TimedConnection(RunService.RenderStepped, (dt: number) => this.updateDebugIcons(dt), .2)
    }

    private updateDebugIcons(dt: number) {
        this.FPS_Icon.setLabel(`FPS: ${tostring(math.round(1/dt))}`)

        const ping = math.round(this.getPing() * 1000)
        const icon_label = this.Ping_Icon.getInstance("IconLabel") as TextLabel

        if (ping < 75) icon_label.TextColor3 = Color3.fromRGB(73, 255, 131)
        else if (ping < 150) icon_label.TextColor3 = Color3.fromRGB(255, 214, 74)
        else if (ping > 150) icon_label.TextColor3 = Color3.fromRGB(255, 74, 74)

        this.Ping_Icon.setLabel(`${tostring(ping)}ms`)

        this.Region_Icon.setLabel((Workspace.GetAttribute("Region") as string) || "unavailabe")
    }

    private async loadMovesetSelectionList() {
        /*
        *   Logic so that the selection doesnt get hidden by the chat
        *   and toggles the chat based if it was enabled or not
        */
        let previous_chat_state = false
        this.MovesetSelectionIcon.toggled.Connect((isSelected: boolean) => {
            const current_chat_state = StarterGui.GetCore("ChatActive")
            if (isSelected) {
                if (current_chat_state) {
                    previous_chat_state = true
                    StarterGui.SetCore("ChatActive", false)
                } else {
                    previous_chat_state = false
                }
            } else {
                if (previous_chat_state && (!current_chat_state)) {
                    StarterGui.SetCore("ChatActive", true)
                }
            }
        })

        // Create buttons
        ReplicatedStorage.TS.Movesets.GetChildren().forEach((Moveset: Instance) => {
            const MovesetList = []
            if (Moveset.IsA("Folder")) {
                if ((Moveset.Name !== "Base") && (Moveset.Name !== "Private")) {
                    const Button = new Icon().setLabel(Moveset.Name).oneClick(true)
                    MovesetList.push(Button)
                    Button.selected.Connect(() => {
                        log(`Requested Moveset ${Moveset.Name}`)                 
                        Events.ChangeMoveset(Moveset.Name)
                    })
                }
            }
            this.MovesetSelectionIcon.setDropdown(MovesetList)
        })
    }
}