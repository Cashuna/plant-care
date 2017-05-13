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
			type: DataTypes.DECIMAL
		},
		mature_spread: {
			type: DataTypes.DECIMAL
		},
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
			type: DataTypes.DECIMAL
		},
		sow_depth: {
			type: DataTypes.DECIMAL
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
			type: DataTypes.DECIMAL
		},
		days_to_transplant: {
			type: DataTypes.DECIMAL
		},
		days_to_maturity: {
			type: DataTypes.DECIMAL
		},
		harvesting: {
			type: DataTypes.TEXT
		}
	});
	return Plant;
};