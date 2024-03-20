import { error, json } from "@sveltejs/kit";
import { lightshotService } from "$lib/server/service/lightshot.service";
import { text } from "@sveltejs/kit";

/**
 * @type {import("./$types").RequestHandler}
 */
export const GET = async ({ url }) => {
	const link = url.searchParams.get('link');

	const response = await fetch(atob(link));
	if (!response.ok) {
		throw new Error('Failed to fetch image');
	}

	const imageBuffer = await response.arrayBuffer();
	let headers = {
		"content-type": "image/png",
		"cache-control": "public, max-age=31536000, immutable"
	}
	return new Response(imageBuffer, { headers });
};