import { ObjectId } from "mongodb";
import { db } from "../db.server";

class LightshotService {
	#collection;

	/**
	 * @param {import("mongodb").Collection<import("mongodb").Document & {
	 *  link: string;
	 *  url: string;
	 *  date: Date;
	 * }>} collection
	 */
	constructor(collection) {
		this.#collection = collection;
	}

	getAll() {
		return this.#collection.find().toArray();
	}

	get() {
		return this.#collection.findOne({ _id: new ObjectId(_id) });
	}

	/**
	 * 
	 * @param {number} number 
	 * @returns 
	 */
	getElements(number = 30) {
		return this.#collection.aggregate([
			{ $sample: { size: number } }
		]).toArray();
	}

	getOne() {
		return this.#collection.aggregate([
			{ $sample: { size: 1 } }
		]).next();
	}

	/**
	 * 
	 * @param {String} link 
	 * @param {String} url 
	 * @returns 
	 */
	async add(link, url) {
		if (await this.#collection.findOne({ link })) return;

		return this.#collection.insertOne({ link, url, date: new Date() });
	}
}

export const lightshotService = new LightshotService(db.collection("elements"));
