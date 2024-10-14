import { Major } from "../score.model"
import { Course } from "../question.model"

export class MajorsAndCoursesDto {
  constructor(majors: Major[], courses: Course[]) {
    this.majors = majors
    this.courses = courses
  }

  majors: Major[]
  courses: Course[]
}
