
import mongoose from "mongoose"; 
import AutoIncrementFactory from "mongoose-sequence"; 
const AutoIncrement = AutoIncrementFactory(mongoose); 
const categorySchema = new mongoose.Schema( 
{ 
   CategoryID: { type: Number, index: true }, 
   Name: { 
     type: String,  
     required: true,  
     unique: true, 
     trim: true, 
     minlength: 2,  
     maxlength: 100
   }, 

   Slug: {
      type: String, 
      trim: true, 
      unique: true
   },
 
   Description: { 
      type: String, 
      trim: true, 
      maxlength: 500, 
      default: ""
   }, 

   Image: { 
      type: String, // only filename 
      required: true
   }, 

   IsActive: { 
     type: Boolean,  
     default: true
   }, 
}, 
{ 
  timestamps: true, 
} 
); 
categorySchema.plugin(AutoIncrement, {  
   inc_field: "CategoryID", 
   start_seq: 1, 
}); 

export default mongoose.model("Category", categorySchema);
