import express from 'express';
import { enrollCourse, cancelEnrollment, trackProgress } from '../Controller/learnerController';

const router = express.Router();

router.post('/enroll', enrollCourse);
router.delete('/cancel/:courseId', cancelEnrollment);
router.get('/progress/:learnerId', trackProgress);

export default router;
