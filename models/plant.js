// Creating and exporting the Plants model
module.exports = function(sequelize, DataTypes) {
	var Plant = sequelize.define("plant", {
		plant_name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		plant_name_sci: {
			type: DataTypes.STRING,
			defaultValue: "N/A"
		},
		plant_type: {
			type: DataTypes.STRING,
			defaultValue: "N/A"
		},
		lifecycle: {
			type: DataTypes.STRING,
			defaultValue: "N/A"
		},
		plant_shape: {
			type: DataTypes.STRING,
			defaultValue: "N/A"
		},
		frost_hardiness: {
			type: DataTypes.STRING,
			defaultValue: "N/A"
		},
		origin: {
			type: DataTypes.STRING,
			defaultValue: "N/A"
		},
		mature_ht_val: {
			type: DataTypes.DECIMAL(10,1)
		},
		mature_ht_unit: {
			type: DataTypes.STRING,
			defaultValue: "N/A"
		},
		mature_sprd_val: {
			type: DataTypes.DECIMAL(10,1)
		},
		mature_sprd_unit: {
			type: DataTypes.STRING,
			defaultValue: "N/A"
		},
		soil_acidity_min: {
			type: DataTypes.DECIMAL(10,1)
		},
		soil_acidity_max: {
			type: DataTypes.DECIMAL(10,1)
		},
		water_req: {
			type: DataTypes.STRING,
			defaultValue: "N/A"
		},
		soil_type: {
			type: DataTypes.STRING,
			defaultValue: "N/A"
		},
		sun_req: {
			type: DataTypes.STRING,
			defaultValue: "N/A"
		},
		sow_direct: {
			type: DataTypes.STRING,
			defaultValue: "N/A"
		},
		sowing_depth_val: {
			type: DataTypes.DECIMAL(10,1)
		},
		sowing_depth_unit: {
			type: DataTypes.STRING,
			defaultValue: "N/A"
		},
		tempF_grow_min: {
			type: DataTypes.DECIMAL(10,1)
		},
		tempF_grow_max: {
			type: DataTypes.DECIMAL(10,1)
		}
	},
    {
      timestamps: false
    });
	return Plant;
};