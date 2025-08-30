package educonnect.v1.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CourseDTO {
    private int courseId;
    private String degreeName;
    private String link;
    private Faculty faculty;
    private DegreeType degreeType;
    private String type;
    private String duration;
    private String fee;
    private String entryQualification;
    private String description;
    private int university;
    private int userId;
}
