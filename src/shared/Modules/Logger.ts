export interface LogOptions {
	BypassHooks?: boolean,
	Hook?: Hook,
	Tag?: string
}

export interface Logger {
	(...args: ArgumentTypes): void,
	warn(...args: ArgumentTypes): void,
	error(...args: ArgumentTypes): void,
}

export type Hook = (This: Logger, Message?: unknown) => boolean | undefined
type ArgumentTypes = [Message: unknown, LogOptions?: LogOptions]

////////////////////////////////////////////////////////////////////////////////////////////////////////////
const MessageOutput = Enum.MessageType.MessageOutput
const MessageWarning = Enum.MessageType.MessageWarning
const MessageError = Enum.MessageType.MessageError

export class Logger {
	Logger!: Logger

	Name: string
	Decorator = "Brackets"
	Hook: Hook = (Message, MessageType) => {return true}

	constructor(Name: string, Decorator?: "Brackets" | "Braces" | "DollarSign" | string, Hook?: Hook) {
		this.Name = Name
		this.Decorator = Decorator || this.Decorator
		this.Hook = Hook || this.Hook

		this.Logger = setmetatable({
			warn : (t: Logger, ...args: ArgumentTypes) => this.process(MessageWarning, args[0], args[1]),
			error: (t: Logger, ...args: ArgumentTypes) => this.process(MessageError  , args[0], args[1]),
		}, {
			__call: (t: Logger, ...args: ArgumentTypes) => this.process(MessageOutput, args[0], args[1]),	
		} as any) as unknown as Logger
	}

	private process(MessageType: Enum.MessageType, Message: unknown, LogOptions?: LogOptions) {
		let CurrentTag = this.getTag()
		let CurrentHook = this.Hook

		if (LogOptions) {
			CurrentTag = LogOptions.Tag || CurrentTag
			CurrentHook = LogOptions.Hook || CurrentHook
			if (!LogOptions.BypassHooks) {
				if (!GlobalHook(this, Message)) return
				if (!CurrentHook(this, Message)) return
			}
		}

		if (!MessageType || MessageType === MessageOutput) print(CurrentTag, Message)
		else if (MessageType === MessageWarning) warn(CurrentTag, Message)
		else if (MessageType === MessageError) error(`${CurrentTag} ${Message}`, 2)
	}

	private getTag(): string {
		if (!this.Decorator || this.Decorator === "Brackets") return `[${this.Name}]:`
		else if (!this.Decorator || this.Decorator === "Braces") return `{${this.Name}}:`
		else if (!this.Decorator || this.Decorator === "DollarSign") return `$${this.Name}:`
		else return this.Decorator
	}
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////
let GlobalHook: Hook = (This, Message) => {return true}

/**
 * @param Hook The Global Hook that runs before any message is logged
 */
export function SetGlobalHook(Hook: Hook) {
	GlobalHook = Hook
}