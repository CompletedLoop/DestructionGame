import { Lighting, Players, Workspace } from "@rbxts/services";
import { Controller, OnStart } from "@flamework/core";
import { Logger } from "shared/Modules/Logger";

// Iris types
import { CheckboxCreation } from "@rbxts/iris/out/widgetsTypes/Checkbox";
import { State, Widget, WidgetArguments } from "@rbxts/iris/out/IrisDeclaration";
import { WidgetState, WidgetEvents, WidgetExtra } from "@rbxts/iris/out/widgetsTypes";
import { WindowCreation } from "@rbxts/iris/out/widgetsTypes/Window";
import { InputNumCreation } from "@rbxts/iris/out/widgetsTypes/Input";
import Iris from "@rbxts/iris";
import { TopbarController } from "./TopbarController";
import { PlayerSettings } from "types/PlayerSettings";
import { Events, Functions } from "client/network";

const log = new Logger("SettingsController").Logger

const Mouse = Players.LocalPlayer.GetMouse()
const ScreenSize = new Vector2(Mouse.ViewSizeX, Mouse.ViewSizeY)

const InitialPanelSize = new Vector2(350, 300)
const InitialPanelPosition = ScreenSize.div(2).sub(InitialPanelSize.div(2))

@Controller({})
export class SettingsController implements OnStart {
    constructor(private TopbarController: TopbarController, private readonly topbarController: TopbarController) {}

    private CurrentSettings!: PlayerSettings

    private WindowState = Iris.State(false);

    public toggleSettingsPanel(value?: boolean) {
        log("Panel Toggled")
        this.WindowState.set(value || (!this.WindowState.get()))
    }

    private loadSetttings() {
        const [loaded, LoadedSettings] = Functions.GetLoadedPlayerSettings().await()
        if (loaded) this.CurrentSettings = LoadedSettings
    }

    private updateSetting(Setting: keyof PlayerSettings, value: unknown) {
        this.CurrentSettings[Setting] = value as never
        Events.UpdatePlayerSettings(this.CurrentSettings)
    }

    // go through all settings and assign each to their respective value
    private render(){
        Iris.Window(["Settings"], {isOpened: this.WindowState, position: InitialPanelPosition, size: InitialPanelSize}); {
            // Performance
            Iris.Tree(["Performance"], {isUncollapsed: true}); {
                Lighting.GlobalShadows = this.CurrentSettings.Shadows
                Iris.Checkbox(["Shadows"], {isChecked: this.CurrentSettings.Shadows}).state.isChecked.onChange((value: boolean) => {
                    Lighting.GlobalShadows = value
                    this.updateSetting("Shadows", value)
                })

                Iris.Checkbox(["Destruction FX"], {isChecked: this.CurrentSettings.DestructionFX}).state.isChecked.onChange((value: boolean) => {
                    Workspace.GameConfig.SetAttribute("DestructionFX", value)
                })
            } Iris.End()
            
            Iris.Separator()
            
            // Audio
            Iris.Tree(["Audio (doesnt work yet)"], {isUncollapsed: true}); {
                Iris.SliderNum(["FX Volume", 0.05, 0, 1], {number: this.CurrentSettings.FXVolume}).state.number.onChange((value: number) => {
                })
            } Iris.End()
            
            Iris.Separator()
            
            // Extra
            Iris.Tree(["Extra"], {isUncollapsed: true}); {
                Iris.InputNum(["Kill Sound ID", 1, 0, math.huge, undefined, true], {number: this.CurrentSettings.KillSoundID}).state.number.onChange((value: number) => {
                    
                })

                Iris.SliderNum(["Field of View", 1, 1, 120], {number: this.CurrentSettings.FOV}).state.number.onChange((value: number) => {
                    Workspace.Camera.FieldOfView = value
                    this.updateSetting("FOV", value)
                })
            } Iris.End()

            // Debug
            Iris.Tree(["Debug"], {isUncollapsed: true}); {
                Iris.Checkbox(["Show FPS"], {isChecked: this.CurrentSettings.FPS}).state.isChecked.onChange((value: boolean) => this.topbarController.FPS_Icon.setEnabled(value))
                Iris.Checkbox(["Show Ping"], {isChecked: this.CurrentSettings.PING}).state.isChecked.onChange((value: boolean) => this.TopbarController.Ping_Icon.setEnabled(value))
                Iris.Checkbox(["Show Region"], {isChecked: this.CurrentSettings.REG}).state.isChecked.onChange((value: boolean) => this.TopbarController.Region_Icon.setEnabled(value))
            } Iris.End()

        } Iris.End()
    }

    onStart(): void {
        task.wait(1)

        // Load settings then render settings panel
        this.loadSetttings()

        Iris.Connect(() => this.render())
    }
}