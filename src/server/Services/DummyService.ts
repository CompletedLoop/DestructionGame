import { Service, OnStart } from "@flamework/core";
import { Clone } from "@rbxts/altmake";
import { ServerStorage, Workspace } from "@rbxts/services";
import { character } from "types/Instances/character";

const DummyTemplate = ServerStorage.Dummy

@Service({})
export class DummyService implements OnStart {
	onStart() {}

	public CreateDummy(at: CFrame, dummy_type?: "normal" | "lowHP") {
		assert(at, "Need a CFrame")

		const newDummy = Clone(DummyTemplate, {
			Parent: Workspace.Characters.Dummies
		})

		newDummy.PivotTo(at)

		switch (dummy_type) {
			case "lowHP":
				newDummy.Humanoid.Health = 1
				break;
		
			case "normal": break;
			default: break;
		}
		
		return newDummy as unknown as character
	}
}