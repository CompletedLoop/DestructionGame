import { Lighting, Players, Workspace } from "@rbxts/services";
import { Controller, OnStart } from "@flamework/core";
import { Logger } from "shared/Modules/Logger";

// Iris types
import Iris from "@rbxts/iris";

import { TopbarController } from "./TopbarController";
import { PlayerSettings } from "types/Interfaces/PlayerSettings";
import { Events, Functions } from "client/network";

const log = new Logger("SettingsController").Logger

const Mouse = Players.LocalPlayer.GetMouse()
const ScreenSize = new Vector2(Mouse.ViewSizeX, Mouse.ViewSizeY)

const InitialPanelSize = new Vector2(350, 350)
const InitialPanelPosition = ScreenSize.div(2).sub(InitialPanelSize.div(2))

@Controller({})
export default class SettingsController implements OnStart {
    declare public CurrentSettings: PlayerSettings

    constructor(private TopbarController: TopbarController, private readonly topbarController: TopbarController) {}

    private WindowState = Iris.State(false);

    /** Either set or toggle the settings panel. */
    public toggleSettingsPanel(value?: boolean) {
        this.WindowState.set(value || (!this.WindowState.get()))
    }

    private loadSetttings() {
        const [loaded, LoadedSettings] = Functions.GetLoadedPlayerSettings().await()
        if (loaded)
            this.CurrentSettings = LoadedSettings
    }

    private updateSetting(Setting: keyof PlayerSettings, value: unknown) {
        this.CurrentSettings[Setting] = value as never
        Events.UpdatePlayerSettings(this.CurrentSettings)
    }

    private bindToSetting(Setting: keyof PlayerSettings, SettingState: Iris.State<unknown>, callback: (value: any) => void) {
        SettingState.onChange((value: any) => {
            this.updateSetting(Setting, value)
            callback(value)
        })
    }

    private render(){
        Iris.Window(["Settings Panel"], {isOpened: this.WindowState, position: InitialPanelPosition, size: InitialPanelSize}); {
            // Game
            Iris.Tree(["Game"], {isUncollapsed: true}); {
                Iris.Checkbox(["AutoRun"], {isChecked: this.CurrentSettings.AutoRun}).state.isChecked.onChange((value: boolean) => {
                    this.updateSetting("AutoRun", value)
                })
            } Iris.End()

            Iris.Separator()

            // Performance
            Iris.Tree(["Performance"], {isUncollapsed: true}); {
                this.bindToSetting("Shadows", Iris.Checkbox(["Shadows"], {isChecked: this.CurrentSettings.Shadows}).state.isChecked, (value) => {
                    Lighting.GlobalShadows = value
                })

                Iris.Checkbox(["Destruction FX"], {isChecked: this.CurrentSettings.DestructionFX}).state.isChecked.onChange((value: boolean) => {
                    Workspace.GameConfig.SetAttribute("DestructionFX", value)
                    this.updateSetting("DestructionFX", value)
                })

                Iris.Tree(["Stats"], {isUncollapsed: true}); {
                    Iris.Checkbox(["Show FPS"], {isChecked: this.CurrentSettings.FPS}).state.isChecked.onChange((value: boolean) => {
                        this.topbarController.FPS_Icon.setEnabled(value)
                        this.updateSetting("FPS", value)
                    })
                    
                    Iris.Checkbox(["Show Ping"], {isChecked: this.CurrentSettings.PING}).state.isChecked.onChange((value: boolean) => {
                        this.TopbarController.Ping_Icon.setEnabled(value)
                        this.updateSetting("PING", value)
                    })
                    
                    Iris.Checkbox(["Show Region"], {isChecked: this.CurrentSettings.REG}).state.isChecked.onChange((value: boolean) => {
                        this.TopbarController.Region_Icon.setEnabled(value)
                        this.updateSetting("REG", value)
                    })
                } Iris.End()
            } Iris.End()
            
            Iris.Separator()
            
            // Audio
            Iris.Tree(["Audio (doesnt work yet)"], {isUncollapsed: true}); {
                Iris.SliderNum(["FX Volume", 0.05, 0, 1], {number: this.CurrentSettings.FXVolume}).state.number.onChange((value: number) => {
                    this.updateSetting("FXVolume", value)
                })
            } Iris.End()
            
            Iris.Separator()
            
            // Extra
            Iris.Tree(["Extra"], {isUncollapsed: true}); {
                Iris.InputNum(["Kill Sound ID", 1, 0, math.huge, undefined, true], {number: this.CurrentSettings.KillSoundID}).state.number.onChange((value: number) => {
                    this.updateSetting("KillSoundID", value)
                })

                Iris.SliderNum(["Field of View", 1, 1, 120], {number: this.CurrentSettings.FOV}).state.number.onChange((value: number) => {
                    Workspace.Camera.FieldOfView = value
                    this.updateSetting("FOV", value)
                })
            } Iris.End()

            Iris.Separator()

            // Debug
            Iris.Tree(["Debug"], {isUncollapsed: true}); {
            } Iris.End()

        } Iris.End()
    }
    
    onStart(): void {
        task.wait(1) // Wait so things can load
    
        // Load settings then render settings panel
        while (!this.CurrentSettings) {
            this.loadSetttings()
        }

        // Set values to loaded settings
        Lighting.GlobalShadows = this.CurrentSettings.Shadows

        Workspace.Camera.FieldOfView = this.CurrentSettings.FOV
        
        this.topbarController.FPS_Icon.setEnabled(this.CurrentSettings.FPS)
        this.topbarController.Ping_Icon.setEnabled(this.CurrentSettings.PING)
        this.topbarController.Region_Icon.setEnabled(this.CurrentSettings.REG)

        // Start rendering
        Iris.Connect(() => this.render())
    }
}
