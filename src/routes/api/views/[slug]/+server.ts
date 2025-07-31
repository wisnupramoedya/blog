import { SUPABASE_ANON_KEY, SUPABASE_URL } from '$env/static/private';
import { createClient } from '@supabase/supabase-js';
import { json } from '@sveltejs/kit';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export async function GET({ params }) {
	const { slug } = params;

	try {
		const { data, error } = await supabase.rpc('get_view_count', { slug });

		if (error) {
			throw error;
		}
		return json({ count: data || 0 });
	} catch (error: Error | unknown) {
		if (error instanceof Error) {
			return json({ error: error.message }, { status: 500 });
		}
		return json({ error: 'Unknown error' }, { status: 500 });
	}
}

export async function POST({ params }) {
	const { slug } = params;

	try {
		const { data, error } = await supabase.rpc('increment_view_count', { slug });

		if (error) {
			throw error;
		}
		return json({ count: data });
	} catch (error: Error | unknown) {
		if (error instanceof Error) {
			return json({ error: error.message }, { status: 500 });
		}
		return json({ error: 'Unknown error' }, { status: 500 });
	}
}
