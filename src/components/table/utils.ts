import { ItemProps as Item } from "./interfaces";

/**
 * Retrieves a unique identifier for the given item.
 * If the item has an 'identifier' property, it will be returned. Otherwise, the 'id' property will be returned.
 *
 * @param item - The item for which a unique identifier needs to be retrieved.
 * @param item.id - The unique identifier for the item, if 'identifier' is not provided.
 * @param item.identifier - An optional identifier for the item. If provided, it will be returned as the unique identifier.
 *
 * @returns A unique identifier for the item, either as a string.
 */
export function getUniqueIdentifier<T extends Item = Item>(item: T): string {
	const identifier = item['identifier'];

	return String(identifier ? identifier : item['id'])
}