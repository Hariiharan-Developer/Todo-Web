const nodemailer = require('nodemailer')

const sendMail =async(to,subject,text)=>{

    const transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:process.env.EMAIL,
            pass:process.env.APP_PASS
        }
    })

    try{
        await transporter.sendMail({
            from:process.env.EMAIL,
            to,
            subject,
            text
        })

    }catch(err){
        console.log(err.message)
        throw new Error('Mail sending error')
    }
}

module.exports =sendMail