spinWords=s=>s.split` `.map(a=>a[4]?[...a].reverse().join``:a).join` `
spinWords=s=>s.replace(/\w{5,}/g,a=>[...a].reverse().join``)
