const express=require('express')
const router=express.Router()

const {getAllJobs,
    getJob,
    createJobs,
    updateJobs,
    deleteJobs}
    =require('../controllers/jobs')


router.route('/').post(createJobs).get(getAllJobs)
router.route('/:id').get(getJob).delete(deleteJobs).patch(updateJobs)


module.exports=router