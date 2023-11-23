const {Router} = require ('express')
const{listHero,listHeroByID, addHero, updateHero, deleteHero, signIn}=require('../controllers/hero');


const router =Router();

//http://localhost:3000/api/v1/hero/
//http://localhost:3000/api/v1/hero/1
//http://localhost:3000/api/v1/hero/3
router.get('/', listHero);
router.get('/:id', listHeroByID);
router.post('/', signIn);
router.put('/', addHero);
router.patch('/:id', updateHero);
router.delete('/:id', deleteHero);
module.exports =router;