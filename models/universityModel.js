import mongoose from "mongoose";
import Course from "./courseModel.js";
const { Schema, model } = mongoose;

const universitySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    enum: [
      "Lebanese University (LU)",
      "American University of Beirut (AUB)",
      "Saint Joseph University (USJ)",
      "Beirut Arab University (BAU)",
      "University Saint Esprit - Kaslik (USEK)",
      "Lebanese American University (LAU)",
      "Haigazian University (Haigazian)",
      "University of Balamand (UOB)",
      "Académie Libanaise des Beaux Arts (ALBA)",
      "La Sagesse University (ULS)",
      "Middle East University (MEU)",
      "Notre Dame University (NDU)",
      "Al Makassed University of Beirut (MUB)",
      "Lebanese International University (LIU)",
      "Arab Open University (AOU)",
      "Global University (GU)",
      "Islamic University of Lebanon (IUL)",
      "Antonine University (UA)",
      "Al Jinan University (JU)",
      "City University (CityU)",
      "Rafic Hariri University (RHU)",
      "American University of Technology (AUT)",
      "American University of Science & Technology (AUST)",
      "Modern University for Business & Sciences (MUBS)",
      "Al-Kafaat University (AKU)",
      "University of Tripoli (UT)",
      "Lebanese Canadian University (LCU)",
      "Arts, Sciences & Technology University in Lebanon (AUL)",
      "American University of Culture and Education (AUCE)",
      "Lebanese German University (LGU)",
      "Université Libano-Française de Technologie et des Sciences Appliqués (ULF)",
      "Holy Family University - Université Sainte Famille (USF)",
      "University of Sciences &Arts in Lebanon (USAL)",
      "Phoenicia University (PU)",
      "Maaref University (MU)",
      "Azm University (Azm)",
      "International University of Beirut (BIU)"
    ]    
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: "Course",
    required: false
  }
});

universitySchema.pre(["find", "findOne", "save", "findOneAndUpdate"], function () {
  this.populate({ path: "course", model: Course, select: "-university"});
});

const University = model("University", universitySchema);

export default University;
