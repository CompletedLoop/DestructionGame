import { Make } from "@rbxts/altmake";
import { PartCache } from "@rbxts/partcache/out/class";
import { BaseEffect, VisualEffectDecorator } from "@rbxts/refx";
import { ReplicatedStorage, TweenService, Workspace } from "@rbxts/services";
import { character } from "types/Instances/character";
import PartCacheModule from "@rbxts/partcache";
import SoundPlayer from "shared/Modules/SoundPlayer";

const StartTransparency = 0.5

// Create Cache
type PartTemplate = Part & { WeldConstraint: WeldConstraint }
const Cache = new PartCacheModule(Make("Part", {
	Size: new Vector3(1, 2, 1),
	BrickColor: BrickColor.White(),
	Material: Enum.Material.SmoothPlastic,
	Transparency: StartTransparency,
	CanCollide: false,
	Massless: true,
	Children: [
		Make("WeldConstraint", {})
	]
}), 50) as PartCache<PartTemplate>
Cache.SetCacheParent(Workspace.FX.PartCache)

@VisualEffectDecorator
export default class Punched extends BaseEffect<[character]> {
	// Config
	protected DestroyOnEnd: boolean = false;
	protected MaxLifetime: number = .5;

	// Array of the currently borrowed parts so we can return them when the effect finishes
	private currentlyUsingParts: PartTemplate[] = []

	public override OnStart(char: character): void {
		// Loop through body parts and use cache to make a flash version
		(char.GetChildren() as Part[]).forEach((BodyPart: Part) => {
			if (BodyPart.IsA("Part")) {
				if (BodyPart.Name !== "HumanoidRootPart") {
					const borrowed_part = this.borrowPart(BodyPart)
					this.flashBodyPart(borrowed_part)
				}
			}
		})
	}
	
	private borrowPart(BodyPart: Part) {
		const borrowed_part = Cache.GetPart()
	
		// Size Part
		borrowed_part.Size =  new Vector3(1, 2, 1) // Default limb size
		if (BodyPart.Name === "Torso") borrowed_part.Size = new Vector3(2, 2, 1)
		if (BodyPart.Name === "Head") borrowed_part.Size = new Vector3(2, 1, 1)
		borrowed_part.Size = borrowed_part.Size.mul(1.05) // Make it slightly large so its visible
	
		// Position and set weld
		borrowed_part.CFrame = BodyPart.CFrame
		borrowed_part.WeldConstraint.Part0 = BodyPart
		borrowed_part.WeldConstraint.Part1 = borrowed_part

		borrowed_part.Transparency = StartTransparency
	
		this.currentlyUsingParts.push(borrowed_part)
		return borrowed_part
	}

	private flashBodyPart(Part: Part) {
		const fadout = TweenService.Create(Part, new TweenInfo(.08, Enum.EasingStyle.Quad), {Transparency: 1})
		task.delay(.075, fadout.Play)
	}

	protected OnDestroy(): void {
		this.currentlyUsingParts.forEach(this.returnBorrowedPart)
	}
	
	private returnBorrowedPart(borrowed_part: PartTemplate) {
		borrowed_part.WeldConstraint.Part0 = undefined
		Cache.ReturnPart(borrowed_part)
	}
}