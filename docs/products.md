## Product apis

### Enums

| Key    |           Values            |
| ------ | :-------------------------: |
| status | new,active,rejected,deleted |

---

### Create Product

HTTP POST:

`api/product/update`

body :

```javascript
    {
        "product_id": "new",
        "product_name":"test product ",
        "start_price":12.42,
        "status":"new"
    }
```

---

### Photos

Inline-style:
![alt text](https://github.com/dinukasaminda/markdown-html-nodejs/blob/master/docs/sample.png?raw=true "Logo Title Text 1")

Reference-style:
![alt text][logo]

[logo]: https://github.com/dinukasaminda/markdown-html-nodejs/blob/master/docs/sample.png?raw=true"
