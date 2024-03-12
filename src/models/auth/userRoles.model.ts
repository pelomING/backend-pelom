import { Model, Table, Column, DataType, ForeignKey } from "sequelize-typescript";
import Role from "./role.model";
import User from "./user.model";

@Table({
  tableName: "user_roles",
  schema: "_auth",
})
export default class UserRoles extends Model {

  @ForeignKey(() => Role)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: "roleId"
  })
  roleId?: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: "userId"
  })
  userId?: number;

}