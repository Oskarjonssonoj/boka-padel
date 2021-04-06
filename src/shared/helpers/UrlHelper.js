export const URLPart = _part => {
  let part = document.URL.split(`/`);
  return part[ part.length - _part ];
};

export const endOfURL = () => lastItemInURL();
export const startOfURL = () => firstItemInURL()[0]
export const secondOfURL = () => firstItemInURL()[1]

export const urlTrailArray = () => urlTrailWithOutParams().split(`/`).filter(item => item.length)
export const firstItemInURL = () => urlTrailWithOutParams().split(`/`).filter(item => item)
export const atHomePage = () => ! urlTrailArray().length
export const lastItemInURL = () => urlTrailArray()[urlTrailArray().length - 1];
export const secondToLastItemInURL = () => urlTrailArray()[urlTrailArray().length - 2];
// export const firstItemInURL = () => urlTrailArray()[urlTrailArray().length]


export const urlTrail = () =>
{
  let trail = ``;
  let { URL } = document;
  let part = URL.trim().split(`//`);
  part[1].split(`/`).map(( p, i) => { if (i) trail += `/${ p }` })
  return trail
}

export const urlTrailWithOutParams = () =>
{
  if ( !urlTrail().includes(`?`) ) return urlTrail();
  let part = urlTrail().split(`?`);
  return part[0];
}
