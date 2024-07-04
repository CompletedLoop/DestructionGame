interface Hitbox {

}

interface HitboxClass {
	new(): Hitbox
}

declare const HitboxClass: HitboxClass
export = HitboxClass