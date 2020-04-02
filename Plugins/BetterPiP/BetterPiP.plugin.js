/**
 * @name BetterPiP
 * @invite KuNA3cu
 * @authorLink url
 * @donate https://paypal.me/flomka?locale.x=ru_RU
 * @patreon patreon-url
 * @website https://github.com/FFLomka/BetterDiscordAddons
 * @source https://raw.githubusercontent.com/FFLomka/BetterDiscordAddons/master/Plugins/BetterPiP/BetterPiP.plugin.js
 */

class BetterPiP {
	// Constructor
	constructor() {
		this.EnablePiP = true
		this.initialized = false
		this.hoveren = false
		this.sizeOfPiP = 'default'
		this.size = {
			"small":[160,90],
			"default":[320,180],
			"big":[640,360],
			"omg":[1280,720]
		}
	}

	getName() { return "BetterPiP"; }
	getShortName() { return "BetterPiP"; }
	getDescription() { return "This is an example/template for a BD plugin."; }
	getVersion() { return "0.1.4"; }
	getAuthor() { return "FLomka"; }

	getSettingsPanel() {
		return `<!DOCTYPE html><html lang="en">
			<head>
			<style>
				body {
				}
				h1 {
				}
			</style>
			</head>
			<body>
			<div>
				<h1>Change Size of PiP</h1>
				<select name="size" id="sizePiP">
					<option ${this.sizeOfPiP == 'small' ? 'selected' : ''} value="small">Small</option>
					<option ${this.sizeOfPiP == 'default' ? 'selected' : ''} value="default">Default</option>
					<option ${this.sizeOfPiP == 'big' ? 'selected' : ''} value="big">Big</option>
					<option ${this.sizeOfPiP == 'omg' ? 'selected' : ''} value="omg">OMG</option>
				</select> 
			</div>
			</body>
		</html>
		`
	}

	load() { }

	unload() { }

	resizePiP() {
		this.sizeOfPiP = document.querySelector('#sizePiP').options[document.getElementById("sizePiP").options.selectedIndex].value
	}

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
	}

	start() {
		if (!global.ZeresPluginLibrary) return window.BdApi.alert("Library Missing",`The library plugin needed for ${this.getName()} is missing.<br /><br /> <a href="https://betterdiscord.net/ghdl?url=https://raw.githubusercontent.com/rauenzi/BDPluginLibrary/master/release/0PluginLibrary.plugin.js" target="_blank">Click here to download the library!</a>`)
        ZLibrary.PluginUpdater.checkForUpdate(this.getName(), this.getVersion(), "https://raw.githubusercontent.com/FFLomka/BetterDiscordAddons/master/Plugins/BetterPiP/BetterPiP.plugin.js")
		
		this.initialize()
		this.intervals = setInterval(() => {
			if (document.querySelector('.wrapper-KXM2i0') != null && document.querySelector('.buttonPiP') == null) {
				this.editChat()
			}
			if (document.querySelector('.pictureInPictureWindow-1B5qSe') != null && document.querySelector('.buttonInPiP') == null) {
				this.editPiP()
			}
			if (document.querySelector('#sizePiP') != null) {
				document.querySelector('#sizePiP').addEventListener('change', this.resizePiP.bind(this))
			}
			if (document.querySelector('.pictureInPictureVideo-2v4f7E') != null && document.querySelector('.pictureInPictureVideo-2v4f7E').style.background != '#000002' && !this.hoveren) {
				let picture = document.querySelector('.pictureInPictureVideo-2v4f7E')
				picture.style.width = this.size[this.sizeOfPiP][0] + 'px'
				picture.style.height = this.size[this.sizeOfPiP][1] + 'px'
				picture.style.background = '#000002'
			}
			if (document.querySelector('.pictureInPictureVideo-2v4f7E') != null && document.querySelector('.pictureInPictureVideo-2v4f7E').style.background != '#000001' && this.hoveren) {
				let picture = document.querySelector('.pictureInPictureVideo-2v4f7E')
				picture.addEventListener('mouseenter', this.inMoverPiP.bind(this))
				picture.addEventListener('mouseout', this.outMoverPiP.bind(this))
				picture.style.background = '#000001'
			}
		}, 725)
	}//.pictureInPictureVideo-2v4f7E


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
		button.onclick = this.changePiP.bind(this)
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