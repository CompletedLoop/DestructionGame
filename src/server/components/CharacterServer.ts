import { OnStart } from "@flamework/core";
import { Component, BaseComponent } from "@flamework/components";

interface Attributes {}

@Component({tag: "Character"})
export class CharacterServer extends BaseComponent<Attributes> implements OnStart {
	onStart() {
	}
}