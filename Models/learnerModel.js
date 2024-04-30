import mongoose from 'mongoose';

const learnerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  enrolledCourses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  }],
});

const Learner = mongoose.model('Learner', learnerSchema);

export default Learner;
