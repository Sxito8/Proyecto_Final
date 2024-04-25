const {request, response} = require('express');
const heromodels = require('../models/hero');
const pool=require('../db');


const listHero = async (req = request, res = response) => {
    let conn; 

    try{
        conn = await pool.getConnection();

    const hero = await conn.query (heromodels.getAll, (err)=>{
        if(err){
            throw err
        }
    });

    res.json(hero);
    } catch (error){
        console.log(error);
        res.status(500).json(error);
    } finally{
        if (conn) conn.end();
    }
    
}

const listHeroByID = async (req = request, res = response) => {
    
    const { id } = req.params;

    if (isNaN(id)) {
        res.status(400).json({msg: 'Invalid ID'});
        return;
    }

    let conn; 
    try{
        conn = await pool.getConnection();

    const [hero] = await conn.query (heromodels.getByID, [id], (err)=>{
        if(err){
            throw err
        }
    });

    if (!hero) {
        res.status(404).json({msg: 'Hero not foud'});
        return;
    }
    
    
    res.json(hero);
    } catch (error){
        console.log(error);
        res.status(500).json(error);
    } finally{
        if (conn) conn.end();
    }
}





const addHero =async(req = request, res= response)=>{
    let conn;
    const {
        HeroRank,
        Class,
        Name
    } = req.body;
    if (!HeroRank|| !Class|| !Name){
res.status(400).json({msg:'Missing informarion'});
return;
        }
       

        const hero= [HeroRank, Class, Name]

       
    
    try {

        conn = await pool.getConnection();
        
        const [Heronamehero] = await conn.query(
            heromodels.getByName,
            [Name],
            (err) => {if (err) throw err;}
        );
        if (Heronamehero){
            res.status(409).json({msg:`Hero with name ${Name} already exists`});
            return;
        }

        
        const [RankUser] = await conn.query(
            heromodels.getByRank,
            [HeroRank],
            (err) => {if (err) throw err;}
        );
        if (RankUser){
            res.status(409).json({msg:`The Rank of Hero ${HeroRank} already exists`});
            return;
        }

        
        const HeroAdded = await conn.query(heromodels.addRow,[...hero],(err)=>{

        })
        
        if (HeroAdded.affecteRows === 0) throw new Error ({msg:'Failed to add hero'});
        res.json({msg:'Hero add succesfully'});
    }catch(error){
console.log(error);
res.status(500).json(error);
    } finally {
        if (conn) conn.end();
    }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Update del profe Julio 

const updateHero=async(req = request, res= response)=>{
    const {
        HeroRank,
        Class,
        Name
    } = req.body;

const {id} = req.params;
let newUserData=[
    HeroRank,
    Class,
    Name
];
let conn;
try{
    conn = await pool.getConnection();
const [HeroExists]=await conn.query(
    heromodels.getByID,
    [id],
    (err) => {if (err) throw err;}
);
if (!HeroExists || HeroExists.Class === ''){
    res.status(404).json({msg:'User not found'});
    return;
}

const [usernameHero] = await conn.query(
    heromodels.getByName,
    [Name],
    (err) => {if (err) throw err;}
);
if (usernameHero){
    res.status(409).json({msg:`Hero with Name ${Name} already exists`});
    return;
}

const [RankUser] = await conn.query(
    heromodels.getByRank,
    [HeroRank],
    (err) => {if (err) throw err;}
);
if (RankUser){
    res.status(409).json({msg:`Hero with Rank ${HeroRank} already exists`});
    return;
}

const oldUserData = [
    HeroExists.HeroRank,
    HeroExists.Class,
    HeroExists.Name
];

newUserData.forEach((HeroData, index)=> {
    if (!HeroData){
        newUserData[index] = oldUserData[index];
    }
})

const HeroUpdate = await conn.query(
    heromodels.updateHero,
    [...newUserData, id],
    (err) => {if (err) throw err;}
);
if(HeroUpdate.affecteRows === 0){
    throw new Error ('Hero not updated');
}
res.json({msg:'Hero updated successfully'})
}catch (error){
        console.log(error);
        res.status(500).json(error);
    } finally{
        if (conn) conn.end();
    }
}



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const deleteHero = async (req = request, res= response)=>{
    let conn;

    try{
        conn = await pool.getConnection();
        const {id} =req.params;
        const [HeroExists] =await conn.query(
            heromodels.getByID,
            [id],
            (err) => {if (err) throw err;}
        );
        if(!HeroExists || HeroExists.Class === ''){
            res.status(404).json({msg:'Hero not Found'});
            return;
        }

        const userDelete = await conn.query(
            heromodels.deleteRow,
            [id],
            (err) => {if(err)throw err;}
        );
        if (userDelete.affecteRows===0){
            throw new Error({msg:'failed to delete Hero'})
        };
        res.json({msg:'Hero deleted succesfully'});
    }catch(error){
        console.log(error);
        res.status(500).json(error);

    }finally{
       if(conn) conn.end(); 
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////

const signIn = async(req = request, res= response)=>{
const{Name,HeroRank} =req.body;
let conn;

if (!Name || !HeroRank){
    res.status(400).json({msg:'Name and Rank are required'});
    return;
}
try{
    conn = await pool.getConnection();
    const [Heros] =await conn.query(
        heromodels.getByName,
        [Name],
        (err) => {if(err) throw err;}
    )
    
    if(!Heros || Heros.Class === ''){
        res.status(404).json({msg:'Wrong Name or Rank'});
        return;
    }

    
    if(!HeroRank){
        res.status(404).json({msg:'Wrong Name or Rank'});
        return;
    }
    
    
res.json(Heros);
}catch(error){
    console.log(error);
    res.status(500).json(error);

}finally{
   if(conn) conn.end(); 
}
}



module.exports={listHero, listHeroByID, addHero, updateHero, deleteHero, signIn};