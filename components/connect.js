const express=require('express');
const app=express();
const morgan=require('morgan');
const connectDB=require('./mydb');

const user=require('./user')
const PORT =3000;
connectDB();
app.use(morgan('dev'));
app.use(express.json());

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
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));