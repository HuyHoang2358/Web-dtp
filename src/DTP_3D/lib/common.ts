import store from '@/store';

export function formatTimeNumber(num: number) {
  return String(num).padStart(2, '0');
}

export function innerText(html_element_id: string, inner_text: string) {
  const el = document.getElementById(html_element_id);
  if (el) el.innerText = inner_text;
}

export function hiddenHTMLElementByClassName(element_class: string) {
  const elements = document.getElementsByClassName(element_class);
  // @ts-ignore
  for (let i = 0; i < elements.length; i++) elements[i].style.display = 'none';
}

export function getViewer() {
  return store.getters['VIEWER/getViewer'];
}
