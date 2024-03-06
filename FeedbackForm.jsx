import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FeedbackForm.css';
import { addFeedback } from '../api/api';

const initial_value={
  name: '',
  cleanliness: '',
  complaints: '',
  satisfaction: '',
};

const FeedbackForm=()=> {
  const [feedback, setFeedback] = useState(initial_value);
   const {name,cleanliness,complaints,satisfaction}=feedback;
   const navigate = useNavigate();

  const onValueChange = (e) => {
    setFeedback({ ...feedback, [e.target.name]: e.target.value });
  };

  const handleSatisfactionChange = (satisfaction) => {
    setFeedback({ ...feedback, satisfaction:satisfaction });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!feedback.satisfaction) {
      alert('Please select a satisfaction level.');
      return;
    }
    console.log(feedback);
    addFeedback(feedback);

    // Navigate to ThankYou component
    navigate('/');
  };

  return (
    <div className="background">
      <div className="container">
        <div className="feedback-form">
          <h1>TBT-Budhni Plant Visit Feedback</h1>
          <form onSubmit={handleSubmit}>
            <label>
              Your Name:
              <input type="text" name="name" value={name} onChange={(e) => onValueChange(e)} required />
            </label>
            <label>
              Cleanliness:
              <textarea name="cleanliness" value={cleanliness} onChange={(e) => onValueChange(e)} rows="4" required />
            </label>
            <label>
              Area for Improvement (if any):
              <textarea name="complaints" value={complaints} onChange={(e) => onValueChange(e)} rows="4" />
            </label>
            <div className="satisfaction">
              <label>Satisfaction Level:</label>
              <div className="satisfaction-icons">
                <span
                  className={`satisfaction-icon ${feedback.satisfaction === 'very_satisfied' && "selected"}`}
                  onClick={() => handleSatisfactionChange('very_satisfied')}
                  title="Very Satisfied"
                >
                  😊
                </span>
                <span
                  className={`satisfaction-icon ${feedback.satisfaction === 'satisfied' && "selected"}`}
                  onClick={() => handleSatisfactionChange('satisfied')}
                  title="Satisfied"
                >
                  🙂
                </span>
                <span
                  className={`satisfaction-icon ${feedback.satisfaction === 'neutral' && "selected"}`}
                  onClick={() => handleSatisfactionChange('neutral')}
                  title="Neutral"
                >
                  😐
                </span>
                <span
                  className={`satisfaction-icon ${feedback.satisfaction === 'unsatisfied' && "selected"}`}
                  onClick={() => handleSatisfactionChange('unsatisfied')}
                  title="Unsatisfied"
                >
                  😞
                </span>
                <span
                  className={`satisfaction-icon ${feedback.satisfaction === 'very_unsatisfied' && "selected"}`}
                  onClick={() => handleSatisfactionChange('very_unsatisfied')}
                  title="Very Unsatisfied"
                >
                  😢
                </span>
              </div>
              {feedback.satisfaction && (
                <div className="satisfaction-description">
                  {feedback.satisfaction}
                </div>
              )}
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FeedbackForm;
