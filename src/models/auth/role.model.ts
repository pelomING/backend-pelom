import { Model, Table, Column, DataType, BelongsToMany } from "sequelize-typescript";
import User from "./user.model";
import UserRoles from "./userRoles.model";

@Table({
  tableName: "roles",
  schema: "_auth",
})
export default class Role extends Model {
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
    field: "name"
  })
  name?: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    field: "sistema"
  })
  sistema?: boolean;

  @BelongsToMany(() => User, () => UserRoles)
  users?: User[];
}
