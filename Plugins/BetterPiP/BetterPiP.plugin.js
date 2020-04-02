/**
 * @name BetterPiP
 * @invite KuNA3cu
 * @authorLink url
 * @donate https://paypal.me/flomka?locale.x=ru_RU
 * @patreon patreon-url
 * @website github-url
 * @source url
 */

class BetterPiP {
	// Constructor
	constructor() {
		this.EnablePiP = true
		this.initialized = false
	}

	getName() { return "BetterPiP"; }
	getShortName() { return "BetterPiP"; }
	getDescription() { return "This is an example/template for a BD plugin."; }
	getVersion() { return "0.1.2"; }
	getAuthor() { return "FLomka"; }

	getSettingsPanel() {


		return "ээ фсс!! вышел отсюда"
	}

	load() { }

	unload() { }

	changePiP() {
		this.EnablePiP = !this.EnablePiP
		let element = document.querySelector(".buttonPiP")
		if (element != null) element = element.childNodes[0].childNodes[0]
		if (!this.EnablePiP) {
			document.querySelector(".pictureInPicture-3VocJq").style.display = 'none'
			element.style.background = '#f04747'
		} else {
			document.querySelector(".pictureInPicture-3VocJq").style.display = ''
			element.style.background = '#43b581'
		}
		console.log(this.EnablePiP)
	}

	start() {
		this.initialize()
		this.intervals = setInterval(() => {
			if (document.querySelector('.wrapper-KXM2i0') != null && document.querySelector('.buttonPiP') == null) {
				this.editChat()
			}
			if (document.querySelector('.pictureInPictureWindow-1B5qSe') != null && document.querySelector('.buttonInPiP') == null) {
				this.editPiP()
			}
		}, 1000)
	}

	stop() {
		document.querySelector(".pictureInPicture-3VocJq").style.display = ''
		let element = document.querySelector('.buttonPiP')
		if (element != null)element.parentNode.removeChild(element)
		clearInterval(this.intervals)
	};

	createDiv() {
		let div = document.createElement('div')
		let div2 = document.createElement('div')
		let button = document.createElement('button')
		button.setAttribute('aria-label', 'On/Off PiP')
		// button.addEventListener('click', this.changePiP)
		button.onclick = this.changePiP
		button.style.width = '24px'
		button.style.height = '24px'
		button.style.borderRadius = '50%'
		button.style.background = '#888'
		button.style.marginRight = '10px'

		div2.setAttribute('aria-label', 'On/Off PiP')
		div2.append(button)
		div.append(div2)
		div.className = "buttonPiP"
		return div
	}

	editChat() {
		let endLine = document.querySelector(".bottomControls-2HI3wi .justifyEnd-2E6vba")
		endLine.prepend(this.div)
	}

	editPiP() {
		let endLine = document.querySelector(".bottomControls-x2CpgG .justifyEnd-2E6vba")
		endLine.prepend(this.div)
	}
	//.bottomControls-x2CpgG .justifyEnd-2E6vba //pictureInPictureWindow-1B5qSe

	initialize() {
		//chat-3bRxxu  wrapper-KXM2i0
		this.div = this.createDiv()
		this.initialized = true
	}
}