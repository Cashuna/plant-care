module.exports = function(sequelize, DataTypes) {
    var userProfile = sequelize.define("userProfile", {
        plantName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [3,20]
            }
            //unique: true
        },

        plantHeight: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        plantWatered: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },

        plantSpread: {
            type: DataTypes.INTEGER,
            allowNull: true
        },

        soilPh: {
            type: DataTypes.INTEGER,
            allowNull: true
        },

        plantSunlight: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },

        temp: {
            type: DataTypes.DECIMAL(4,2),
            allowNull: true
        },

        plantTrimmed: {
            type: DataTypes.BOOLEAN,
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