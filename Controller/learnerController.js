import Learner from '../Models/learnerModel';

const enrollCourse = async (req, res) => {
  try {
    const { courseId, learnerId } = req.body;
    
    // Find the learner by ID
    const learner = await Learner.findById(learnerId);
    if (!learner) {
      return res.status(404).json({ message: 'Learner not found' });
    }
    
    // Check if the course is already enrolled
    if (learner.enrolledCourses.includes(courseId)) {
      return res.status(400).json({ message: 'Learner already enrolled in this course' });
    }
    
    // Enroll the learner in the course
    learner.enrolledCourses.push(courseId);
    await learner.save();
    
    return res.status(200).json({ message: 'Course enrollment successful', learner });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const cancelEnrollment = async (req, res) => {
  try {
    const { courseId, learnerId } = req.params;
    
    // Find the learner by ID
    const learner = await Learner.findById(learnerId);
    if (!learner) {
      return res.status(404).json({ message: 'Learner not found' });
    }
    
    // Check if the learner is enrolled in the course
    if (!learner.enrolledCourses.includes(courseId)) {
      return res.status(400).json({ message: 'Learner is not enrolled in this course' });
    }
    
    // Remove the course from the enrolledCourses array
    learner.enrolledCourses = learner.enrolledCourses.filter(course => course !== courseId);
    await learner.save();
    
    return res.status(200).json({ message: 'Course enrollment canceled successfully', learner });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const trackProgress = async (req, res) => {
  try {
    const { learnerId } = req.params;
    
    // Find the learner by ID and populate enrolled courses
    const learner = await Learner.findById(learnerId).populate('enrolledCourses');
    if (!learner) {
      return res.status(404).json({ message: 'Learner not found' });
    }
    
    // Return the learner with enrolled courses
    return res.status(200).json({ learner });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export {
  enrollCourse,
  cancelEnrollment,
  trackProgress
};
