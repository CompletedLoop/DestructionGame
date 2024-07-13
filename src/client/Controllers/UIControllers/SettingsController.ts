import { Lighting, Players, Workspace } from "@rbxts/services";
import { Controller, OnStart } from "@flamework/core";
import { LogClass } from "shared/Modules/Logger";

import { CheckboxCreation } from "@rbxts/iris/out/widgetsTypes/Checkbox";
import { State, Widget, WidgetArguments } from "@rbxts/iris/out/IrisDeclaration";
import { WidgetState, WidgetEvents, WidgetExtra } from "@rbxts/iris/out/widgetsTypes";
import { WindowCreation } from "@rbxts/iris/out/widgetsTypes/Window";
import Iris from "@rbxts/iris";
import { InputNumCreation } from "@rbxts/iris/out/widgetsTypes/Input";

const log = new LogClass("SettingsController").Logger

const Mouse = Players.LocalPlayer.GetMouse()
const ScreenSize = new Vector2(Mouse.ViewSizeX, Mouse.ViewSizeY)

const InitialPanelSize = new Vector2(350, 300)
const InitialPanelPosition = ScreenSize.div(2).sub(InitialPanelSize.div(2))

@Controller({})
export class SettingsController implements OnStart {
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
                Iris.Checkbox(["Shadows"], {isChecked: Lighting.GlobalShadows}).state.isChecked.onChange(((value: boolean) => {
                    Lighting.GlobalShadows = value
                }))

                Iris.SliderNum(["Field of View", 1, 1, 120], {number: 70}).state.number.onChange((value: number) => {
                    Workspace.Camera.FieldOfView = value
                })
            } Iris.End()

            Iris.Separator()

            // Audio
            Iris.Tree(["Audio"], {isUncollapsed: true}); {
                Iris.SliderNum(["Effects Volume", 0.05, 0, 1], {number: .5}).state.number.onChange((value: number) => {
                })
            } Iris.End()

            Iris.Separator()

            // Extra
            Iris.Tree(["Extra"], {isUncollapsed: true}); {
                Iris.InputNum(["Kill Sound ID", 1, 0, math.huge, undefined, true]).state.number.onChange((value: number) => {

                })
            } Iris.End()

        } Iris.End()
    }

    onStart(): void {
        this.WindowState = Iris.State(false)
        Iris.Connect(() => this.render())
    }
}
