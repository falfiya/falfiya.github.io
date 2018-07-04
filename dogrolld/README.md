# dogrolld
This project is mainly to improve my javascript skills in expandability and readability. I'm also working with a proxy for the majority of the project so I'm learning about those. Here's the proxy:
```Javascript
    dogHandler={
        set(target,key,value){
            target[key]=value;
            save();
        },
    },
    dogData=new Proxy(data,dogHandler),
```
