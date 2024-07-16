import Signal from "@rbxts/goodsignal"
import { character } from "types/Interfaces/character"

interface Hitbox {
	Parts: Part[]

	Enable(time: Number): void
	Disable(): void

	PlayerEntered: Signal<(character: character, part: Part) => void>
	PartEntered: Signal
}

interface HitboxConstructor {
	new(Parts: Part[]): Hitbox
}

declare const Hitbox: HitboxConstructor
export = Hitbox
