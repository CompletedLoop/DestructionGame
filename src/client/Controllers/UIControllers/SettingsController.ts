import { Controller, OnStart } from "@flamework/core";
import Iris from "@rbxts/iris";
import { State, Widget } from "@rbxts/iris/out/IrisDeclaration";
import { WindowCreation } from "@rbxts/iris/out/widgetsTypes/Window";
import { LogClass } from "shared/Modules/Logger";

const log = new LogClass("SettingsController").Logger

@Controller({})
export class SettingsController implements OnStart {
    private Window!: Widget<WindowCreation>;
    private WindowState!: State<boolean>;
    private WindowSize!: State<UDim2>;

    public toggle(value?: boolean) {
        log("Panel Toggled")
        this.WindowState.set(value || (!this.WindowState.get()))
    }

    private render(){
        this.Window = Iris.Window(["Settings"], {isOpened: this.WindowState}); {

        } Iris.End()
    }

    onStart(): void {
        this.WindowState = Iris.State(false)
        Iris.Connect(() => this.render())
    }
}
