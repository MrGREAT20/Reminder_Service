const {CreateNotification} = require('../services/email-service');

const Create = async (req, res) => {
    try {
        const response = await CreateNotification(req.body);
        return res.status(201).json({
            data:response,
            success:true,
            err:{},
            message:"Successfully created the Notification"
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data:{},
            success:false,
            message:"Not able to create a Notification",
            err:error
        });
    }
}
module.exports = {
    Create,
}