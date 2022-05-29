R=window.ethereum.request;J=JSON.stringify;Object.defineProperty(window.ethereum,"request",{request(a){console.log("in",J(a));return R(a).then(r=>console.log("out",J(r)))}})
