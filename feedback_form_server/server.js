const express = require('express');
const bodyParser=require('body-parser');
const app = express();
app.use(bodyParser.json({extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("build"))

const { createObjectCsvWriter } = require('csv-writer');
const fs = require('fs');
const PORT = process.env.PORT || 5000;


app.get("/",(req,res)=>{
  res.send("Server is Running");
})

const addFeedback = (feedback) => {
  return new Promise((resolve, reject) => {
    console.log(feedback);
      const csvFilePath = './feedback.csv'; 
      const csvWriter = createObjectCsvWriter({
          path: csvFilePath,
          header: [
              { id: 'name', title: 'Name' },
              { id: 'cleanliness', title: 'Cleanliness' },
              { id: 'complaints', title: 'Complaints' },
              { id: 'satisfaction', title: 'Satisfaction' }
          ],
          append: fs.existsSync(csvFilePath) // Append if file exists
      });

      const feedbackData = [{
          name: feedback.name,
          cleanliness: feedback.cleanliness,
          complaints: feedback.complaints,
          satisfaction: feedback.satisfaction
      }];

      csvWriter.writeRecords(feedbackData)
          .then(() => {
              resolve("Feedback added successfully");
          })
          .catch((error) => {
              reject(error);
          });
  });
};



app.post("/api/add",(req,res)=>{
  addFeedback(req.body).
  then(()=>{
    res.send("Added SucceessFully")
  })
  .catch((err)=>{
    res.send("Error in adding");
  })
  
})

app.listen(PORT, '0.0.0.0',() => console.log('Server is listening on port 5000'));
