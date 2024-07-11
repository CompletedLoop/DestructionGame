import { Lighting, Players } from "@rbxts/services";
import { Controller, OnStart } from "@flamework/core";
import { State, Widget } from "@rbxts/iris/out/IrisDeclaration";
import { WindowCreation } from "@rbxts/iris/out/widgetsTypes/Window";
import { LogClass } from "shared/Modules/Logger";
import { CheckboxCreation } from "@rbxts/iris/out/widgetsTypes/Checkbox";
import Iris from "@rbxts/iris";

const log = new LogClass("SettingsController").Logger

const Mouse = Players.LocalPlayer.GetMouse()
const ScreenSize = new Vector2(Mouse.ViewSizeX, Mouse.ViewSizeY)

const InitialPanelSize = new Vector2(250, 300)
const InitialPanelPosition = ScreenSize.div(2).sub(InitialPanelSize.div(2))

@Controller({})
export class SettingsController implements OnStart {
    private Window!: Widget<WindowCreation>;
    private WindowState!: State<boolean>;

    public toggleSettingsPanel(value?: boolean) {
        log("Panel Toggled")
        this.WindowState.set(value || (!this.WindowState.get()))
    }

    private bindToPlayerSettings(object: Widget<CheckboxCreation>) {
        
        return object
    }

    private render(){
        this.Window = Iris.Window(["Settings"], {isOpened: this.WindowState, position: InitialPanelPosition, size: InitialPanelSize}); {
            // Performance
            Iris.Tree(["Performance"], {isUncollapsed: true}); {
                this.bindToPlayerSettings(Iris.Checkbox(["Shadows"], {isChecked: Lighting.GlobalShadows})).state.isChecked.onChange((value: boolean) => {
                    Lighting.GlobalShadows = value
                })
            } Iris.End()

            // Audio
            Iris.Tree(["Audio"], {isUncollapsed: true}); {
                // this.bindToPlayerSettings()
            } Iris.End()

        } Iris.End()
    }

    onStart(): void {
        this.WindowState = Iris.State(false)
        Iris.Connect(() => this.render())
    }
}
