import { Model, Table, Column, DataType, BelongsToMany } from "sequelize-typescript";
import Role from "./role.model";
import UserRoles from "./userRoles.model";

@Table({
  tableName: "users",
  schema: "_auth",
})
export default class User extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "id"
  })
  id?: number;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    unique: true,
    field: "username"
  })
  username?: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    unique: true,
    field: "email"
  })
  email?: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    field: "password"
  })
  password?: string;

  @BelongsToMany(() => Role, () => UserRoles)
  roles?: Role[];

}
