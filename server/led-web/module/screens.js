var mongodb=require('./db')
function Screens(screen){
    this.speed=screen.speed
    this.screesArray=screen.screesArray
    this.isTop=screen.isTop
    this.favorite=screen.favorite,
    this.avatarUrl=screen.avatarUrl
}
Screens.prototype.save=function(callback){
    console.log('save')
    var screen={
        speed:this.speed,
        screesArray:this.screesArray,
        isTop:this.isTop,
        favorite:this.favorite,
        avatarUrl:this.avatarUrl
    }
    mongodb.open(function(err,db){
        console.log('open')
        if(err){
            return callback(err)
        }
        console.log('open')
        db.collection('screens',function(err,collection){
            if(err){
                mongodb.close()
                return callback(err)
            }
            collection.insert(screen,{
                safe:true
            },function(err,screen){
                mongodb.close();
                if(err){
                    return callback(err)
                }
                callback(null,screen)
            })
        })
    })
}
Screens.getAll=function(callback){
    mongodb.open(function(err,db){
        if(err){
            return callback(err)
        }
        db.collection('screens',function(err,collection){
            console.log('collection')
            if(err){
                mongodb.close();
                return callback(err)
            }
            collection.find({}).toArray(function(err,result){
                db.close()
                if(err)throw err;
                callback(null,result)
                console.log(result);
            })
        })
    })
}
module.exports=Screens