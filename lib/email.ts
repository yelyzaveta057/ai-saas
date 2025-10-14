import emailjs from '@emailjs/nodejs';

export async function sendEmail(email: string, categories: string, article_count: number, newsletter_content: string) {
    const templateParams ={
        email, 
        categories,
        article_count,
        current_date: new Date().toLocaleDateString(),
        newsletter_content,

    };
    const serviceId= process.env.EMAILJS_SERVICE_ID;
    const tepmlateId= process.env.EMAILJS_TEPMLATE_ID;
    const publicKey= process.env.EMAILJS_PUBLIC_KEY;
    const privateKey= process.env.EMAILJS_PRIVATE_KEY;
    

    
    await emailjs.send( serviceId!, tepmlateId!, templateParams, {
        publicKey ,
        privateKey ,
    });
}