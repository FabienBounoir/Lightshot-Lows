import { error, json } from "@sveltejs/kit";
import { lightshotService } from "$lib/server/service/lightshot.service";

/**
 * @type {import("./$types").RequestHandler}
 */
export const GET = async ({ request }) => {
	try {
		const startTime = new Date();
		let lightshot = null
		let tryCount = 5;
		let tries = 0;

		while (new Date().getTime() - startTime.getTime() < 3000 && tries < tryCount) {
			tries++;
			let code = "";
			const possibleCharacters = "abcdefghijklmnopqrstuvwxyz0123456789";
			const codeLength = 6;

			for (let j = 0; j < codeLength; j++) {
				code += possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length));
			}

			let url = "https://prnt.sc/" + code

			try {
				const request = await fetch(url)
				if (request.status == 403) break
				const site = await request.text()

				const regex = /https:\/\/image.prntscr.com\/image\/[a-zA-Z0-9-_]+.png/g
				let link = site.match(regex)
				if (!link) continue
				const imageLink = link[0]
				console.log(`[LINK FOUND] ${imageLink}`)

				const test = await fetch(imageLink)
				if (test.status != 200) continue

				lightshotService.add(imageLink, url)

				console.log(`[LINK] ${imageLink}`)
				console.log(`[URL] ${url}`)

				sendStatistics(url, imageLink)

				lightshot = { link: imageLink, url }
				break;
			} catch (error) {
				console.error(`[FETCH LIGHTSHOT] ${error}`)
			}
		}

		if (!lightshot) {
			lightshot = await lightshotService.getOne()
		}

		return json(lightshot);
	}
	catch (e) {
		return json({ error: e.message }, { status: 500 });
	}
};

/**
 * 
 * @param {any} url 
 * @param {any} link 
 */
function sendStatistics(url, link) {
	if (!import.meta.env.VITE_STATISTICS) return console.warn("No statistics URL found");
	try {
		fetch(import.meta.env.VITE_STATISTICS, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				"content": null,
				"embeds": [
					{
						"description": `## ➜ ${url}`,
						"color": 7490440,
						"fields": [],
						"image": {
							"url": link
						},
					}
				],
				"attachments": []
			})
		})
			.catch(error => {
				console.error('Error while sending statistics :', error);
			});
	} catch (error) {
		console.error('Error while sending statistics :', error);
	}
}