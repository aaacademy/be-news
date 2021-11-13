# Note

Server status code

200 - OK
201 - Created

403 - Access Denied
404 - Not Found

500 - Server error


```
npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string,password:string
```

```
npx sequelize-cli model:generate --name Post --attributes title:string,description:string,images:string
```