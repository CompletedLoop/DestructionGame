import { character } from "types/Instances/character";

const character = script.Parent as character

while (!character.GetAttribute("Loaded") as boolean) {
	(character.WaitForChild("Humanoid") as Humanoid).WalkSpeed = 0;
	(character.WaitForChild("Humanoid") as Humanoid).JumpHeight = 0
}