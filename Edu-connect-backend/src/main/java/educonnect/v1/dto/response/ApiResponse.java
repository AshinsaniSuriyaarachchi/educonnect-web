package educonnect.v1.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import educonnect.v1.entity.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ApiResponse extends Response {
    private University university;
    private Course course;
    private User user;
    private Rate rate;
    private List<Course> courseList;
    private List<University> universityList;
    private List<SavedCourse> savedCourseList;
}
