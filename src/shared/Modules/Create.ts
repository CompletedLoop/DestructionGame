type Properties = WritableInstanceProperties<Instance> | {[Name: string]: string}
export function create<T extends keyof CreatableInstances>(ClassName: T, properties: Properties, children: Instance[]) {
	const instance = new Instance<T>(ClassName)
	
	for (const property of pairs(properties)) {
		instance[property[0]] = property[1] as never
	}
	
	children.forEach((child: Instance) => {
		child.Parent = instance
	})
	return instance
}