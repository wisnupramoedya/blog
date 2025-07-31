export function formatViews(views: number): string {
	if (views >= 1_000_000) {
		return Math.floor(views / 1_000_000) + 'M';
	} else if (views >= 1_000) {
		return Math.floor(views / 1_000) + 'K';
	}
	return views.toString();
}

export function getViewsLabel(count: number): string {
	return count === 1 ? 'view' : 'views';
}
