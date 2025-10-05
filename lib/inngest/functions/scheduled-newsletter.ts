import { fetchArticles } from "@/lib/news";
import { inngest } from "../client";


export default inngest.createFunction(
    {id:"newsletter/scheduled"}, 
    {event:"newsletter.schedule" },
async({event, step, runId}) => {
    

    //Fetch articles per category
    const allArcticles = await step.run("fetch-news", async () => {
        const categories = ["technlogy", "business", "politics"];

        return fetchArticles(categories);
    }) 
})