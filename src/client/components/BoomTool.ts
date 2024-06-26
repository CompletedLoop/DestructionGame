import { OnStart } from "@flamework/core";
import { Component, BaseComponent } from "@flamework/components";

@Component({tag: "BoomTool"})
export class BoomTool extends BaseComponent<{}, Tool> implements OnStart {
	onStart() {
		
	}
}