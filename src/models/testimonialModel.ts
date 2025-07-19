import  { Schema, models, model } from "mongoose";


const testimonialSchema = new Schema({
    name:String,
    massage:String,
    videoUrl:String,
},
{
    timestamps:true
});

export const Testimonial=models.Testimonial || model("Testimonial", testimonialSchema);