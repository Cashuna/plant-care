module.exports = function(sequelize, DataTypes) {
    var userProfile = sequelize.define("userProfile", {
        plantName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [3,20]
            }
        },

        plantHeight: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        plantWatered: {
            type: DataTypes.STRING,
            allowNull: false
        },

        plantSpread: {
            type: DataTypes.INTEGER,
            allowNull: true
        },

        plantSunlight: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        temp: {
            type: DataTypes.DECIMAL(4,2),
            allowNull: true
        },

        plantTrimmed: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
        {
            classMethods: {
                associate: function(models){
                    userProfile.belongsTo(models.signIn,{
                        foreignKey: {
                            allowNull: false
                        }
                    });
                }
            }
        }
    );

    return userProfile; //why is this return necessary?
};