module.exports = (sequelize, DataTypes)=>{

    const Posts = sequelize.define('post',{

        title:{
            type:DataTypes.STRING,
            allowNull:false
        },
        posteText:{
            type:DataTypes.STRING,
            allowNull:false
        },
        userName:{
            type:DataTypes.STRING,
            allowNull:false
        },
        

    })

    return Posts;
}