import { OnStart } from "@flamework/core";
import { Component, BaseComponent } from "@flamework/components";

@Component({tag: "DummySpawner"})
export class DummySpawner extends BaseComponent<{}, Part> implements OnStart {
	onStart() {
		this.instance.Transparency = 1 // Invisible
	}
}