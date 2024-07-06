type Hook = (This: LogClass, Message?: string) => boolean

interface LogOptions {
	BypassHooks?: boolean,
	NewHook?: Hook,
	Tag?: string
}

interface Logger {
	(Message: string, LogOptions?: LogOptions): void,
	warn(Message: string, LogOptions?: LogOptions): void,
	error(Message: string, Level?: number, LogOptions?: LogOptions): void,
}

export class LogClass {
	Logger!: Logger

	Name: string
	Decorator = "Brackets"
	Hook: Hook = (Message, MessageType) => {return true}

	constructor(Name: string, Decorator?: "Brackets" | "Braces" | "DollarSign" | string, Hook?: Hook) {
		this.Name = Name
		if (Decorator) this.Decorator = Decorator
		if (Hook) this.Hook = Hook

		this.Logger = setmetatable({
			warn: (t: Logger, Message: string, LogOptions?: LogOptions) => {
				this.warn(Message, LogOptions)
			},
			error: (t: Logger, Message: string, Level?: number, LogOptions?: LogOptions) => {
				this.error(Message, Level, LogOptions)
			},
		}, {
			__call: (t, ...args) => {
				this.log(args[0] as string, args[1] as LogOptions | undefined)
			}
		}) as unknown as Logger
	}

	public log(Message: string, LogOptions?: LogOptions) {
		if (!this.process(Message, LogOptions)) return
		print(`${this.getTag()}${Message}`)
	}

	public warn(Message: string, LogOptions?: LogOptions) {
		if (!this.process(Message, LogOptions)) return
		warn(`${this.getTag()}${Message}`)
	}

	public error(Message: string, Level?: number, LogOptions?: LogOptions) {
		if (!this.process(Message, LogOptions)) return
		error(`${this.getTag()}${Message}`, Level)
	}

	private process(Message: string, LogOptions?: LogOptions) {
		if (LogOptions) {
			if (LogOptions.BypassHooks) return true
			if (LogOptions.NewHook) this.Hook = LogOptions.NewHook
			if (LogOptions.Tag) this.Decorator = LogOptions.Tag
		}

		if (!GlobalHook(this, Message)) return false
		if (!this.Hook(this, Message)) return false
		return true
	}

	private getTag(): string {
		if (!this.Decorator || this.Decorator === "Brackets") return `[${this.Name}]: `
		else if (!this.Decorator || this.Decorator === "Braces") return `{${this.Name}}: `
		else if (!this.Decorator || this.Decorator === "DollarSign") return `$${this.Name}: `
		else return this.Decorator
	}
}

let GlobalHook: Hook = (This, Message) => {return true}

/**
 * @param Hook The Global Hook that runs before any message is logged
 */
export function SetGlobalHook(Hook: Hook) {
	GlobalHook = Hook
}