interface LogOptions {
	MessageType?: Enum.MessageType,
	BypassHooks?: boolean,
	NewHook?: Hook
}
type Hook = (Message?: string, LogOptions?: LogOptions) => boolean

let GlobalHook: Hook = (Message, MessageType) => {return true}

/**
 * @param Name 
 * @param Decorator 
 * @param Hook 
 * @returns A function that takes in a Message and an optional LogOptions argument 
 */
export function Logger(Name: string, Decorator?: "Brackets" | "Braces" | "DollarSign" | string, Hook?: Hook) {
	let tag: string = `` 
	if (!Decorator || Decorator === "Brackets") tag = `[${Name}]: `
	else if (!Decorator || Decorator === "Braces") tag = `{${Name}}: `
	else if (!Decorator || Decorator === "DollarSign") tag = `$${Name}: `
	else tag = Decorator

	let CurrentHook = Hook
	
	return (Message?: string, LogOptions?: LogOptions) => {
		let BypassHooks = false
		let MessageType = Enum.MessageType.MessageOutput as Enum.MessageType
		if (LogOptions){
			if (LogOptions.MessageType) MessageType = LogOptions.MessageType
			if (LogOptions.BypassHooks) BypassHooks = true
			if (LogOptions.NewHook) CurrentHook = LogOptions.NewHook
		}

		if (!BypassHooks) {
			if (!GlobalHook(Message, LogOptions)) return
			if (CurrentHook) 
				if (!CurrentHook(Message, LogOptions)) return
		}

		const OutputMessage = `${tag}${Message}`
		if (MessageType === Enum.MessageType.MessageOutput) print(OutputMessage)
		else if (MessageType === Enum.MessageType.MessageWarning) warn(OutputMessage)
		else if (MessageType === Enum.MessageType.MessageError) error(OutputMessage)
	}
}

/**
 * @param Hook The Global Hook that runs before any message is logged
 */
export function SetGlobalHook(Hook: Hook) {
	GlobalHook = Hook
}