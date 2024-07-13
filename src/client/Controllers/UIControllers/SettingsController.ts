import { Lighting, Players, Workspace } from "@rbxts/services";
import { Controller, OnStart } from "@flamework/core";
import { LogClass } from "shared/Modules/Logger";

// Iris types
import { CheckboxCreation } from "@rbxts/iris/out/widgetsTypes/Checkbox";
import { State, Widget, WidgetArguments } from "@rbxts/iris/out/IrisDeclaration";
import { WidgetState, WidgetEvents, WidgetExtra } from "@rbxts/iris/out/widgetsTypes";
import { WindowCreation } from "@rbxts/iris/out/widgetsTypes/Window";
import { InputNumCreation } from "@rbxts/iris/out/widgetsTypes/Input";
import Iris from "@rbxts/iris";
import { TopbarController } from "./TopbarController";

const log = new LogClass("SettingsController").Logger

const Mouse = Players.LocalPlayer.GetMouse()
const ScreenSize = new Vector2(Mouse.ViewSizeX, Mouse.ViewSizeY)

const InitialPanelSize = new Vector2(350, 300)
const InitialPanelPosition = ScreenSize.div(2).sub(InitialPanelSize.div(2))

@Controller({})
export class SettingsController implements OnStart {
    constructor(private TopbarController: TopbarController, private readonly topbarController: TopbarController) {}

    private Window!: Widget<WindowCreation>;
    private WindowState!: State<boolean>;

    public toggleSettingsPanel(value?: boolean) {
        log("Panel Toggled")
        this.WindowState.set(value || (!this.WindowState.get()))
    }

    // TODO
    private loadSetttings() {}
    private updateSetting() {}

    private render(){
        this.Window = Iris.Window(["Settings"], {isOpened: this.WindowState, position: InitialPanelPosition, size: InitialPanelSize}); {
            // Performance
            Iris.Tree(["Performance"], {isUncollapsed: true}); {
                Iris.Checkbox(["Shadows"], {isChecked: Lighting.GlobalShadows}).state.isChecked.onChange((value: boolean) => {
                    log(value)
                    Lighting.GlobalShadows = value
                })
            } Iris.End()
            
            Iris.Separator()
            
            // Audio
            Iris.Tree(["Audio (doesnt work yet)"], {isUncollapsed: true}); {
                Iris.SliderNum(["FX Volume", 0.05, 0, 1], {number: .5}).state.number.onChange((value: number) => {
                })
            } Iris.End()
            
            Iris.Separator()
            
            // Extra
            Iris.Tree(["Extra"], {isUncollapsed: true}); {
                Iris.InputNum(["Kill Sound ID", 1, 0, math.huge, undefined, true]).state.number.onChange((value: number) => {
                    
                })

                Iris.SliderNum(["Field of View", 1, 1, 120], {number: 70}).state.number.onChange((value: number) => {
                    Workspace.Camera.FieldOfView = value
                })
            } Iris.End()

            // Debug
            Iris.Tree(["Debug"], {isUncollapsed: true}); {
                Iris.Checkbox(["Show FPS"], {isChecked: false}).state.isChecked.onChange((value: boolean) => this.topbarController.FPS_Icon.setEnabled(value))
                Iris.Checkbox(["Show Ping"], {isChecked: false}).state.isChecked.onChange((value: boolean) => this.TopbarController.Ping_Icon.setEnabled(value))
                Iris.Checkbox(["Show Region"], {isChecked: false}).state.isChecked.onChange((value: boolean) => this.TopbarController.Region_Icon.setEnabled(value))
            } Iris.End()

        } Iris.End()
    }

    onStart(): void {
        this.WindowState = Iris.State(false)
        Iris.Connect(() => this.render())
    }

}
