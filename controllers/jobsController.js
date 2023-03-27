import {BadRequestError, NotFoundError} from "../errors/index.js";
import Job from "../models/Job.js";
import User from "../models/User.js";
import checkPermissions from "../utils/checkPermissions.js";
import job from "../models/Job.js";
import mongoose from "mongoose";
import moment from "moment";

const getAllJobs = async (req, res, next) => {
    try {
        const {search, status, jobType, sort} = req.query

        const queryObj = { createdBy: req.user.userId }

        if (status && status !== 'All') queryObj.status = status
        if (jobType && jobType !== 'All') queryObj.jobType = jobType
        if (search && search !== 'All') queryObj.position = { $regex: search, $options: 'i'}

        let result = Job.find(queryObj)

        switch (sort) {
            case 'Latest':
                result = result.sort('-createdAt')
                break
            case 'Oldest':
                result = result.sort('createdAt')
                break
            case 'A-Z':
                result = result.sort('position')
                break
            case 'Z-A':
                result = result.sort('-position')
                break
            default:
                break
        }

        const limit = Number(req.query.limit) || 10
        const page = Number(req.query.page) || 1
        const skip = (page - 1) * limit
        result = result.skip(skip).limit(limit)

        const jobs = await result
        const totalJobs = await Job.countDocuments(queryObj)
        const numOfPages = Math.ceil(totalJobs / limit)

        res.status(200).json({jobs, totalJobs, numOfPages })
    } catch (error) {

    }
}

const createJob = async (req, res, next) => {
    try {
        const { position, company } = req.body

        if (!position || !company) throw new BadRequestError('Please provide all values!')

        req.body.createdBy = req.user.userId

        const job = await Job.create(req.body)
        res.status(200).json({ job })
    } catch (error) {
        next(error)
    }
}

const showStats = async (req, res, next) => {
    try {
        let stats = await Job.aggregate([
            { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) }},
            { $group: { _id: '$status', count: { $sum: 1 } } }
        ])

        stats = stats.reduce((acc, curr) => {
            const {_id: title, count} = curr
            acc[title.toLowerCase()] = count
            return acc
        }, {})

        const defaultStats = {
            pending: stats.pending || 0,
            interview: stats.interview || 0,
            declined: stats.declined || 0
        }
        let monthlyApplication = await Job.aggregate([
            { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) }},
            { $group: {
                _id: {
                    year: { $year: '$createdAt' },
                    month: { $month: '$createdAt' }
                },
                    count: { $sum: 1 }
                }},
            { $sort: { '_id.year': -1, '_id.month': -1 } },
            { $limit: 6 },
        ])

        monthlyApplication = monthlyApplication.map((item) => {
            const {
                _id: {year, month},
                count
            } = item
            // Accepts 0 -11
            const date = moment()
                .month(month - 1)
                .year(year)
                .format('MMM Y')
            return { date, count }
        }).reverse()

        res.status(200).json({defaultStats, monthlyApplication})
    } catch (error) {
        next(error)
    }
}

const deleteJob = async (req, res, next) => {
    try {
        const {id: jobId} = req.params

        const job = await Job.findOne({ _id: jobId })

        if (!job) {
            throw new NotFoundError(`No job with ID: ${jobId}`)
        }
        checkPermissions(req.user, job.createdBy)

        job.remove()

        res.status(200).json({msg: 'Job deleted successfully'})
    } catch (error) {
        next(error)
    }
}

const updateJob = async (req, res, next) => {
    try {
        const {id: jobId} = req.params
        const {company, position} = req.body
        if (!position || !company) throw new BadRequestError('Please provide all values!')
        const job = await Job.findOne({ _id: jobId })
        if (!job) {
            throw new NotFoundError(`No job with ID: ${jobId}`)
        }

        checkPermissions(req.user, job.createdBy)

        const updatedJob = await Job.findOneAndUpdate({_id: jobId}, req.body, {
            new: true,
            runValidators: true
        })
        res.status(200).json({updatedJob})
    } catch (error) {
        next(error)
    }
}

export {getAllJobs, createJob, showStats, deleteJob, updateJob}