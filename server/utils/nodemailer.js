const nodemailer = require('nodemailer')


const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
         user: process.env.EMAIL_USER,
         pass: process.env.EMAIL_PASS
    }
})

const sendMail =async(to,subject,html)=>{
    try{
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject,
            html
        })

    }catch (err) {
        console.log("EMAIL ERROR FULL:", err);
        throw err;
        }
}

module.exports =sendMail