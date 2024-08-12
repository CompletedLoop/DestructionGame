import { OnStart } from "@flamework/core";
import { Component, BaseComponent } from "@flamework/components";
import { PlayerService } from "server/Services/PlayerService";
import { Players, Workspace } from "@rbxts/services";
import { character } from "types/Instances/character";

/**
 *	A component for parts that will respawn the character when touched.
 *	Mostly just for when players fall into the void.
 */
@Component({ tag: "Respawner" })
export default class Respawner extends BaseComponent<{}, BasePart> implements OnStart {
	constructor(private readonly playerService: PlayerService) { super() }

	onStart() {
		this.instance.Touched.Connect((otherPart: BasePart) => {
			const touching_character = otherPart.Parent as character
			if (otherPart.IsDescendantOf(Workspace.Characters)) {
				const player = Players.GetPlayerFromCharacter(touching_character)
				if (player)
					this.playerService.reloadPlayerCharacter(player)
			}
		})
	}
}