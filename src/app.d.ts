// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	type PostMetadata = {
		title: string;
		date: string;
		description: string;
		tags: string[];
		draft: boolean;
		categories: string[];
		minutesToRead: number;
		secondsToRead: number;
	};

	type Metadata = {
		default: Record<string, unknown>;
		metadata: PostMetadata;
	};

	type Post = {
		metadata: PostMetadata;
		path: string;
		next?: Post;
		prev?: Post;
	};

	type PostDetail = {
		date: string;
		tags: string[];
		title: string;
		categories: string[];
		description: string;
		content: import('svelte').ComponentType;
		slug: string;
		minutesToRead: number;
		secondsToRead: number;
	};

	type SerieMeta = {
		name: string;
		slug: string;
		finished: boolean;
		description: string;
		draft: boolean;
	};

	type Serie = {
		meta: SerieMeta;
		chapters: PostMetadata[];
		totalChapters: number;
		minutesToRead: number;
	};

	type Some<T> = {
		isSome: () => true;
		isNone: () => false;
		value: T;
		map: <U>(fn: (value: T) => U) => Option<U>;
		unwrap: () => T;
		unwrapOr: (defaultValue: T) => T;
	};

	type None<T> = {
		isSome: () => false;
		isNone: () => true;
		map: <U>(fn: (value: T) => U) => Option<U>;
		unwrap: () => T;
		unwrapOr: (defaultValue: T) => T;
	};

	type Option<T> = Some<T> | None<T>;

	interface Promise<T> {
		map<U>(fn: (value: T) => U): Promise<Option<U>>;
		andThen<U>(fn: (value: T) => Option<U>): Promise<Option<U>>;
		ok: () => Promise<Option<T>>;
	}
}

export {};
