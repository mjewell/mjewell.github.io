import qs from 'qs';

export default function getViewFromQueryString() {
  const queryStringView = qs.parse(window.location.search.slice(1)).view;

  if (['code', 'preview'].includes(queryStringView)) {
    return queryStringView;
  }

  return 'code';
}
