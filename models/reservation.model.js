module.exports = (sequelize, Sequelize) => {
  const Reservation = sequelize.define("reservation", {
    reserved_id: {
      type         : Sequelize.INTEGER,
      primaryKey   : true,
      autoIncrement: true
    },
    first_name: {
      type     : Sequelize.STRING(100),
      allowNull: false
    },
    last_name: {
      type     : Sequelize.STRING(100),
      allowNull: false
    },
    reserved_total: {
      type     : Sequelize.INTEGER(32),
      allowNull: false
    },
    reserved_date: {
      type     : Sequelize.DATEONLY,
      allowNull: false
    },
    reserved_time: {
      type     : Sequelize.TIME,
      allowNull: false
    },
    status: {
      type     : Sequelize.STRING(100),
      allowNull: false
    },
    // created_at: {
    //   type        : Sequelize.DATEONLY,
    //   allowNull   : false,
    //   defaultValue: Sequelize.NOW
    // }
  },{
    timestamps: true,
    paranoid  : true,
    createdAt : 'created_at',
    updatedAt : 'updated_at',
    deletedAt : 'deleted_at'
  });

  return Reservation;
};