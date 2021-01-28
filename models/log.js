module.exports = (sequelize, DataTypes) => {
    const Log = sequelize.define('log', {
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        }, 
        definition: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        result: {
            type: DataTypes.STRING,
            allowNull: false
        }, 
        owner_id: {
           type: DataTypes.INTEGER, 
           allowNull: false, 
        },


    })

    return Log
};