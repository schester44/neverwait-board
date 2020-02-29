export const playNewSound = () => {
	const context = new AudioContext()
	const o = context.createOscillator()
	const g = context.createGain()
	o.connect(g)
	g.connect(context.destination)
	o.start(0)
	o.type = 'sine'
	o.frequency.value = 630.6

	g.gain.exponentialRampToValueAtTime(0.00001, context.currentTime + 0.5)
}


export const playDeletedSound = () => {
	const context = new AudioContext()
	const o = context.createOscillator()
	const g = context.createGain()
	o.connect(g)
	g.connect(context.destination)
	o.start(0)
	o.type = 'square'
	o.frequency.value = 100

	g.gain.exponentialRampToValueAtTime(0.00001, context.currentTime + 0.7)
}
