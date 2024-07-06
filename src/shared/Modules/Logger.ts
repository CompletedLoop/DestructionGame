class LoggerClass {
	Name: string
	Decorators: string[]
	constructor(Name: string, Decorator?: "Brackets" | "Braces") {
		this.Name = Name
		this.Decorators = ["[", "]"]
		if (Decorator === "Braces") {
			this.Decorators = ["{", "}"]
		}
	}

	log(message: string, message_type?: Enum.MessageType) {
		const output_message = `${this.Decorators[0]}${this.Name}${this.Decorators[1]}: ${message}`
		if (!message_type) print(output_message)
		else if (message_type === Enum.MessageType.MessageOutput) print(output_message)
		else if (message_type === Enum.MessageType.MessageWarning) warn(output_message)
		else if (message_type === Enum.MessageType.MessageError) error(output_message)
	}
}



export = LoggerClass