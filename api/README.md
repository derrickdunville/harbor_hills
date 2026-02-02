## Sequalize

### create a new model
```
npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string
```

### create a new seeder
```
npx sequelize-cli seed:generate --name demo-user
```

## Migrations
### create migration
```
npx sequelize-cli migration:generate --name <migration-name>
``` 
### run migration
```
npx sequelize-cli db:migrate
```
### undo all migrations
```
npx sequelize-cli db:migrate:undo:all
```

### run seeder
```
npx sequelize-cli db:seed:all
```

### run specific seeder
```
npx sequelize-cli db:seed --seed <seed-file-name>