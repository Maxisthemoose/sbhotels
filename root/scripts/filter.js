const breakfast = data.slice(0, 16);
const dinner = data.slice(16, 56);
const lunch = data.slice(56, data.length);

console.log(breakfast);
console.log(lunch);
console.log(dinner);

/**
 * 
 * @param {string} text 
 * @param {{
 * time: ("breakfast" | "lunch" | "dinner" | "brunch")[];
 * style: string[];
 * }} filters 
 */
function filter(text, filters) {

  return data.filter(v =>
    v.properties.title.toLowerCase()
      .indexOf(text.toLowerCase()) > -1
  )

}