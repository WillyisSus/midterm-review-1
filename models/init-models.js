import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _refresh_tokens from  "./refresh_tokens.js";
import _users from  "./users.js";

export default function initModels(sequelize) {
  const refresh_tokens = _refresh_tokens.init(sequelize, DataTypes);
  const users = _users.init(sequelize, DataTypes);

  refresh_tokens.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(refresh_tokens, { as: "refresh_tokens", foreignKey: "user_id"});

  return {
    refresh_tokens,
    users,
  };
}
