import { viewsService } from '$lib/services/viewsService';
import type { ViewsData } from '$lib/types/views';

export function createViewsStore() {
	let data: ViewsData = $state.raw({
		count: 0,
		loading: true,
		error: null
	});

	return {
		get data() {
			return data;
		},
		async loadViews(slug: string) {
			if (!slug) {
				return;
			}

			data = {
				count: 0,
				loading: true,
				error: null
			};

			try {
				const hasViewed = viewsService.hasViewedRecently(slug);
				let count: number;

				if (!hasViewed) {
					count = await viewsService.incrementViewCount(slug);
					viewsService.markAsViewed(slug);
				} else {
					count = await viewsService.getViewCount(slug);
				}

				data = {
					count,
					loading: false,
					error: null
				};
			} catch (error: Error | unknown) {
				data = {
					count: 0,
					loading: false,
					error: error instanceof Error ? error.message : 'Unknown error'
				};
			}
		}
	};
}
