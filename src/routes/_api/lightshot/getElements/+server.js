import { error, json } from "@sveltejs/kit";
import { lightshotService } from "$lib/server/service/lightshot.service";

/**
 * @type {import("./$types").RequestHandler}
 */
export const GET = async ({ url }) => {
	const number = Number(url.searchParams.get('number') ?? '3');
	try {
		return json({ elements: await lightshotService.getElements(number) });
	}
	catch (e) {
		return json({ error: e.message }, { status: 500 });
	}
};