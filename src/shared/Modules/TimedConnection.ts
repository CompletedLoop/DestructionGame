/**
 * A class to call a callback from a Signal only if a specified time has elapsed
 */
export class TimedConnection {
    public sleep: number
    public lastCall: number
	private connection: RBXScriptConnection

    constructor(event: RBXScriptSignal, callback: Callback, sleep: number) {
        this.sleep = sleep
        this.lastCall = 0
        
        this.connection = event.Connect((...args: unknown[]) => {
            if (os.clock() - this.lastCall > this.sleep) {
                task.spawn(callback, ...args)
                this.lastCall = os.clock()
            }
        })
    }

    /**
     * Cleans up
     */
	Destroy() {
		this.connection.Disconnect()
	}
}