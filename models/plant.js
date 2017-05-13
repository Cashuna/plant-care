// Plant models

module.exports = function(sequelize, DataTypes) {
	var Plant = sequelize.define("plant", {
		plant_name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		lifecycle: {
			type: DataTypes.STRING
		},
		mature_height: {
			type: DataTypes.INT
		},
		mature_spread: {
			type: DataTypes.INT
		}
		water: {
			type: DataTypes.STRING
		},
		sunlight: {
			type: DataTypes.STRING
		},
		soil_type: {
			type: DataTypes.STRING
		},
		soil_pH: {
			type: DataTypes.INT
		},
		sow_depth: {
			type: DataTypes.INT
		},
		temp_germ: {
			type: DataTypes.STRING
		},
		temp_grow: {
			type: DataTypes.STRING
		},
		growing: {
			type: DataTypes.TEXT
		},
		days_to_germ: {
			type: DataTypes.INT
		},
		days_to_transplant: {
			type: DataTypes.INT
		},
		days_to_maturity: {
			type: DataTypes.INT
		},
		harvesting: {
			type: DataTypes.TEXT
		}
	});
	return Plant;
};