import express from "express";
import {createJob, deleteJob, getAllJobs, showStats, updateJob} from "../controllers/jobsController.js";
import rateLimiter from "../utils/rateLimiter.js";


const router = express.Router()

router.route('/').post(rateLimiter, createJob).get(getAllJobs)
router.route('/stats').get(showStats)
router.route('/:id').delete(deleteJob).patch(updateJob)

export default router