import { Events } from "client/network";
import { character } from "types/Instances/character";


Events.ReplicateCharacterTilt.connect((On: character, JointC0: CFrame) => {
	pcall(() => {
		On.HumanoidRootPart.RootJoint.C0 = JointC0
	})
})