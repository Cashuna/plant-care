module.exports = function(sequelize, DataTypes) {
    var signIn = sequelize.define("signIn", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [6,20]
            },
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
        {
            classMethods: {
                associate: function(models){
                    signIn.hasMany(models.userProfile,{
                        onDelete: "cascade"
                    });
                }
            }
        }
    );

    return signIn;
};