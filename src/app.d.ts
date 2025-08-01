// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

declare module 'highlightjs-copy' {
    class CopyButtonPlugin {
        constructor(options?: { hook?: Function, callback?: Function });
    };
    export = CopyButtonPlugin;
}

export { };

