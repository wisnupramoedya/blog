import hljs from 'highlight.js';

const checkIcon = '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>';
const copyIcon = '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>';
const checkClass = 'copy-btn absolute top-2 right-2 p-1.5 rounded bg-green-600 text-white opacity-100 transition-all cursor-pointer';
const copyClass = 'copy-btn absolute top-2 right-2 p-1.5 rounded bg-gray-700 text-gray-300 opacity-0 group-hover:opacity-100 hover:bg-gray-600 transition-all cursor-pointer';

export const configureHighlightJS = () => {
	hljs.configure({
		languages: ['javascript', 'typescript', 'python', 'html', 'css', 'json', 'markdown']
	});

  hljs.addPlugin({
		'after:highlightElement': ({ el, text }) => {
			const pre = el.parentElement;
			if (!pre || pre.querySelector('.copy-btn')) return;

			pre.classList.add('relative', 'group');

			const div = document.createElement('div');

      div.className =
        copyClass;
      div.innerHTML = copyIcon;

      div.onclick = async () => {
        try {
          await navigator.clipboard.writeText(text);
          
          // Change to success state
          div.className = checkClass;
          div.innerHTML = checkIcon;
          
          // Reset after 2 seconds
          setTimeout(() => {
            div.className = copyClass;
            div.innerHTML = copyIcon;
          }, 2000);
          
        } catch (err) {
          console.error('Failed to copy text: ', err);
        }
      };

      pre.appendChild(div);
		}
	});

  return hljs;
};