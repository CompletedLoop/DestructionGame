import { OnStart } from "@flamework/core";
import { Component, BaseComponent } from "@flamework/components";
import { character } from "types/Instances/character";

interface Attributes {}

@Component({tag: "Dummy"})
export class Dummy extends BaseComponent<Attributes, character> implements OnStart {
	onStart() {
		
	}
}