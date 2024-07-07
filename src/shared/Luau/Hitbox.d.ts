import Signal from "@rbxts/goodsignal"
import { character } from "types/character"

interface Hitbox {
	Parts: Part[]

	Enable(time: Number): void
	Disable(): void

	PlayerEntered: Signal<(character: character, part: Part) => void>
	PartEntered: Signal
}

interface HitboxClass {
	new(): Hitbox
}

declare const HitboxClass: HitboxClass
export = HitboxClass