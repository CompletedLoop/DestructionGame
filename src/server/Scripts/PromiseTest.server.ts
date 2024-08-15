let counter = 0

async function getCounterIfIts50() {
	if (counter === 50) {
		return Promise.resolve(counter)
	} else {
		return Promise.retryWithDelay(() => new Promise<number>((resolve, reject) => {
			counter += 1
			print(counter)
			if (counter === 60) resolve(counter)
			else reject("counter is too small")
		}), 50, .1)
	}
}

// declare let current_counter: number 
// getCounterIfIts50().catch((reason) => {
// 	print(":(")
// }).andThen((c) => {
// 	current_counter = c as number
// 	print(`c is ${c}!!`)
	
// })
