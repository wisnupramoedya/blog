class ViewsService {
	private readonly VIEWED_KEY_PREFIX = 'viewed_';
	private readonly VIEW_COOLDOWN_MS = 60 * 60 * 1000; // 1 hour

	async getViewCount(slug: string): Promise<number> {
		try {
			const response = await fetch(`/api/views/${slug}`);
			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.error || 'Failed to fetch view count');
			}

			return data.count;
		} catch (error) {
			console.error('Error getting view count:', error);
			throw error;
		}
	}

	async incrementViewCount(slug: string): Promise<number> {
		try {
			const hasViewed = this.hasViewedRecently(slug);
			const response = await fetch(`/api/views/${slug}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				}
			});
			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.error || 'Failed to increment view count');
			}

			if (hasViewed) {
				this.markAsViewed(slug);
			}

			return data.count;
		} catch (error) {
			console.error('Error incrementing view count:', error);
			throw error;
		}
	}
	hasViewedRecently(slug: string): boolean {
		if (typeof localStorage === 'undefined') return false;

		const key = `${this.VIEWED_KEY_PREFIX}${slug}`;
		const viewedAt = localStorage.getItem(key);

		if (!viewedAt) return false;

		const cooldownTime = Date.now() - this.VIEW_COOLDOWN_MS;
		return parseInt(viewedAt) > cooldownTime;
	}

	markAsViewed(slug: string): void {
		if (typeof localStorage === 'undefined') return;

		const key = `${this.VIEWED_KEY_PREFIX}${slug}`;
		localStorage.setItem(key, Date.now().toString());
	}
}

export const viewsService = new ViewsService();
