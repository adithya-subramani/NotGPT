
const fs = require('fs');

exports.getReply= async (req,res)=>{
    try{
        const spawn = require("child_process").spawn;
        const pythonProcess = spawn('python',["./py_model/script.py",req.params.msg]);
        pythonProcess.stdout.on('data', (data) => {
            console.log(data.toString());
            return res.status(200).json({
                status: "success",
                message: data.toString()
            });
        });
    }
    catch(err){
        return res.status(404).json({
            status:"fail",
            message:err.message
        })
    }
}