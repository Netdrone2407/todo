const express=require('express');
const app=express();
const morgan=require('morgan');
const connectDB=require('./mydb');

const user=require('./user')
connectDB();
app.use(morgan('dev'));
app.use(express.json());
app.get('/health', (req, res) => {
    res.status(200).send('OK');
  });
  
app.get('/api/users',async(req,res)=>{
    try{        
    const detail=await user.find();
    console.log(detail);
    res.send(detail);}
    catch(error){
        res.status(500).send(error);
    }
});
app.post('/api/users',async(req,res)=>{
    try{
   const one=new user(req.body);
   await one.save();
   res.status(201).send(one);
    }
    catch(error){
        res.status(400).send(error);
    }

});
app.delete('/api/users/:id',async(req,res)=>{
try{
    const userd = await user.findByIdAndDelete(req.params.id);
      if (!userd) {
        return res.status(404).send('User not found');
      }
      res.send('User deleted');
}
catch(error){
    res.status(500).send(error);
}
});
app.put('/api/users/:id', async (req, res) => {
    try {
      const userd = await user.findByIdAndUpdate(req.params.id,req.body, { new: true, runValidators: true });
      if (!userd) {
        return res.status(404).send('User not found');
      }
      res.send(userd);   
    } catch (error) {
      res.status(500).send(error);
    }
  });
  app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running on port ${process.env.PORT || 3000}`);
  });