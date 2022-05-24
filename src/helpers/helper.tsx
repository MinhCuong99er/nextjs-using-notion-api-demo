const helper = {
	testClipboard: (key) => {
		navigator.clipboard.writeText(key).then(
			(v) => console.log('Success' + v),
			(e) => console.log('Fail\n' + e)
		)
		const input = document.body.appendChild(document.createElement('input'))
		input.value = key
		input.focus()
		input.select()
		document.execCommand('copy')
		input.parentNode.removeChild(input)
		// window?.['android']?.NativeAndroid?.copyToClipboard(key)
	},
}
export default helper
