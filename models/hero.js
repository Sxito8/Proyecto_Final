const heromodels = {
    getAll: `
    SELECT 
    * 
    FROM 
    hero`,

    getByID: `
    SELECT
    *
    FROM
    hero
    WHERE
    id= ?
    `,
    addRow:`
    INSERT INTO
    hero(
        HeroRank,
        Class,
        Name,
        Gender
    )
    VALUES (
        ?,?,?,?
    )`,
getByName:`
    SELECT 
    * 
    FROM 
    hero 
    WHERE Name =?
    `,

getByRank:`
    SELECT 
    id
    FROM 
    hero
    WHERE 
    HeroRank = ?
    `,

    updateHero:`
    UPDATE
    hero
    SET
        HeroRank = ?,
        Class = ?,
        Name = ?,
        Gender = ?
        WHERE 
        id =?
    `,

    deleteRow:`
    DELETE FROM 
    hero
    WHERE 
    id=?
    `,
    
    
}

module.exports=heromodels;