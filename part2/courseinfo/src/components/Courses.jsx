import Header from "./Header";
import Content from "./Content";
import Total from "./Total";

const Courses = ({ courses }) => {
  console.log(courses);
  return (
    <div>
      {courses.map((course) => (
        <div key={course.id}>
          <Header course={course} />
          <Content parts={course.parts} />
          <Total course={course} />
        </div>
      ))}
    </div>
  );
};

export default Courses;
